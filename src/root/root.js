import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./root.css";

class Root extends Component {
  render() {
    return (
      <div className="buttonGroup">
        <Button href="/register" variant="primary" size="lg" className="login">
          註冊
        </Button>
        <br />
        <Button href="/login" variant="primary" size="lg" className="register">
          登入
        </Button>
      </div>
    );
  }
}

export default Root;
