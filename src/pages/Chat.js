import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Header from "../Components/Header";

import MainChat from "../Components/MainChat";

function Chat() {
  useEffect(() => {
    document.title = "Chat";
  }, []);

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      style={{ height: "100vh", background: "yellow" }}
      alignItems="stretch"
    >
      <Grid item>
        <Header title="Chat" />
      </Grid>
      <Grid
        item
        container
        direction="row"
        style={{ height: "100%", background: "red" }}
        alignItems="stretch"
      >
        <Grid item style={{ background: "green", width: "100%" }}>
          t
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Chat;
