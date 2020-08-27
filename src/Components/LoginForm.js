import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core";
import MUInput from "../Components/MUInput";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  center: {
    textAlign: "center",
  },
  mgTop: {
    marginTop: "15px",
  },
  fullWidth: {
    width: "100%",
  },
});

function LoginForm({
  userLogin,
  errorMessages,
  inputFields,
  setInputFields,
  resetIE,
}) {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      resetIE();
    });
    return () => {
      unlisten();
    };
  }, []);

  const [keep, setKeep] = useState(true);

  const handleLogin = async (e) => {
    userLogin({ ...inputFields, keep, history });
  };

  return (
    <Grid
      item
      container
      spacing={2}
      direction="column"
      className={classes.mgTop}
      xs={10}
      md={4}
    >
      <Typography className={classes.center} variant="h2">
        Login
      </Typography>
      <Grid item>
        <MUInput
          label="User Name"
          type="text"
          value={inputFields.username}
          onChange={(e) => {
            setInputFields({ ...inputFields, username: e.target.value });
          }}
          errorMessage={errorMessages.username}
        />
      </Grid>
      <Grid item>
        <MUInput
          label="Password"
          type="Password"
          value={inputFields.password}
          onChange={(e) => {
            setInputFields({ ...inputFields, password: e.target.value });
          }}
          errorMessage={errorMessages.password}
        />
      </Grid>
      <FormHelperText error>{errorMessages.other}</FormHelperText>
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              checked={keep}
              onChange={() => setKeep(!keep)}
              name="checkedB"
              color="primary"
            />
          }
          label="Keep Me Logged In"
        />
      </Grid>
      <Grid item>
        <Button
          className={classes.fullWidth}
          size="large"
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Grid>
      <Button onClick={() => history.push("/register")}> Register </Button>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    inputFields: state.auth.inputFields,
    errorMessages: state.auth.errorMessages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (payload) =>
      dispatch({
        type: "USER_LOGIN",
        payload,
      }),
    setInputFields: (payload) =>
      dispatch({ type: "SET_INPUT_FIELDS", payload }),
    resetIE: () => dispatch({ type: "RESET_IE" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
