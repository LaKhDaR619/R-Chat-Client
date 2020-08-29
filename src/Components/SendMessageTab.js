import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";

function SendMessageTab({
  friends,
  selectedIndex,
  setSelectedIndex,
  user,
  socket,
  setFriends,
}) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message) return;

    setMessage("");

    const receiver = {
      receiver: friends[selectedIndex].username,
      message,
      pending: true,
    };

    const temp = [...friends];
    const foundIndex = friends.findIndex(
      (friend) => friend.username === receiver.receiver
    );

    temp[foundIndex].messages.push({
      sender: user.username,
      message,
      pending: true,
    });

    // getting friend from the array
    const friend = temp[foundIndex];
    //delteting the friend from the array
    temp.splice(foundIndex, 1);
    // pushing it again at the beggining
    temp.splice(0, 0, friend);

    socket.emit("message", receiver);

    setSelectedIndex(0);
    setFriends(temp);
  };

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
            if (e.key == "Enter") handleSendMessage();
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
