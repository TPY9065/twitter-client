import React, { Component } from "react";
import { Feed } from "semantic-ui-react";
import { IconButton } from "@material-ui/core";
import Comment from "./svg/commentSvg";
import Share from "./svg/shareSvg";
import Like from "./svg/likeSvg";
import Liked from "./svg/likedSvg";
import Retweet from "./svg/retweetSvg";
import "./tweet.css";
import Media from "./media";
import image from "./img/IMG_3707.jpg";
import CommentBoard from "../comment/comment";
import { Redirect } from "react-router-dom";

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: this.props.tweetInfo.like,
      liked: false,
      open: false,
      comment: this.props.tweetInfo.comment,
      clicked: false,
    };
  }

  handleOnClickLike = (event) => {
    event.stopPropagation();
    this.props.handleOnClickLike(
      event,
      this.props.tweetInfo._id,
      this.state.liked
    );
    if (this.state.liked) {
      this.setState({
        like: this.state.like - 1,
      });
    } else {
      this.setState({ like: this.state.like + 1 });
    }
    this.setState({ liked: !this.state.liked });
  };

  handleOnUpdateComment = () => {
    this.setState({ comment: this.state.comment + 1 });
  };

  handleOnOpenModal = (e) => {
    e.stopPropagation();
    this.setState({ open: true });
  };

  handleOnCloseModal = () => {
    this.setState({ open: false });
  };

  handleOnClickTweet = () => {
    this.setState({ clicked: true });
  };

  render() {
    var media = this.props.tweetInfo.media
      ? this.props.tweetInfo.media[0]
        ? this.props.tweetInfo.media[0]
        : this.props.tweetInfo.media
      : null;
    var likeMetaData = "metaData";
    if (this.state.liked) {
      likeMetaData = "likeMetaData";
    } else {
      likeMetaData = "metaData";
    }
    return (
      <div onClick={this.handleOnClickTweet}>
        <Feed id="tweetContainer">
          <Feed.Event id="tweetEvent">
            <Feed.Label image={image} id="userIcon" />
            <Feed.Content id="tweetContent">
              <Feed.Summary id="tweetSummary">
                <a href="/home">{this.props.tweetInfo.username}</a>
                <Feed.Date>{this.props.tweetInfo.time}</Feed.Date>
              </Feed.Summary>
              <Feed.Extra text id="tweetText">
                {this.props.tweetInfo.text}
                {this.props.tweetInfo.media ? <Media media={media} /> : null}
              </Feed.Extra>
              <Feed.Meta id="tweetMeta">
                <div id="buttonContainer">
                  <IconButton
                    component="label"
                    id="comment"
                    onClick={(event) => this.handleOnOpenModal(event)}
                  >
                    <Comment />
                  </IconButton>
                  <span id="metaData">{this.state.comment}</span>
                  <CommentBoard
                    isOpen={this.state.open}
                    handleOnCloseModal={this.handleOnCloseModal}
                    image={image}
                    tweetInfo={this.props.tweetInfo}
                    media={media}
                    replyTweetId={this.props.tweetInfo._id}
                    handleOnUpdateComment={this.handleOnUpdateComment}
                  />
                </div>
                <div id="buttonContainer">
                  <IconButton component="label" id="retweet">
                    <Retweet />
                  </IconButton>
                  <span id="metaData">{this.props.tweetInfo.retweets}</span>
                </div>
                <div id="buttonContainer">
                  <IconButton
                    component="label"
                    id="like"
                    onClick={(event) => this.handleOnClickLike(event)}
                  >
                    {this.state.liked ? <Liked id="liked" /> : <Like />}
                  </IconButton>
                  <span id={likeMetaData}>{this.state.like}</span>
                </div>
                <div id="buttonContainer">
                  <IconButton component="label" id="share">
                    <Share />
                  </IconButton>
                </div>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        </Feed>
        {this.state.clicked ? (
          <Redirect
            push
            to={{
              pathname: `/tweet/${this.props.tweetInfo._id}`,
              state: { tweetInfo: this.props.tweetInfo },
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default Tweet;
