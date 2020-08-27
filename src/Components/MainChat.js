import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  ListItemAvatar,
  Button,
  List,
  ListItem,
  Avatar,
  ListItemText,
  TextField,
} from "@material-ui/core";
import io from "socket.io-client";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const socket = io("http://localhost:5000");

const useStyles = makeStyles({
  flex: {
    height: "100%",
    background: "red",
  },
  fh: {
    height: "100%",
  },
  fw: {
    width: "100%",
  },
  fwh: {
    height: "100%",
    width: "100%",
  },
  scroll: {
    overflow: "scroll",
  },
  center: {
    textAlign: "center",
  },
  mgTop: {
    marginTop: "15px",
  },
  red: {
    background: "red",
  },
  green: {
    background: "green",
  },
  blue: {
    background: "blue",
  },
});

function MainChat({ user, getFriends, friends }) {
  useEffect(() => {
    socket.on(user.username, (msg) => {
      console.log("MainChat");
      console.log(msg);
    });

    console.log(friends);
    getFriends();
  }, [getFriends]);

  const classes = useStyles();

  const temp = [];

  for (let i = 0; i < 40; i++) {
    temp.push("test");
  }

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(temp);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleContactChange = (index) => {
    setSelectedIndex(index);
  };

  const handleSendMessage = () => {
    socket.emit("message", {
      receiver: friends[selectedIndex].username,
      message,
    });
  };
  return (
    <Grid item container direction="row" className={classes.green}>
      <Box
        item
        component={Grid}
        sm={4}
        lg={3}
        xl={2}
        display={{ xs: "none", sm: "block" }}
        className={classes.red}
      >
        <Typography variant="h4">Friends</Typography>
        <List
          style={{
            maxHeight: `${
              document.getElementById("root").clientHeight - 120
            }px`,
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
      <Grid
        className={classes.green}
        item
        container
        direction="column"
        wrap="nowrap"
        xs={12}
        sm={8}
        lg={9}
        xl={10}
        style={{
          height: `${document.getElementById("root").clientHeight - 70}px`,
        }}
      >
        <Grid
          item
          container
          direction="column"
          wrap="nowrap"
          justify="space-between"
          style={{
            height: `${document.getElementById("root").clientHeight - 130}px`,
          }}
        >
          <Typography variant="h4">
            {friends.length > 0 ? friends[selectedIndex].username : null}
          </Typography>
          <List style={{ overflowY: "scroll" }}>
            {messages.map((message, index) => (
              <ListItemText key={index}>{message}</ListItemText>
            ))}
          </List>
        </Grid>
        <Grid item container style={{ height: 60 }}>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              type="text"
              className={classes.fw}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.fwh}
              variant="text"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    friends: state.chat.friends,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFriends: () => dispatch({ type: "GET_FRIENDS" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainChat);
