import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import ProtectedRoute from "./Components/ProtectedRoute";
import { connect } from "react-redux";
import Register from "./pages/Register";

function App({ checkLogin, loggedIn, isLoading }) {
  useEffect(() => {
    console.log("App");
    checkLogin();
  }, [checkLogin]);

  //console.log("App condition");
  if (isLoading) return "loading";

  return (
    <Router>
      <Route path="/" exact component={Main} />
      <ProtectedRoute
        path="/login"
        exact
        component={Login}
        condition={!loggedIn}
        redirectTo="/"
      />
      <ProtectedRoute
        path="/register"
        exact
        component={Register}
        condition={!loggedIn}
        redirectTo="/"
      />
      <ProtectedRoute
        path="/chat"
        exact
        component={Chat}
        condition={loggedIn}
        redirectTo="/login"
      />
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    isLoading: state.auth.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch({ type: "CHECK_LOGIN" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);