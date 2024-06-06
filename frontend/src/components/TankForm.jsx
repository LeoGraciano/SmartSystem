// src/components/TankForm.js
import React from "react";
import useTankForm from "../hooks/useTankForm";

export default function TankForm(props) {
  const formik = useTankForm(props);

  return (
    <form className="form-tank" onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Nome</label>
      <input
        type="text"
        id="name"
        placeholder="Nome"
        {...formik.getFieldProps("name")}
      />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}

      <label htmlFor="identify">Identificação</label>
      <input
        type="text"
        id="identify"
        placeholder="Identificação"
        {...formik.getFieldProps("identify")}
      />
      {formik.touched.identify && formik.errors.identify ? (
        <div>{formik.errors.identify}</div>
      ) : null}

      <label htmlFor="capacity">Capacidade</label>
      <input
        type="number"
        id="capacity"
        placeholder="Capacidade"
        {...formik.getFieldProps("capacity")}
      />
      {formik.touched.capacity && formik.errors.capacity ? (
        <div>{formik.errors.capacity}</div>
      ) : null}

      <label htmlFor="reservoir">Reservatório</label>
      <input
        type="number"
        id="reservoir"
        placeholder="Reservatório"
        {...formik.getFieldProps("reservoir")}
      />
      {formik.touched.reservoir && formik.errors.reservoir ? (
        <div>{formik.errors.reservoir}</div>
      ) : null}

      <label htmlFor="description">Descrição</label>
      <textarea
        id="description"
        placeholder="Descrição"
        {...formik.getFieldProps("description")}
      />
      {formik.touched.description && formik.errors.description ? (
        <div>{formik.errors.description}</div>
      ) : null}

      <button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
        {props.tank && props.tank.uuid ? "Atualizar" : "Criar"}
      </button>
    </form>
  );
}
