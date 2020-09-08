import React, { Component } from "react";
import NavBar from "../home/navBar/navbar";
import Tweet from "../home/tweet/tweet";
import { Card } from "semantic-ui-react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./tweetPost.css";
import { IconButton } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import axios from "axios";

class TweetPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backToHome: false,
      comments: [],
      page: 0,
      numComments: 0,
    };
  }

  handleOnClick = () => {
    this.setState({ backToHome: true });
  };

  handleOnClickLike = (e, tweetId, liked) => {
    axios({
      url: "http://localhost:3000/like/tweet",
      method: "put",
      data: {
        id: tweetId,
        data: e.currentTarget.id,
        liked: liked,
      },
    });
  };

  addNewComment = (comment) => {
    const comments = this.state.comments;
    comments.push(comment);
    this.setState((prevState) => ({
      comments: comments,
      numComments: prevState.numComments + 1,
    }));
  };

  loadComments = () => {
    axios({
      url: "http://localhost:3000/get/comments",
      method: "post",
      data: { replyTweetId: this.props.tweetInfo._id, page: this.state.page },
    })
      .then((response) => {
        if (response.status === 200) {
          for (var key in response.data.comments) {
            this.addNewComment(response.data.comments[key]);
          }
          console.log(this.state.comments);
          this.setState((prevState) => ({
            page: prevState.page + 1,
            currHeight: window.pageYOffset + window.innerHeight,
          }));
        }
      })
      .catch((err) => {
        window.removeEventListener("scroll", this.checkBottom);
      });
  };

  checkBottom = () => {
    if (window.pageYOffset + window.innerHeight >= document.body.scrollHeight) {
      console.log("you're at the bottom of the page");
      this.loadComments();
    }
  };

  componentDidMount() {
    this.loadComments();
    window.addEventListener("scroll", this.checkBottom);
  }

  render() {
    return (
      <div>
        <div id="container">
          <NavBar id="navbar" />
          <div id="messagePanel">
            <Card id="tweetPostCard">
              <Card.Content id="tweetPostHeaderContainer">
                <IconButton component="label" onClick={this.handleOnClick}>
                  <ArrowBackIcon />
                </IconButton>
                <Card.Header content="Tweet" id="tweetPostHeader" />
              </Card.Content>
              <Card.Content id="tweetPostContent">
                <Tweet
                  key={-1}
                  tweetInfo={this.props.tweetInfo}
                  handleOnClickLike={this.handleOnClickLike}
                />
              </Card.Content>
            </Card>
            {this.state.numComments
              ? Object.keys(this.state.comments).map((id) => {
                  return (
                    <Tweet
                      tweetInfo={this.state.comments[id]}
                      key={id}
                      postId={id}
                      handleOnClickLike={this.handleOnClickLike}
                      replyUser={this.props.tweetInfo.username}
                    />
                  );
                })
              : null}
          </div>
        </div>

        {this.state.backToHome ? <Redirect push to="/home" /> : null}
      </div>
    );
  }
}

export default TweetPost;
