import React, { useLayoutEffect, useRef } from "react";
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

function MainChat({
  user,
  friends,
  setFriends,
  selectedIndex,
  setSelectedIndex,
  setRead,
  messageConfirmation,
  receiveMessage,
}) {
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
        receiveMessage={receiveMessage}
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
    selectedIndex: state.chat.selectedIndex,
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
    setSelectedIndex: (selectedIndex) => {
      dispatch({ type: "SET_SELECTED_INDEX", payload: { selectedIndex } });
    },
    messageConfirmation: (msg) => {
      dispatch({ type: "MESSAGE_CONFIRMATION", payload: { msg } });
    },
    receiveMessage: (msg) => {
      dispatch({ type: "RECEIVE_MESSAGE", payload: { msg } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainChat);
