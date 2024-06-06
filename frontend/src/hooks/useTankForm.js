import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import APISupply from "../services/api-tanks";
import tankValidationSchema from "../validations/tankValidation";

const useTankForm = (props) => {
  const [cookies] = useCookies(["mr-token"]);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      identify: "",
      description: "",
      capacity: 0,
      reservoir: 0,
    },
    validationSchema: tankValidationSchema,
    onSubmit: async (values) => {
      if (props.tank && props.tank.uuid) {
        await handleUpdateTank(values);
      } else {
        await handleNewTank(values);
      }
    },
  });

  useEffect(() => {
    if (props.tank) {
      formik.setValues({
        name: props.tank.name || "",
        identify: props.tank.identify || "",
        description: props.tank.description || "",
        capacity: props.tank.capacity || 0,
        reservoir: props.tank.reservoir || 0,
      });
    }
  }, [props.tank]);

  const handleUpdateTank = async (values) => {
    try {
      await APISupply.updateTank(props.tank.uuid, values, cookies["mr-token"]);
      const newTank = await APISupply.getTank(
        props.tank.uuid,
        cookies["mr-token"]
      );
      props.updateTank(newTank);
    } catch (err) {
      console.log(err);
      setError("Erro ao atualizar o tanque");
    }
  };

  const handleNewTank = async (values) => {
    try {
      const response = await APISupply.createTank(values, cookies["mr-token"]);
      const newTank = await APISupply.getTank(
        response.uuid,
        cookies["mr-token"]
      );
      props.newTank(newTank);
    } catch (err) {
      console.log(err);
      setError("Erro ao criar o tanque");
    }
  };

  return {
    ...formik,
    error,
  };
};

export default useTankForm;
