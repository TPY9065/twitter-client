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

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: this.props.tweetInfo.like,
      liked: false,
      open: false,
    };
    this.innerRef = React.createRef();
  }

  handleOnClickLike = (event) => {
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

  handleOnOpenModal = () => {
    this.setState({ open: true });
  };

  handleOnCloseModal = () => {
    this.setState({ open: false });
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
      <div>
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
                    onClick={this.handleOnOpenModal}
                  >
                    <Comment />
                  </IconButton>
                  <span id="metaData">{this.props.tweetInfo.comment}</span>
                  <CommentBoard
                    isOpen={this.state.open}
                    handleOnCloseModal={this.handleOnCloseModal}
                    image={image}
                    tweetInfo={this.props.tweetInfo}
                    media={media}
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
                    onClick={this.handleOnClickLike}
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
      </div>
    );
  }
}

export default Tweet;
