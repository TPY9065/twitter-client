import React, { Component } from "react";
import { Form } from "react-bootstrap";
import CancelIcon from "@material-ui/icons/Cancel";
import "./questionnaire.css";
import { IconButton } from "@material-ui/core";
import ChoiceBar from "./choiceBar";

class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="questionnaireContainer">
        <div id="questionSet">
          <Form.Group id="questionContainer">
            <Form.Control
              type="text"
              placeholder="Choice 1"
              size="lg"
              id="question"
              onChange={this.props.handleOnFirstChange}
            />
          </Form.Group>
          <div id="buttonContainer">
            <IconButton
              component="label"
              id="closeButton"
              onClick={this.props.handleOnCloseQuestionnaire}
            >
              <CancelIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
        {Object.keys(this.props.questionnaire.choiceArray).map((id) => {
          if (id !== "1") {
            return (
              <ChoiceBar
                handleOnAddChoice={this.props.handleOnAddChoice}
                key={id}
                choice={id}
                handleOnChangeChoice={this.props.handleOnChangeChoice}
              />
            );
          }
          return null;
        })}
      </div>
    );
  }
}

export default Questionnaire;
