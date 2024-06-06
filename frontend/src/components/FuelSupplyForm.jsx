import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGetUser } from "../hooks/useGetUser";
import { Formik, Form } from "formik";
import APISupply from "../services/api-tanks";
import FuelSupplyFormValidationSchema from "../validations/fuelSupplyFormValidation";
import FormField from "./formikField";

export default function FuelSupplyForm(props) {
  const [dataUser] = useGetUser();
  const [cookies] = useCookies(["mr-token"]);

  useEffect(() => {
    console.log(dataUser);
  }, [dataUser]);

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
      console.log(error);
    } finally {
      setSubmitting(false);
    }
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
      {({ isSubmitting, values }) => (
        <Form className="form-supply">
          {fields.map((field, index) => (
            <FormField
              key={index}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.label}
              max={field.max}
            />
          ))}
          <div className="">
            <button
              type="submit"
              disabled={
                isSubmitting ||
                values.litersUsed === 0 ||
                values.kmCurrency === 0
              }
            >
              {props.supply.uuid ? "Atualizar" : "Criar"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
