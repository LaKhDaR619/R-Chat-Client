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
  TextField,
  FormHelperText,
} from "@material-ui/core";

function Friends({
  friends,
  setRead,
  selectedIndex,
  setSelectedIndex,
  showFriends,
  setShowFriends,
  addFriend,
  friendError,
}) {
  useLayoutEffect(() => {
    function updateSize() {
      if (ref.current) {
        const extraHeight = 210;
        ref.current.style.setProperty(
          "height",
          `${document.getElementById("root").clientHeight - extraHeight}px`
        );
      }

      if (window.innerWidth >= 600) setDisplay("block");
      else setDisplay(showFriends ? "block" : "none");
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [showFriends]);

  useEffect(() => {
    // if the messages aren't read
    if (friends.length > 0 && friends[selectedIndex].unRead)
      setRead(friends, selectedIndex);
  }, [selectedIndex, friends, setRead]);

  const handleContactChange = (index) => {
    setSelectedIndex(index);

    if (showFriends) setShowFriends(false);
  };
  // display stuff
  const [display, setDisplay] = useState("block");
  useEffect(() => {
    // making use of the size change
    if (window.innerWidth < 600) {
      setDisplay(showFriends ? "block" : "none");
    }
  }, [showFriends]);

  const handleAddFriend = () => {
    addFriend(friendId, friends);
  };

  const [friendId, setFriendId] = useState("");
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
      <TextField
        variant="outlined"
        label="Add Friend"
        style={{
          width: "95%",
          marginTop: "10px",
          marginLeft: "5px",
          marginRight: "5px",
        }}
        value={friendId}
        onChange={(e) => setFriendId(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleAddFriend();
        }}
        error={friendError.length > 0}
      />
      <FormHelperText
        style={{
          marginLeft: "10px",
        }}
        error={true}
      >
        {friendError}
      </FormHelperText>
    </Box>
  );
}

export default Friends;
