import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  Grid,
  List,
  Typography,
  Button,
  ListItemText,
  TextField,
  CircularProgress,
  ListItem,
} from "@material-ui/core";

import io from "socket.io-client";

let socket;

function scrollToBottom() {
  var div = document.getElementById("list");
  div.scrollTop = div.scrollHeight - div.clientHeight;
}

function MessagesTab({ friends, setFriends, selectedIndex, user }) {
  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.on(user.username, (msg) => {
      let temp;

      // if the message confirmation
      if (msg.sender === user.username) {
        console.log("confirmation");
        console.log(msg);

        temp = friends.map((friend) => {
          if (friend.username === msg.receiver) {
            friend.messages = friend.messages.map((message) => {
              console.log(message);
              console.log(message.pending && message.message === msg.message);
              if (message.pending && message.message === msg.message) {
                console.log(message);
                message.pending = false;
              }
              return message;
            });
          }
          return friend;
        });
      }
      // if we received a message from another user
      else {
        let senderIsFriend = false;

        temp = friends.map((friend) => {
          if (friend.username === msg.sender) {
            senderIsFriend = true;
            friend.messages.push(msg);
          }
          return friend;
        });

        if (!senderIsFriend)
          temp.push({ username: msg.sender, messages: [msg] });
      }

      setFriends(temp);
      setMessage("");
      scrollToBottom();
    });
  }, [user.username]);

  useLayoutEffect(() => {
    function updateSize() {
      ref.current.style.setProperty(
        "height",
        `${document.getElementById("root").clientHeight - 185}px`
      );
      scrollToBottom();
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const [message, setMessage] = useState("");

  const ref = useRef();

  const handleSendMessage = () => {
    setMessage("");

    const receiver = {
      receiver: friends[selectedIndex].username,
      message,
      pending: true,
    };
    console.log(receiver);

    socket.emit("message", receiver);

    const temp = friends.map((friend) => {
      if (friend.username === receiver.receiver) {
        friend.messages.push({
          sender: user.username,
          message,
          pending: true,
        });
      }
      return friend;
    });
    setFriends(temp);
    scrollToBottom();
  };

  return (
    <Grid
      item
      container
      style={{ paddingLeft: 15 }}
      direction="column"
      xs={12}
      sm={8}
      lg={9}
      xl={10}
    >
      <Grid item container direction="column" justify="flex-end">
        <Typography variant="h4">
          {friends.length > 0 ? friends[selectedIndex].username : "Messages"}
        </Typography>
        <List
          id="list"
          ref={ref}
          style={{
            overflowY: "scroll",
          }}
        >
          {friends.length > 0 && friends[selectedIndex].messages.length > 0
            ? friends[selectedIndex].messages.map((message, index) => (
                <ListItem style={{ padding: 0 }} key={index}>
                  <ListItemText>{`${message.sender}: ${message.message}`}</ListItemText>
                  {message.pending ? <CircularProgress size={25} /> : null}
                </ListItem>
              ))
            : null}
        </List>
      </Grid>
      <Grid item container>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            type="text"
            style={{ width: "100%" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
      </Grid>
    </Grid>
  );
}

export default MessagesTab;
