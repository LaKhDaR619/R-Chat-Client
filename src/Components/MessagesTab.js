import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  Grid,
  List,
  Typography,
  ListItemText,
  CircularProgress,
  ListItem,
} from "@material-ui/core";

import io from "socket.io-client";
import SendMessageTab from "./SendMessageTab";

let socket;

function MessagesTab({
  friends,
  setFriends,
  setRead,
  selectedIndex,
  setSelectedIndex,
  user,
  receiveMessage,
  messageConfirmation,
  scrollToTop,
}) {
  const handleSocketEvent = (msg) => {
    let temp = [...friends];

    // if the message confirmation
    if (msg.sender === user.username) {
      messageConfirmation(msg, setRead);
    }
    // if we received a message from another user
    else {
      receiveMessage(msg, scrollToTop);

      // playing receive message sound
      const notification = document.getElementById("notification");
      notification.muted = false;
      notification.play();
      notification.muted = false;
    }
  };

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

  useEffect(() => {
    // socket = io("http://localhost:5000", { forceNew: true });
    socket = io("/", { forceNew: true });

    // received a message
    console.log("on");
    socket.on(user.username, handleSocketEvent);

    return () => {
      console.log("off");
      socket.off(user.username);
    };
  }, [user.username]);

  useLayoutEffect(() => {
    function updateSize() {
      ref.current.style.setProperty(
        "height",
        `${document.getElementById("root").clientHeight - 185}px`
      );
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const ref = useRef();

  return (
    <Grid
      item
      component={Grid}
      container
      direction="column"
      xs={12}
      sm={8}
      lg={9}
      xl={10}
    >
      <Grid item container direction="column" justify="flex-end">
        <Typography variant="h4">
          {friends.length > 0 && friends.length > selectedIndex
            ? friends[selectedIndex].username
            : "Messages"}
        </Typography>
        <List
          id="messages"
          ref={ref}
          style={{
            overflowY: "scroll",
          }}
        >
          {friends.length > 0 && friends.length > selectedIndex
            ? friends[selectedIndex].messages.map((message, index) => (
                <ListItem style={{ padding: 0 }} key={index}>
                  {message.pending || true ? (
                    <CircularProgress
                      size={25}
                      variant={message.pending ? "indeterminate" : "static"}
                      value={0}
                      style={{
                        marginRight: "10px",
                      }}
                    />
                  ) : null}
                  <ListItemText>{`${message.sender}: ${message.message}`}</ListItemText>
                </ListItem>
              ))
            : null}
        </List>
      </Grid>
      <SendMessageTab
        friends={friends}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        user={user}
        socket={socket}
        setFriends={setFriends}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </Grid>
  );
}

export default MessagesTab;
