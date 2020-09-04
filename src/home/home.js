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
      page: 0,
      currHeight: 0,
    };
  }

  addNewTweet = (tweet) => {
    const tweets = Object.assign({}, this.state.tweets);
    tweets[tweet._id] = tweet;
    this.setState({
      tweets: tweets,
      numTweets: this.state.numTweets + 1,
    });
  };

  componentDidMount() {
    console.log("Component did mount");
    axios({
      url: "http://localhost:3000/get/tweets",
      method: "post",
      data: { page: this.state.page },
    })
      .then((response) => {
        for (var key in response.data.tweets) {
          this.addNewTweet(response.data.tweets[key]);
        }
        this.setState({
          page: this.state.page + 1,
          currHeight: document.getElementById("messagePanel").scrollHeight,
        });
        console.log(this.state.currHeight);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // componentWillMount() {
  //   console.log("Component will mount");
  //   window.addEventListener("scroll", function () {
  //     if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
  //       console.log("you're at the bottom of the page");
  //       //show loading spinner and make fetch request to api
  //     }
  //   });
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

  shouldComponentUpdate() {
    console.log(
      `currHeight: ${this.state.currHeight}, windowHeight: ${window.innerHeight}`
    );
    if (this.state.currHeight > window.innerHeight * (this.state.page + 1)) {
      console.log("Stop");
      this.setState({ currHeight: 0 });
      axios({
        url: "http://localhost:3000/get/tweets",
        method: "post",
        data: { page: this.state.page },
      })
        .then((response) => {
          for (var key in response.data.tweets) {
            this.addNewTweet(response.data.tweets[key]);
          }
          this.setState({
            page: this.state.page + 1,
            currHeight: document.getElementById("messagePanel").scrollHeight,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      return true;
    }
    return true;
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
