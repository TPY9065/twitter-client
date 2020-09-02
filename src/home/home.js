import React, { Component } from "react";
import axios from "axios";
import NavBar from "./navBar/navbar";
import Sender from "./sender/sender";
import Tweet from "./tweet/tweet";
import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: {},
      numTweets: 0,
    };
  }

  addNewTweet = (tweet) => {
    const tweets = Object.assign({}, this.state.tweets);
    tweets[this.state.numTweets] = tweet;
    console.log(tweet);
    this.setState({ tweets: tweets, numTweets: this.state.numTweets + 1 });
  };

  componentDidMount() {
    console.log("Component did mount");
    axios
      .get("http://localhost:3000/get/tweets")
      .then((response) => {
        for (var key in response.data.tweets) {
          this.addNewTweet(response.data.tweets[key]);
        }
      })
      .catch((err) => {
        console.log("empty tweets");
      });
  }

  render() {
    return (
      <div id="container">
        <NavBar id="navbar" />
        <div id="messagePanel">
          <Sender id="sender" addNewTweet={this.addNewTweet} />
          <div id="border" />
          {this.state.numTweets === 0
            ? null
            : Object.keys(this.state.tweets).map((id) => {
                return (
                  <Tweet
                    tweetInfo={this.state.tweets[id]}
                    key={id}
                    postId={this.state.tweets[id]._id}
                  />
                );
              })}
        </div>
      </div>
    );
  }
}

export default Home;
