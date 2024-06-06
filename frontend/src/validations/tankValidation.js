import * as Yup from "yup";

const tankValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  identify: Yup.string().required("Identificação é obrigatória"),
  description: Yup.string(),
  capacity: Yup.number()
    .required("Capacidade é obrigatória")
    .positive()
    .integer(),
  reservoir: Yup.number()
    .required("Reservatório é obrigatório")
    .positive()
    .integer()
    .max(
      Yup.ref("capacity"),
      "Reservatório não pode ser maior que a capacidade"
    ),
});

export default tankValidationSchema;
