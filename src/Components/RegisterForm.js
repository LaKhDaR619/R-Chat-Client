import React, { useEffect } from "react";
import { Typography, Button, Grid } from "@material-ui/core";
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

function RegisterForm({
  checkUserName,
  userRegister,
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
  }, [history, resetIE]);

  const handleRegister = async (e) => {
    userRegister({ ...inputFields, history });
  };

  const handleUserNameChange = (e) => {
    setInputFields({ ...inputFields, username: e.target.value });
    checkUserName(e.target.value);
  };

  return (
    <Grid
      item
      container
      direction="column"
      className={classes.mgTop}
      xs={10}
      md={4}
      spacing={2}
    >
      <Typography className={classes.center} variant="h2">
        Register
      </Typography>
      <Grid item>
        <MUInput
          label="User Name"
          type="text"
          value={inputFields.username}
          onChange={handleUserNameChange}
          errorMessage={errorMessages.username}
        />
      </Grid>
      <Grid item>
        <MUInput
          label="Password"
          type="Password"
          value={inputFields.password}
          onChange={(e) =>
            setInputFields({ ...inputFields, password: e.target.value })
          }
          errorMessage={errorMessages.password}
        />
      </Grid>
      <Grid item>
        <Button
          className={classes.fullWidth}
          size="large"
          variant="contained"
          color="primary"
          onClick={handleRegister}
          type="submit"
        >
          Register
        </Button>
      </Grid>
      <Button onClick={() => history.push("/login")}> Login </Button>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    inputFields: state.auth.inputFields,
    errorMessages: state.auth.errorMessages,
    userAvailable: state.auth.userAvailable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userRegister: (payload) =>
      dispatch({
        type: "USER_REGISTER",
        payload,
      }),
    checkUserName: (username) => {
      dispatch({
        type: "CHECK_USERNAME",
        payload: { username },
      });
    },
    setInputFields: (payload) =>
      dispatch({ type: "SET_INPUT_FIELDS", payload }),
    resetIE: () => dispatch({ type: "RESET_IE" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
