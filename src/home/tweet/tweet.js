import React, { Component } from "react";
import { Feed, Icon } from "semantic-ui-react";
import { IconButton } from "@material-ui/core";
import Comment from "./svg/comment";
import Share from "./svg/share";
import Like from "./svg/like";
import Retweet from "./svg/retweet";
import "./tweet.css";
import Media from "./media";
import image from "./img/IMG_3707.jpg";

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: this.props.tweetInfo.like,
      liked: false,
    };
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

  render() {
    let media = this.props.tweetInfo.media
      ? this.props.tweetInfo.media[0]
        ? this.props.tweetInfo.media[0]
        : this.props.tweetInfo.media
      : null;
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
                  <IconButton component="label" id="comment">
                    <Comment />
                  </IconButton>
                  <span id="metaData">{this.props.tweetInfo.comment}</span>
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
                    <Like />
                  </IconButton>
                  <span id="metaData">{this.state.like}</span>
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
