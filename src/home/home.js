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
    tweets[tweet._id] = tweet;
    this.setState({ tweets: tweets, numTweets: this.state.numTweets + 1 });
  };

  componentDidMount() {
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

  // componentWillUnmount() {
  //   console.log("Component will unmount");
  // }

  handleOnClickLike = (e, tweetId) => {
    axios({
      url: "http://localhost:3000/update/tweet",
      method: "put",
      data: {
        id: tweetId,
        data: e.currentTarget.id,
      },
    });
  };

  componentDidUpdate() {
    console.log("Component did update");
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
            : Object.keys(this.state.tweets)
                .reverse()
                .map((id) => {
                  return (
                    <Tweet
                      tweetInfo={this.state.tweets[id]}
                      key={id}
                      postId={id}
                      handleOnClickLike={this.handleOnClickLike}
                    />
                  );
                })}
        </div>
      </div>
    );
  }
}

export default Home;
