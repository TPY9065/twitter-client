import React, { Component } from "react";
import { Image } from "semantic-ui-react";
import "./media.css";
import image from "./img/IMG_3707.jpg";
import image1 from "./img/IMG_3706.jpg";

class Media extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      ele: [],
    };
  }

  handleOnClick = () => {
    const ele = this.state.ele;
    ele.push(this.state.num);
    this.setState({ num: this.state.num + 1, ele: ele });
  };

  render() {
    return (
      <div id="tweetMedia">
        <div id="mediaContainer">
          <Image src={image1} id="imageUploaded" />
        </div>
        <div id="mediaContainer">
          <Image src={image} id="imageUploaded" />
        </div>
        <div id="mediaContainer">
          <Image src={image} id="imageUploaded" />
        </div>
        <div id="mediaContainer">
          <Image src={image1} id="imageUploaded" />
        </div>
      </div>
    );
  }
}

export default Media;
