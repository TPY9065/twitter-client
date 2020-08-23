import React, { Component } from "react";
import { Feed, Icon, Image } from "semantic-ui-react";
import image from "./img/IMG_3707.jpg";
import image1 from "./img/IMG_3706.jpg";
import "./tweet.css";

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnMouseOver = (e) => {
    e.target.style.background = "rgb(245, 248, 250)";
  };

  handleOnMouseLeave = (e) => {
    e.target.style.background = "white";
  };

  render() {
    return (
      <div>
        <Feed id="tweetContainer">
          <Feed.Event id="tweetEvent">
            <Feed.Label image={image} id="userIcon" />
            <Feed.Content id="tweetContent">
              <Feed.Summary id="tweetSummary">
                <a>Lawrence</a>
                <Feed.Date>
                  {new Date().toLocaleString("ch", { hour12: false })}
                </Feed.Date>
              </Feed.Summary>
              <Feed.Extra text id="tweetText"></Feed.Extra>
              <Feed.Extra images id="tweetMedia">
                <div id="mediaContainer1">
                  <Image src={image1} id="imageUploaded1" />
                </div>
                <div id="mediaContainer2">
                  <Image src={image} id="imageUploaded2" />
                </div>
                <div id="mediaContainer3">
                  <Image src={image} id="imageUploaded3" />
                </div>
                <div id="mediaContainer4">
                  <Image src={image1} id="imageUploaded4" />
                </div>
              </Feed.Extra>
              <Feed.Meta id="tweetMeta">
                <Feed.Like>
                  <Icon name="comment outline" />
                  41
                </Feed.Like>
                <Feed.Like>
                  <Icon name="retweet" />
                  41
                </Feed.Like>
                <Feed.Like>
                  <Icon name="heart outline" />
                  41
                </Feed.Like>
                <Feed.Like>
                  <Icon name="share square" />
                </Feed.Like>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </div>
    );
  }
}

export default Tweet;
