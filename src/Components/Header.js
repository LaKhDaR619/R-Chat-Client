import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" style={{ height: "70px" }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="menu"></IconButton>
        <Typography variant="h6">Chat</Typography>

        <Button color="inherit">
          <Link to="/login">Login</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
