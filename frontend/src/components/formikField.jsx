import { Field, ErrorMessage } from "formik";

const FormField = ({ label, name, type, placeholder, ...props }) => (
  <div className="form-field">
    <label htmlFor={name}>{label}</label>
    <Field
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      {...props}
    />
    <ErrorMessage name={name} component="div" className="error-message" />
  </div>
);

export default FormField;
