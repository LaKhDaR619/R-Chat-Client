import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";

function SendMessageTab({
  message,
  setMessage,
  handleSendMessage,
  typing,
  setTyping,
}) {
  const handleTextChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value === "") {
      setTyping(false);
    } else if (!typing) {
      setTyping(true);
    }
  };

  return (
    <Grid item container>
      <Grid item xs={8} sm={10}>
        <TextField
          variant="outlined"
          type="text"
          style={{ width: "100%", marginLeft: "5px" }}
          value={message}
          onChange={handleTextChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
      </Grid>
      <Grid item xs={4} sm={2}>
        <Button
          style={{ height: "100%", width: "80%", marginLeft: "10px" }}
          variant="text"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
}

export default SendMessageTab;
