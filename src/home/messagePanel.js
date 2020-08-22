import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Tweet from "./tweet";

class MessagePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      files: null,
      errMessage: "",
      tweetNum: 0,
    };
  }

  handleOnSubmit = async () => {
    if (!this.state.files) {
      this.setState({ errMessage: "Please choose a file" });
      return;
    }
    const formData = new FormData();
    console.log(this.state.files);
    Object.keys(this.state.files).map((id) => {
      formData.append("image", this.state.files[id]);
    });
    formData.append("text", "Hello World!");
    const response = await axios({
      url: "http://localhost:3000/post/tweet",
      method: "post",
      data: formData,
    });
    if (response.status === 200) {
      const tweets = this.state.tweets;
      tweets.push(response.data.tweet);
      this.setState({
        tweets: tweets,
        tweetNum: this.state.tweetNum + 1,
      });
    } else {
      console.log(response.data.message);
    }
  };

  handleOnChange = (e) => {
    this.setState({ files: e.target.files });
    console.log(e.target.files);
  };

  // showTweets = () => {
  //   for (var i = 0; i < this.state.tweetNum; i++) {
  //     <Tweet id={i} tweet={this.state.tweets[i]}></Tweet>;
  //   }
  // };

  render() {
    return (
      <div>
        <Form>
          <Form.Control
            id="file"
            type="file"
            multiple
            onChange={(event) => this.handleOnChange(event)}
          />
          {this.state.errMessage ? (
            <Form.Text className="text-muted">
              {this.state.errMessage}
            </Form.Text>
          ) : null}
          <Button
            variant="primary"
            onClick={(event) => {
              this.handleOnSubmit(event);
            }}
          >
            Submit
          </Button>
        </Form>
        {this.state.tweets ? (
          <Tweet tweet={this.state.tweets[0]}></Tweet>
        ) : null}
      </div>
    );
  }
}

export default MessagePanel;
