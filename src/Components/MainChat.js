import React, { useState, useLayoutEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import Friends from "./FriendsTab";

import { connect } from "react-redux";
import MessagesTab from "./MessagesTab";

// scroll messages to bottoms
function scrollToBottom() {
  let div = document.getElementById("messages");
  if (div) div.scrollTop = div.scrollHeight - div.clientHeight;
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
  someoneTyping,
  addFriend,
  friendError,
}) {
  useLayoutEffect(() => {
    function updateSize() {
      if (ref.current)
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

  const [showFriends, setShowFriends] = useState(false);

  const backToFriends = () => {
    if (!showFriends) setShowFriends(true);
  };

  return (
    <Grid item container direction="row" ref={ref}>
      <Friends
        friends={friends}
        setRead={setRead}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        scrollToBottom={scrollToBottom}
        showFriends={showFriends}
        setShowFriends={setShowFriends}
        addFriend={addFriend}
        friendError={friendError}
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
        showFriends={showFriends}
        backToFriends={backToFriends}
        someoneTyping={someoneTyping}
      />
      <audio id="notification" src={require("../assets/stairs.mp3")} muted />
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    friends: state.chat.friends,
    selectedIndex: state.chat.selectedIndex,
    friendError: state.chat.friendError,
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
    receiveMessage: (msg, scrollToTop) => {
      dispatch({ type: "RECEIVE_MESSAGE", payload: { msg, scrollToTop } });
    },
    someoneTyping: (msg) => {
      dispatch({ type: "SOMEONE_TYPING", payload: msg });
    },
    addFriend: (id, friends) => {
      dispatch({ type: "ADD_FRIEND", payload: { id, friends } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainChat);
