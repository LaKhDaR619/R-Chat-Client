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

function MessagesTab({
  friends,
  setFriends,
  setRead,
  selectedIndex,
  user,
  scrollToBottom,
}) {
  useEffect(() => {
    scrollToBottom();
  }, [friends]);

  useEffect(() => {
    socket = io("http://localhost:5000");

    // received a message
    socket.on(user.username, (msg) => {
      let temp = [...friends];

      // refactor it using findIndex later
      // if the message confirmation
      if (msg.sender === user.username) {
        temp = friends.map((friend) => {
          if (friend.username === msg.receiver) {
            friend.messages = friend.messages.map((message) => {
              if (message.pending && message.message === msg.message) {
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
        const foundIndex = temp.findIndex(
          (friend) => friend.username === msg.sender
        );

        if (foundIndex === 0) setRead(friends, 0);

        // sender in friends
        if (foundIndex !== -1) {
          temp[foundIndex].messages.push(msg);
          temp[foundIndex].unRead = true;

          // getting the sender friend from the array
          const friend = temp[foundIndex];
          //delteting the friend from the array
          temp.splice(foundIndex, 1);
          // pushing it again at the beggining
          temp.splice(0, 0, friend);
        }
        // sender isn't in friends (so we add it)
        else {
          temp.splice(0, 0, {
            username: msg.sender,
            messages: [msg],
            unRead: true,
          });
        }
      }

      console.log("81");
      setFriends(temp);
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
                  <ListItemText
                    style={{
                      width: "60%",
                    }}
                  >{`${message.sender}: ${message.message}`}</ListItemText>
                  {message.pending ? (
                    <CircularProgress
                      size={25}
                      style={{
                        marginRight: "10px",
                      }}
                    />
                  ) : null}
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
      </Grid>
    </Grid>
  );
}

export default MessagesTab;
