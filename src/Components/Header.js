import React from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function Header({ loggedIn, logOut, user }) {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Chat
        </Typography>
        {loggedIn ? (
          <Grid container justify="flex-end" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="subtitle1" className={classes.title}>
                {`id: ${user.id}`}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                {user.username}
              </Typography>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={logOut}>
                Logout
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Button color="inherit">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch({ type: "USER_LOGOUT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
