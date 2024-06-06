import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Typography, Link } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useCookies } from "react-cookie";
import * as Yup from "yup";
import APIUser from "../services/api-users";
import {
  loginValidation,
  registerValidation,
} from "../validations/authValidation";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Auth() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [cookies, setCookies] = useCookies(["mr-token"]);

  const handleChangeIsLoginView = () => {
    setIsLoginView(!isLoginView);
  };

  useEffect(() => {
    if (cookies["mr-token"] !== "undefined" && cookies["mr-token"]) {
      window.location.href = "/tanks";
    }
  }, [cookies["mr-token"]]);

  const handleLogin = async (values) => {
    const body = { username: values.username, password: values.password };
    try {
      await APIUser.loginUser(body)
        .then((response) => setCookies("mr-token", response.token))
        .catch((error) => console.log(error));
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleRegister = async (values) => {
    const body = {
      name: values.name,
      email: values.username,
      password: values.password,
    };
    try {
      await APIUser.registerUser(body);

      handleLogin(values); // Após o registro, faça login automaticamente
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <Typography variant="h1">
            {isLoginView ? "Login" : "Registro"}
          </Typography>
        </header>

        <Formik
          initialValues={{ username: "", password: "", name: "" }}
          validationSchema={isLoginView ? loginValidation : registerValidation}
          onSubmit={isLoginView ? handleLogin : handleRegister}
        >
          {({ isSubmitting }) => (
            <Form className="form-auth">
              <Field
                as={TextField}
                type="email"
                id="username"
                name="username"
                label="E-mail"
                placeholder="E-mail"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />

              {!isLoginView && (
                <>
                  <Field
                    as={TextField}
                    type="text"
                    id="name"
                    name="name"
                    label="Nome"
                    placeholder="Nome Completo"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </>
              )}

              <Field
                as={TextField}
                type="password"
                id="password"
                name="password"
                label="Senha"
                placeholder="Senha"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />

              <div>
                {isLoginView ? (
                  <>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Entrar
                    </Button>
                    <Typography>
                      Você não tem uma conta ?{" "}
                      <Link
                        onClick={handleChangeIsLoginView}
                        style={{ cursor: "pointer" }}
                      >
                        Registre-se aqui !
                      </Link>
                    </Typography>
                  </>
                ) : (
                  <>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Registro
                    </Button>
                    <Typography>
                      Você já tem uma conta ?{" "}
                      <Link
                        onClick={handleChangeIsLoginView}
                        style={{ cursor: "pointer" }}
                      >
                        Entre aqui !
                      </Link>
                    </Typography>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ThemeProvider>
  );
}
