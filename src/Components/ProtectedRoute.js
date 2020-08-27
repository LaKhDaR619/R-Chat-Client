import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  condition,
  redirectTo,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (condition) return <Component {...rest} {...props} />;
        else return <Redirect to={redirectTo} />;
      }}
    />
  );
};

export default ProtectedRoute;
