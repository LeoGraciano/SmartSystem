import * as Yup from "yup";

const loginValidation = Yup.object().shape({
  username: Yup.string()
    .email("E-mail inválido")
    .required("E-mail é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
});

const registerValidation = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  username: Yup.string()
    .email("E-mail inválido")
    .required("E-mail é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
});

export { loginValidation, registerValidation };
