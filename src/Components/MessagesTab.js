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

let socket = io("http://localhost:5000");
//let socket = io("/");

function MessagesTab({
  friends,
  setFriends,
  setRead,
  selectedIndex,
  setSelectedIndex,
  user,
  scrollToBottom,
  scrollToTop,
}) {
  const handleSocketEvent = (msg) => {
    let temp = [...friends];

    // if the message confirmation
    if (msg.sender === user.username) {
      const friendIndex = temp.findIndex(
        (friend) => friend.username === msg.receiver
      );

      const messageIndex = temp[friendIndex].messages.findIndex(
        (message) => message.pending && message.message === msg.message
      );

      // removing pending
      temp[friendIndex].messages[messageIndex].pending = false;
    }
    // if we received a message from another user
    else {
      const foundIndex = temp.findIndex(
        (friend) => friend.username === msg.sender
      );

      // sender in friends
      if (foundIndex !== -1) {
        temp[foundIndex].messages.push(msg);
        // if we are in the senders chat we make the message read
        // and change the senders chat to be on top
        if (foundIndex === selectedIndex) {
          setRead(friends, foundIndex);
          setSelectedIndex(0);
          scrollToTop();
        }
        // else we make it unRead
        else {
          temp[foundIndex].unRead = true;
          if (foundIndex > selectedIndex) setSelectedIndex(selectedIndex + 1);
        }

        // getting the sender friend from the array
        const friend = temp[foundIndex];
        //delteting the friend from the array
        temp.splice(foundIndex, 1);
        // pushing it again at the beggining
        temp.splice(0, 0, friend);
      }
      // sender isn't in friends (so we add it)
      else {
        console.log(temp);
        temp.splice(0, 0, {
          username: msg.sender,
          messages: [msg],
          unRead: true,
        });
        console.log(temp);
        setSelectedIndex(selectedIndex + 1);
      }

      // playing receive message sound
      document.getElementById("notification").muted = false;
      document.getElementById("notification").play();
    }

    //console.log("81");
    setFriends(temp);
  };

  let end;

  useEffect(() => {
    scrollToBottom();
  }, [friends]);

  const [start, setStart] = useState(0);

  useEffect(() => {
    // received a message
    console.log("on");
    socket.on(user.username, handleSocketEvent);
    end = Date.now();
    if (start && end) {
      let elapsed = end - start;
      console.log(elapsed);
    }

    return () => {
      // i'm adding and removing listner because selected Index
      //didn't change inside this methode socket.on('')
      // same thing happend with friends
      setStart(Date.now());
      console.log("off");
      socket.off(user.username);
    };
  }, [user.username, selectedIndex, friends]);

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

  const [pendingMessages, setPendingMessages] = useState([]);
  const ref = useRef();

  return (
    <Grid
      item
      component={Grid}
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
                  <ListItemText>{`${message.sender}: ${message.message}`}</ListItemText>
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
      <SendMessageTab
        friends={friends}
        selectedIndex={selectedIndex}
        user={user}
        socket={socket}
        setFriends={setFriends}
      />
    </Grid>
  );
}

export default MessagesTab;
