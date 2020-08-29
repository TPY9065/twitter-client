import React, { Component } from "react";
import { Feed, Icon } from "semantic-ui-react";
import "./tweet.css";
import Media from "./media";
import image from "./img/IMG_3707.jpg";

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Feed id="tweetContainer">
          <Feed.Event id="tweetEvent">
            <Feed.Label image={image} id="userIcon" />
            <Feed.Content id="tweetContent">
              <Feed.Summary id="tweetSummary">
                <a href="/home">Lawrence</a>
                <Feed.Date>
                  {new Date().toLocaleString("ch", { hour12: false })}
                </Feed.Date>
              </Feed.Summary>
              <Feed.Extra text id="tweetText"></Feed.Extra>
              <Media />
              <Feed.Meta id="tweetMeta">
                <Feed.Like>
                  <Icon name="comment outline" />0
                </Feed.Like>
                <Feed.Like>
                  <Icon name="retweet" />0
                </Feed.Like>
                <Feed.Like>
                  <Icon name="heart outline" />0
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