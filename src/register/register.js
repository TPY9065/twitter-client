import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      emailInvalidate: false,
      usernameInvalidate: false,
      errMessage: "",
      success: false,
    };
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleOnSubmit = async (e) => {
    const data = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };
    console.log(this.state);
    e.preventDefault();
    const response = await fetch("http://localhost:3000/home/register", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.status === 200) {
      console.log(result.message);
      this.setState({
        success: true,
      });
    } else {
      if (result.message.split(" ")[0] === "Email") {
        this.setState({
          emailInvalidate: true,
          usernameInvalidate: false,
          success: false,
          errMessage: result.message,
        });
      } else {
        this.setState({
          emailInvalidate: false,
          usernameInvalidate: true,
          success: false,
          errMessage: result.message,
        });
      }
      console.log(result.message);
    }
  };

  render() {
    return (
      <div>
        <Form
          className="container"
          onSubmit={(event) => this.handleOnSubmit(event)}
        >
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => this.handleOnChange(event)}
            />
            {this.state.emailInvalidate ? (
              <Form.Text className="text-muted">
                {this.state.errMessage}
              </Form.Text>
            ) : null}
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Username"
              onChange={(event) => this.handleOnChange(event)}
            />
            {this.state.usernameInvalidate ? (
              <Form.Text className="text-muted">
                {this.state.errMessage}
              </Form.Text>
            ) : null}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => this.handleOnChange(event)}
            />
            <Form.Text className="text-muted">
              Your password should have at least 3 characters
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox"></Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {this.state.success ? <Redirect push to="/home" /> : null}
      </div>
    );
  }
}

export default Register;
