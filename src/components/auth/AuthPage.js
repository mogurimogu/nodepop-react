import "./styles/index.scss";
const wantRegister = false;

export default function AuthPage() {
  return (
    <form noValidate>
      <input type="text" placeholder="nombre" name="user" required></input>

      <input
        type="password"
        placeholder="Contraseña"
        name="password"
        required
      ></input>

      {wantRegister ? (
        <input
          type="password"
          placeholder="Repita la contraseña"
          name="repeatPassword"
          required
        ></input>
      ) : undefined}

      <input type="submit" value="Regístrate"></input>
    </form>
  );
}
