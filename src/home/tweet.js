import React, { Component } from "react";
import { Container, Card, Feed, Icon, Image, Divider } from "semantic-ui-react";
import image from "./img/IMG_3707.jpg";
import image1 from "./img/IMG_3706.jpg";
import "./tweet.css";

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container textAlign="center">
        <Card fluid id="tweetCard">
          <Feed id="tweet">
            <Feed.Event id="tweetEvent">
              <Feed.Label image={image} id="userIcon" />
              <Feed.Content id="tweetContent">
                <Feed.Summary id="tweetSummary">
                  <Feed.User id="username">User</Feed.User>
                  <Feed.Date id="postDate">3 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text id="tweetText">
                  Hello World
                </Feed.Extra>
                <Feed.Extra id="tweetMedia">
                  <Image.Group id="mediaGroup1">
                    <div id="mediaContainer">
                      <Image src={image1} id="imageUploaded1" />
                    </div>
                    <div id="mediaContainer">
                      <Image src={image} id="imageUploaded2" />
                    </div>
                  </Image.Group>
                  <Image.Group id="mediaGroup2">
                    <Image src={image} id="imageUploaded3" />
                    <Image src={image1} id="imageUploaded4" />
                  </Image.Group>
                </Feed.Extra>
                <Feed.Meta id="tweetFunction">
                  <Icon name="comment outline" id="functionIcon" />
                  <Icon name="retweet" id="functionIcon" />
                  <Icon name="like" id="functionIcon" />
                  <Icon name="share" id="functionIcon" />
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card>
      </Container>
    );
  }
}

export default Tweet;
