import React, { Component } from "react";
import NavBar from "./navBar/navbar";
import "./home.css";
import Sender from "./sender/sender";
import Tweet from "./tweet/tweet";

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
    this.setState({ tweets: tweets, numTweets: this.state.numTweets + 1 });
  };

  render() {
    return (
      <div id="container">
        <NavBar id="navbar" />
        <div id="messagePanel">
          <Sender
            id="sender"
            tweets={this.state.tweets}
            addNewTweet={this.addNewTweet}
          />
          <div id="border" />
          {this.state.tweets ? (
            Object.keys(this.state.tweets).map((id) => {
              return (
                <Tweet
                  tweetInfo={this.state.tweets[id]}
                  key={id}
                  postId={this.state.tweets[id]._id}
                />
              );
            })
          ) : (
            <Tweet />
          )}
          <Tweet />
          <Tweet />
        </div>
      </div>
    );
  }
}

export default Home;
