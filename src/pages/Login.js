import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";

import Header from "../Components/Header";
import LoginForm from "../Components/LoginForm";

function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <Grid container direction="row" justify="center">
      <Header />
      <Grid item xs={1} md={4} />
      <LoginForm />
      <Grid item xs={1} md={4} />
    </Grid>
  );
}

export default Login;
