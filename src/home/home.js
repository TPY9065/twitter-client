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
      tweets: [],
      numTweets: 0,
      page: 0,
      currHeight: 0,
    };
  }

  addNewTweet = (tweet) => {
    const tweets = this.state.tweets;
    tweets.push(tweet);
    this.setState((prevState) => ({
      tweets: tweets,
      numTweets: prevState.numTweets + 1,
    }));
  };

  loadTweets = () => {
    axios({
      url: "http://localhost:3000/get/tweets",
      method: "post",
      data: { page: this.state.page },
    })
      .then((response) => {
        if (response.status === 200) {
          for (var key in response.data.tweets) {
            this.addNewTweet(response.data.tweets[key]);
          }
          this.setState((prevState) => ({
            page: prevState.page + 1,
            currHeight: document.getElementById("messagePanel").scrollHeight,
          }));
        } else {
          throw response.data.message;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.loadTweets();
    window.addEventListener("scroll", () => {
      if (
        window.pageYOffset + window.innerHeight >=
        document.body.scrollHeight
      ) {
        console.log("you're at the bottom of the page");
        this.loadTweets();
      }
    });
  }

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
