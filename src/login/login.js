import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      success: false,
      errMessage: "",
    };
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/home/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    });
    if (response.status === 200) {
      const session = await response.json();
      console.log(session.session);
      this.setState({ success: true });
    } else {
      this.setState({
        success: false,
        errMessage: (await response.json()).message,
      });
    }
  };

  render() {
    return (
      <div>
        <Form
          className="container"
          onSubmit={(event) => {
            this.handleOnSubmit(event);
          }}
        >
          <Form.Group
            controlId="username"
            onChange={(event) => this.handleOnChange(event)}
          >
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" />
          </Form.Group>

          <Form.Group
            controlId="password"
            onChange={(event) => this.handleOnChange(event)}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          {this.state.errMessage ? (
            <Form.Text className="text-muted">
              {this.state.errMessage}
            </Form.Text>
          ) : null}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {this.state.success ? <Redirect push to="/home" /> : null}
      </div>
    );
  }
}

export default Login;
