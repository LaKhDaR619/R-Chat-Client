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
      style={{ height: "100vh" }}
      alignItems="stretch"
    >
      <Grid item>
        <Header title="Chat" />
      </Grid>
      <MainChat />
    </Grid>
  );
}

export default Chat;
