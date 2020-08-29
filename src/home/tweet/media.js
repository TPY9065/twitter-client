import React, { Component } from "react";
import { Image } from "semantic-ui-react";
import "./media.css";

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
        {Object.keys(this.props.media).map((id) => {
          return (
            <div id="mediaContainer" key={id}>
              <Image src={this.props.media[id]} id="imageUploaded" />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Media;
