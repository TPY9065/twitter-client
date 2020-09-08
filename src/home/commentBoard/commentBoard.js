import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import { Card, Feed } from "semantic-ui-react";
import CloseIcon from "@material-ui/icons/Close";
import TextareaAutosize from "react-autosize-textarea";
import axios from "axios";
import "./commentBoard.css";
import FunctionBar from "../sender/functionBar";
import Questionnaire from "../sender/questionnaire";
import Layout from "../tweet/layout";

class CommentBoard extends Component {
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

  handleOnClickSubmit = async () => {
    const formData = {
      text: this.state.text,
      username: this.state.username,
      replyTweetId: this.props.replyTweetId,
    };
    Object.keys(this.state.media).map((id) => {
      return formData.append("image", this.state.media[id]);
    });
    const response = await axios({
      url: "http://localhost:3000/comment/tweet",
      data: formData,
      method: "put",
    });
    if (response.status === 200) {
      this.props.handleOnCloseModal();
      this.handleOnCloseModal();
      this.handleOnCloseQuestionnaire();
      this.props.handleOnUpdateComment();
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

  handleOnCloseModal = () => {
    this.setState({
      text: "",
      media: {},
      fileNum: 0,
      questionnaire: {
        numExtraChoice: 1,
        choiceArray: { 1: "", 2: "" },
      },
      returnTweet: {},
    });
    this.handleOnCloseQuestionnaire();
  };

  render() {
    return (
      <Modal
        id="commentModal"
        show={this.props.isOpen}
        onHide={() => {
          this.props.handleOnCloseModal();
          this.handleOnCloseModal();
        }}
        animation={false}
      >
        <Card id="commentCardContainer">
          <Card.Header>
            <IconButton
              component="label"
              onClick={() => {
                this.props.handleOnCloseModal();
                this.handleOnCloseModal();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Card.Header>
          <Card.Content>
            <Feed id="replyContentContainer">
              <Feed.Event id="replyCardEvent">
                <Feed.Label image={this.props.image} id="targetIcon" as="a" />
                <Card.Content id="replyTweetContent">
                  <Feed.Summary id="replyTweetSummary">
                    {this.props.tweetInfo.username}
                  </Feed.Summary>
                  <Feed.Extra text id="tweetText">
                    {this.props.tweetInfo.text} tweetUrl
                    <br />
                    <br />
                    回覆給<a href="/">@{this.props.tweetInfo.username}</a>
                  </Feed.Extra>
                </Card.Content>
              </Feed.Event>
            </Feed>
            <Feed id="replyTweet">
              <Feed.Event id="replyTweetEvent">
                <Feed.Label image={this.props.image} id="targetIcon" as="a" />
                <div id="replyTweetContainer">
                  <Card.Content id="replyTweetMessage">
                    <TextareaAutosize
                      id="tweetTextArea"
                      placeholder="推你的回覆"
                      onChange={this.handleOnChange}
                      value={this.state.text}
                      rows={5}
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
                  </Card.Content>
                  <FunctionBar
                    type="回覆"
                    handleOnUploadMedia={this.handleOnUploadMedia}
                    handleOnOpenQuestionnaire={this.handleOnOpenQuestionnaire}
                    handleOnClickLocation={this.handleOnClickLocation}
                    handleOnClickSubmit={() => {
                      this.handleOnClickSubmit();
                    }}
                    open={this.state.open}
                  />
                </div>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
      </Modal>
    );
  }
}

export default CommentBoard;
