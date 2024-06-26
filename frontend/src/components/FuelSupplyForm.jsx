import React from "react";
import { useCookies } from "react-cookie";
import { useGetUser } from "../hooks/useGetUser";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import APISupply from "../services/api-tanks";
import FuelSupplyFormValidationSchema from "../validations/fuelSupplyFormValidation";
import FormField from "./formikField";

export default function FuelSupplyForm(props) {
  const [dataUser] = useGetUser();
  const [cookies] = useCookies(["mr-token"]);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const fields = [
    {
      label: "Quantidade Abastecido",
      name: "litersUsed",
      type: "number",
      max: props.supply.tank.reservoir,
    },
    { label: "Quilometragem Atual", name: "kmCurrency", type: "number" },
    { label: "Tag", name: "usedTag", type: "text" },
  ];

  const validationSchema = FuelSupplyFormValidationSchema(fields);

  const handleSubmit = async (values, { setSubmitting }) => {
    const body = {
      tank: props.supply.tank.uuid,
      employee: dataUser.length > 0 ? dataUser[0].uuid : "",
      used_tag: values.usedTag,
      liters_used: values.litersUsed,
      km_currency: values.kmCurrency,
    };

    try {
      if (props.supply.uuid) {
        await APISupply.updateFuelSupply(
          props.supply.uuid,
          body,
          cookies["mr-token"]
        );
      } else {
        await APISupply.createFuelSupply(body, cookies["mr-token"]);
      }
      const response = await APISupply.getTank(
        props.supply.tank.uuid,
        cookies["mr-token"]
      );
      props.updateTank(response);
    } catch (error) {
      setErrorMessage("Erro ao salvar os dados. Tente novamente.");
      setOpen(true);
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Formik
      initialValues={{
        litersUsed: props.supply.liters_used || 0,
        kmCurrency: props.supply.km_currency || 0,
        usedTag: props.supply.used_tag || "",
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, errors, touched }) => (
        <Form className="form-supply">
          {fields.map((field, index) => (
            <Box key={index} mb={2}>
              <Field
                name={field.name}
                as={TextField}
                type={field.type}
                label={field.label}
                variant="standard"
                InputProps={{
                  inputProps: { max: field.max },
                }}
                helperText={touched[field.name] && errors[field.name]}
                error={touched[field.name] && Boolean(errors[field.name])}
              />
            </Box>
          ))}
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                isSubmitting ||
                values.litersUsed === 0 ||
                values.kmCurrency === 0
              }
            >
              {props.supply.uuid ? "Atualizar" : "Criar"}
            </Button>
          </Box>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        </Form>
      )}
    </Formik>
  );
}
