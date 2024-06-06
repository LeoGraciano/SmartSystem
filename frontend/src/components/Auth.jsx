import { useEffect, useState } from "react";
import APISupply from "../services/api-tanks";
import { useCookies } from "react-cookie";
import APIUser from "../services/api-users";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoginView, setIsLoginView] = useState(true);

  const [cookies, setCookies] = useCookies(["mr-token"]);

  const handleLogin = async () => {
    const body = { username, password };
    console.log(body);
    await APIUser.loginUser(body)
      .then((response) => setCookies("mr-token", response.token))
      .catch((error) => console.log(error));
  };

  const handleRegister = async () => {
    const body = { email: username, password, name };
    await APIUser.registerUser(body)
      .then(() => handleLogin())
      .catch((error) => console.log(error));
  };

  const handleChangeIsLoginView = () => {
    setIsLoginView(!!!isLoginView);
  };

  let isDisabled = username.length === 0 || password.length === 0;

  if (!isLoginView) {
    isDisabled = name.length === 0;
  }

  useEffect(() => {
    if (cookies["mr-token"] !== "undefined" && cookies["mr-token"]) {
      window.location.href = "/tanks";
    }
  }, [cookies["mr-token"]]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{isLoginView ? "Login" : "Registro"}</h1>
      </header>
      <form className="form-auth">
        <label htmlFor="username">E-mail</label>
        <input
          type="email"
          id="username"
          placeholder="E-mail"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        {!isLoginView && (
          <>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Nome Completo"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </>
        )}
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div>
          {isLoginView ? (
            <>
              <button type="button" onClick={handleLogin} disabled={isDisabled}>
                Entrar
              </button>
              <span>
                Você não tem uma conta ?
                <strong
                  onClick={handleChangeIsLoginView}
                  style={{ cursor: "pointer" }}
                >
                  Registra-se aqui !
                </strong>
              </span>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleRegister}
                disabled={isDisabled}
              >
                Registro
              </button>
              <span>
                Você já tem uma conta ?
                <strong
                  onClick={handleChangeIsLoginView}
                  style={{ cursor: "pointer" }}
                >
                  Entre aqui !
                </strong>
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
