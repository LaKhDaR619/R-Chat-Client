import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";

function SendMessageTab({ message, setMessage, handleSendMessage }) {
  return (
    <Grid item container>
      <Grid item xs={10}>
        <TextField
          variant="outlined"
          type="text"
          style={{ width: "100%" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          style={{ height: "100%", width: "100%" }}
          variant="text"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Grid>
      <audio id="notification" src={require("../assets/stairs.mp3")} muted />
    </Grid>
  );
}

export default SendMessageTab;
