import React, { useRef, useEffect, useLayoutEffect } from "react";
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
}) {
  useLayoutEffect(() => {
    function updateSize() {
      ref.current.style.setProperty(
        "height",
        `${document.getElementById("root").clientHeight - 124}px`
      );
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [selectedIndex]);

  const handleContactChange = (index) => {
    setSelectedIndex(index);

    // if the messages aren't read
    if (friends[index].unRead) setRead(friends, index);
  };

  const ref = useRef();

  return (
    <Box
      item
      component={Grid}
      sm={4}
      lg={3}
      xl={2}
      display={{ xs: "none", sm: "block" }}
    >
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
