import React, { Component } from "react";
import MessagePanel from "./messagePanel";
import "./home.css";
import Tweet from "./tweet";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="home">
        <Tweet />
        {/* <Setting />
        <TwittingPanel /> */}
      </div>
    );
  }
}

export default Home;
