import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  ListItemText,
  Badge,
} from "@material-ui/core";

function Friends({
  friends,
  setRead,
  selectedIndex,
  setSelectedIndex,
  scrollToBottom,
  showFriends,
  setShowFriends,
}) {
  useLayoutEffect(() => {
    function updateSize() {
      if (ref.current)
        ref.current.style.setProperty(
          "height",
          `${document.getElementById("root").clientHeight - 124}px`
        );

      if (window.innerWidth >= 600) setDisplay("block");
      else setDisplay(showFriends ? "block" : "none");
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [showFriends]);

  useEffect(() => {
    scrollToBottom();
    // if the messages aren't read
    if (friends[selectedIndex].unRead) setRead(friends, selectedIndex);
  }, [selectedIndex, friends, scrollToBottom, setRead]);

  const handleContactChange = (index) => {
    setSelectedIndex(index);

    setShowFriends(false);
  };

  // display stuff
  const [display, setDisplay] = useState("block");
  useEffect(() => {
    // making use of the size change
    if (window.innerWidth < 600) {
      setDisplay(showFriends ? "block" : "none");
    }
  }, [showFriends]);

  const ref = useRef();

  return (
    <Box component={Grid} item xs={12} sm={4} lg={3} xl={2} style={{ display }}>
      <Typography variant="h4">Friends</Typography>
      <List
        ref={ref}
        id="friends"
        style={{
          overflowY: "scroll",
        }}
      >
        {friends.map((item, index) => {
          return (
            <ListItem
              key={index}
              button
              selected={selectedIndex === index}
              onClick={() => handleContactChange(index)}
            >
              <ListItemAvatar>
                <Avatar
                  alt={item.username}
                  src={`/static/images/avatar/${index + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText primary={item.username} />
              {item.unRead ? <Badge color="secondary" variant="dot" /> : null}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default Friends;
