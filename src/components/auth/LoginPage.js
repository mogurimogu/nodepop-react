import T from "prop-types";
import "./styles/index.scss";
import { useState } from "react";
import { login } from "./service";
import { AuthContextConsumer } from "./context";
import { AlertBox, Loading } from "../common/";

function LoginPage({ onLogin, history, location }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const resetError = () => setError(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // call to api - send value
    setIsLoading(true);
    resetError();
    try {
      await login(formData, remember);
      setIsLoading(false);
      onLogin();
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  function handleInput(e) {
    const input = e.target.name;
    const value = e.target.value;
    const valid = e.target.validity.valid;
    setFormData({ ...formData, [input]: value });
    //Toggle Error Classname
    !valid ? (e.target.className = "error") : (e.target.className = "");
  }

  return (
    <div id="login-page">
      <h1>Acceso a Nodepop</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <form noValidate onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleInput}
            required
          />
          <label>
            <input
              type="checkbox"
              onChange={(event) => setRemember(event.target.checked)}
            />
            Mantener sesión abierta
          </label>
          <button
            type="submit"
            disabled={isLoading || !formData.email || !formData.password}
          >
            Acceso
          </button>
        </form>
      )}
      {error && <AlertBox onClick={resetError}>{error.message}</AlertBox>}
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
};

const ConnectedLoginPage = (props) => (
  <AuthContextConsumer>
    {(auth) => <LoginPage onLogin={auth.handleLogin} {...props} />}
  </AuthContextConsumer>
);

export default ConnectedLoginPage;
