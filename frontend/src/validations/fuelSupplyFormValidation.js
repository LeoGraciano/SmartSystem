import * as Yup from "yup";

const FuelSupplyFormValidationSchema = (fields) => {
  const shape = {};
  fields.forEach(field => {
    switch (field.type) {
      case 'number':
        shape[field.name] = Yup.number()
          .required(`${field.label} é obrigatório`)
          .max(field.max || Infinity, `Quantidade máxima é ${field.max}`)
        break;
      case 'text':
      default:
        shape[field.name] = Yup.string()
          .required(`${field.label} é obrigatório`);
        break;
    }
  });
  return Yup.object().shape(shape);
};

export default FuelSupplyFormValidationSchema;
