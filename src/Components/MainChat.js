import React, { useLayoutEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import Friends from "./FriendsTab";

import { connect } from "react-redux";
import MessagesTab from "./MessagesTab";

function MainChat({ user, friends, setFriends }) {
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

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const ref = useRef();

  return (
    <Grid item container direction="row" ref={ref}>
      <Friends
        friends={friends}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <MessagesTab
        user={user}
        friends={friends}
        setFriends={setFriends}
        selectedIndex={selectedIndex}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainChat);
