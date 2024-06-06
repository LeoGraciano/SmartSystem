import * as Yup from "yup";

const FuelSupplyFormValidationSchema = (fields) => {
  return Yup.object().shape({
    litersUsed: Yup.number()
      .required("Quantidade Abastecido é obrigatório")
      .max(
        fields[0].max,
        `Quantidade Abastecido não pode ser maior que ${fields[0].max}`
      ),
    kmCurrency: Yup.number().required("Quilometragem Atual é obrigatório"),
    usedTag: Yup.string().required("Tag é obrigatório"),
  });
};

export default FuelSupplyFormValidationSchema;
