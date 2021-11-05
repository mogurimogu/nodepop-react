import "./styles/index.scss";
import { useState } from "react";
import { login } from "./service";
import Loading from "../common/Loading";
import { AuthContextConsumer } from "./context";

function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetError = () => setError(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // call to api - send value
    setIsLoading(true);
    resetError();
    try {
      await login(formData);
      setIsLoading(false);
      onLogin();
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
            <input type="checkbox" /> Mantener sesión abierta
          </label>
          <button
            type="submit"
            disabled={isLoading || !formData.email || !formData.password}
          >
            Acceso
          </button>
        </form>
      )}
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
}

const ConnectedLoginPage = () => (
  <AuthContextConsumer>
    {auth => <LoginPage onLogin={auth.handleLogin} />}
  </AuthContextConsumer>
);

export default ConnectedLoginPage;
