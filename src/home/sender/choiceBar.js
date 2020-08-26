import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import { Form } from "react-bootstrap";
import "./choiceBar.css";

class ChoiceBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="questionSet">
        <Form.Group id="questionContainer">
          <Form.Control
            type="text"
            placeholder={`Choice ${this.props.choice}`}
            size="lg"
            id="question"
            num={this.props.choice}
            onChange={this.props.handleOnChangeChoice}
          />
        </Form.Group>
        <div id="buttonContainer">
          <IconButton
            component="label"
            id="addButton"
            onClick={this.props.handleOnAddChoice}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default ChoiceBar;
