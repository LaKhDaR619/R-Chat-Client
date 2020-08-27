import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";

import Header from "../Components/Header";
import RegisterForm from "../Components/RegisterForm";

function Register() {
  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <Grid container direction="row" justify="center">
      <Header title="Register" />
      <Grid item xs={1} md={4} />
      <RegisterForm />
      <Grid item xs={1} md={4} />
    </Grid>
  );
}

export default Register;
