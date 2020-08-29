import React, { useState, useLayoutEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import Friends from "./FriendsTab";

import { connect } from "react-redux";
import MessagesTab from "./MessagesTab";

// scroll messages to bottoms
function scrollToBottom() {
  let div = document.getElementById("messages");
  div.scrollTop = div.scrollHeight - div.clientHeight;
}

// scroll friends to top
function scrollToTop() {
  let friends = document.getElementById("friends");
  friends.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

function MainChat({ user, friends, setFriends, setRead, messageConfirmation }) {
  useLayoutEffect(() => {
    function updateSize() {
      ref.current.style.setProperty(
        "height",
        `${document.getElementById("root").clientHeight - 65}px`
      );
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const ref = useRef();

  return (
    <Grid item container direction="row" ref={ref}>
      <Friends
        friends={friends}
        setRead={setRead}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        scrollToBottom={scrollToBottom}
      />
      <MessagesTab
        user={user}
        friends={friends}
        setFriends={setFriends}
        setRead={setRead}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        messageConfirmation={messageConfirmation}
        scrollToBottom={scrollToBottom}
        scrollToTop={scrollToTop}
      />
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
    setFriends: (friends) => {
      dispatch({ type: "SET_FRIENDS", payload: { friends } });
    },
    setRead: (friends, index) => {
      dispatch({ type: "SET_READ", payload: { friends, index } });
    },
    messageConfirmation: (msg) => {
      dispatch({ type: "MESSAGE_CONFIRMATION", payload: { msg } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainChat);
