import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Root from "../root/root";
import Register from "../register/register";
import Login from "../login/login";
import Home from "../home/home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Root} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/user" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
