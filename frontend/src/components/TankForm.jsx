import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import useTankForm from "../hooks/useTankForm";

export default function TankForm(props) {
  const formik = useTankForm(props);

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formik.handleSubmit(event);

    if (
      formik.errors.name ||
      formik.errors.identify ||
      formik.errors.capacity ||
      formik.errors.reservoir
    ) {
      setErrorMessage("Por favor, corrija os erros no formulário.");
      setOpen(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        id="name"
        label="Nome"
        variant="standard"
        {...formik.getFieldProps("name")}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <TextField
        id="identify"
        label="Identificação"
        variant="standard"
        {...formik.getFieldProps("identify")}
        error={formik.touched.identify && Boolean(formik.errors.identify)}
        helperText={formik.touched.identify && formik.errors.identify}
      />

      <TextField
        id="capacity"
        label="Capacidade"
        variant="standard"
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">L</InputAdornment>,
        }}
        {...formik.getFieldProps("capacity")}
        error={formik.touched.capacity && Boolean(formik.errors.capacity)}
        helperText={formik.touched.capacity && formik.errors.capacity}
      />

      <TextField
        id="reservoir"
        label="Reservatório"
        variant="standard"
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">L</InputAdornment>,
        }}
        {...formik.getFieldProps("reservoir")}
        error={formik.touched.reservoir && Boolean(formik.errors.reservoir)}
        helperText={formik.touched.reservoir && formik.errors.reservoir}
      />

      <TextField
        id="description"
        label="Descrição"
        variant="standard"
        multiline
        rows={4}
        {...formik.getFieldProps("description")}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={formik.isSubmitting || !formik.isValid}
      >
        {props.tank && props.tank.uuid ? "Atualizar" : "Criar"}
      </Button>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
