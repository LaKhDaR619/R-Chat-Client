import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";

//import io from "socket.io-client";

function Main({ loggedIn }) {
  useEffect(() => {
    document.title = "Main";

    return () => {};
  }, []);

  return (
    <div className="main-wrapper">
      <h1>Main</h1>
      <h1>{loggedIn + ""}</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/chat">Chat</Link>
      <Button>test</Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

/*onClick={() => {
          const socket = io.connect("http://localhost:5000");
          console.log(socket);
          socket.emit("message", "test");
        }} */

export default connect(mapStateToProps, null)(Main);
