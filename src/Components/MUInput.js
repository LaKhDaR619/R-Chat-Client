import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  fullWidth: {
    width: "100%",
  },
});

export default function MUInput({
  label,
  value,
  type,
  errorMessage,
  onChange,
}) {
  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      type={type}
      className={classes.fullWidth}
      label={label}
      value={value}
      helperText={errorMessage}
      error={errorMessage ? errorMessage.length !== 0 : false}
      onChange={onChange}
    />
  );
}
