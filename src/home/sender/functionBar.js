import React, { Component } from "react";
import ImageIcon from "@material-ui/icons/Image";
import GifIcon from "@material-ui/icons/Gif";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { IconButton } from "@material-ui/core";
import "./functionBar.css";
import { Button } from "@material-ui/core";

class FunctionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="functionContainer">
        <div id="functionGroup">
          {/* Image icon */}
          <div>
            <IconButton
              component="label"
              id="functionIcon"
              onChange={this.props.handleOnUploadMedia}
            >
              <ImageIcon fontSize="large" />
              <input type="file" multiple style={{ display: "none" }} />
            </IconButton>
          </div>
          {/* Gif icon */}
          <div>
            <IconButton
              component="label"
              id="functionIcon"
              onChange={this.props.handleOnUploadMedia}
            >
              <GifIcon fontSize="large" />
              <input type="file" multiple style={{ display: "none" }} />
            </IconButton>
          </div>
          {/* Questionnaire icon */}
          <div>
            <IconButton
              component="label"
              id="functionIcon"
              onClick={this.props.handleOnOpenQuestionnaire}
            >
              <FormatListBulletedIcon fontSize="large" />
            </IconButton>
          </div>
          {/* Location icon */}
          <div>
            <IconButton
              component="label"
              id="functionIcon"
              onClick={this.props.handleOnClickLocation}
            >
              <LocationOnIcon fontSize="large" />
              <input type="file" style={{ display: "none" }} />
            </IconButton>
          </div>
          <div id="abcde">
            <Button
              variant="contained"
              id="submitButton"
              type="submit"
              onClick={this.props.handleOnClickSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default FunctionBar;
