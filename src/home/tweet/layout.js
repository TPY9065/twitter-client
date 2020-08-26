import React, { Component } from "react";
import { Image } from "semantic-ui-react";
import "./layout.css";
import { IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="tweetMedia">
        {Object.keys(this.props.files).map((id) => {
          return (
            <div id="mediaContainer" key={id}>
              <Image
                src={URL.createObjectURL(this.props.files[id])}
                id="imageUploaded"
              />
              <IconButton
                component="label"
                id="iconContainer"
                onClick={() => this.props.handleOnClickCancel(id)}
              >
                <HighlightOffIcon id="buttonIcon" fontSize="large" />
              </IconButton>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Layout;
