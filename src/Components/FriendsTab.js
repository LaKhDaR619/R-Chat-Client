import React, { useRef, useLayoutEffect } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  ListItemText,
} from "@material-ui/core";

function Friends({ friends, selectedIndex, setSelectedIndex }) {
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

  const handleContactChange = (index) => {
    setSelectedIndex(index);
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
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default Friends;
