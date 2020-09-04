import React, { Component } from "react";
import { Card, Feed } from "semantic-ui-react";
import { Form } from "react-bootstrap";
import TextareaAutosize from "react-autosize-textarea";
import "./sender.css";
import FunctionBar from "./functionBar";
import Questionnaire from "./questionnaire";
import Layout from "../tweet/layout";
import axios from "axios";

class Sender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      media: {},
      fileNum: 0,
      open: false,
      questionnaire: {
        numExtraChoice: 1,
        choiceArray: { 1: "", 2: "" },
      },
      userIcon: localStorage.getItem("image"),
      username: localStorage.getItem("username"),
      returnTweet: {},
    };
  }

  handleOnChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleOnUploadMedia = (e) => {
    if (this.state.fileNum + e.target.files.length > 4) {
      console.log("You should not upload more than 4 files");
    } else {
      const files = this.state.media;
      Object.keys(e.target.files).forEach((id) => {
        return (files[parseInt(id) + this.state.fileNum] = e.target.files[id]);
      });
      this.setState({
        media: files,
        fileNum: this.state.fileNum + e.target.files.length,
      });
      console.log(this.state.media);
    }
  };

  handleOnClickLocation = () => {
    console.log("Location");
  };

  handleOnOpenQuestionnaire = () => {
    if (this.state.open) {
      this.handleOnCloseQuestionnaire();
    } else {
      this.setState({ open: true });
    }
  };

  handleOnCloseQuestionnaire = () => {
    this.setState({
      open: false,
      questionnaire: {
        numExtraChoice: 1,
        choiceArray: { 1: "", 2: "" },
      },
    });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.setState({ text: "", media: {}, fileNum: 0 });
    this.handleOnCloseQuestionnaire();
  };

  handleOnClickSubmit = async () => {
    const formData = new FormData();
    formData.append("text", this.state.text);
    formData.append("username", "Lawrence");
    Object.keys(this.state.media).map((id) => {
      return formData.append("image", this.state.media[id]);
    });
    const response = await axios({
      url: "http://localhost:3000/post/tweet",
      data: formData,
      method: "post",
    });
    if (response.status === 200) {
      console.log(response.data.tweet);
      this.props.postNewTweet(response.data.tweet);
    }
  };

  handleOnAddChoice = () => {
    const questionnaire = this.state.questionnaire;
    questionnaire.numExtraChoice = questionnaire.numExtraChoice + 1;
    Object.assign(questionnaire.choiceArray, {
      [questionnaire.numExtraChoice + 1]: "",
    });
    this.setState({ questionnaire: questionnaire });
  };

  handleOnChangeChoice = (e) => {
    const id = e.target.getAttribute("num");
    const questionnaire = this.state.questionnaire;
    questionnaire.choiceArray[id] = e.target.value;
    this.setState({ questionnaire: questionnaire });
  };

  handleOnFirstChange = (e) => {
    const questionnaire = this.state.questionnaire;
    questionnaire.choiceArray[1] = e.target.value;
    this.setState({ questionnaire: questionnaire });
  };

  handleOnClickCancel = (id) => {
    const file = {};
    let i = 0;
    Object.keys(this.state.media).map((newId) => {
      if (newId !== id) {
        file[i] = this.state.media[newId];
        i++;
      }
      return null;
    });
    this.setState({ media: file, fileNum: this.state.fileNum - 1 });
  };

  render() {
    return (
      <Form id="tweetPost" onSubmit={this.handleOnSubmit}>
        <Card id="tweetMessageContainer">
          <Card.Content header="Home" id="cardHeader" />
          <Card.Content id="tweetMessage">
            <Feed>
              <Feed.Event id="cardEvent">
                <Feed.Label image={this.state.userIcon} id="userIcon" as="a" />
                <Card.Content id="cardContent">
                  <TextareaAutosize
                    id="tweetTextArea"
                    placeholder="What's new?"
                    onChange={this.handleOnChange}
                    value={this.state.text}
                  />
                  {this.state.open && (
                    <Questionnaire
                      id="questionnaire"
                      handleOnCloseQuestionnaire={
                        this.handleOnCloseQuestionnaire
                      }
                      handleOnChangeChoice={this.handleOnChangeChoice}
                      handleOnFirstChange={this.handleOnFirstChange}
                      handleOnAddChoice={this.handleOnAddChoice}
                      questionnaire={this.state.questionnaire}
                    />
                  )}
                  {this.state.fileNum !== 0 && (
                    <Layout
                      files={this.state.media}
                      handleOnClickCancel={this.handleOnClickCancel}
                    />
                  )}
                  <FunctionBar
                    handleOnUploadMedia={this.handleOnUploadMedia}
                    handleOnOpenQuestionnaire={this.handleOnOpenQuestionnaire}
                    handleOnClickLocation={this.handleOnClickLocation}
                    handleOnClickSubmit={this.handleOnClickSubmit}
                    open={this.state.open}
                    id="functionBar"
                  />
                </Card.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
      </Form>
    );
  }
}

export default Sender;
