import React, { Component } from "react";
import NavBar from "./navBar/navbar";
import "./home.css";
import Sender from "./sender/sender";
import Tweet from "./tweet/tweet";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="container">
        <NavBar id="navbar" />
        <div id="messagePanel">
          <Sender id="sender" />
          <Tweet />
        </div>
      </div>
    );
  }
}

export default Home;
