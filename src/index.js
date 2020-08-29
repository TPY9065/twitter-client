import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";

localStorage.setItem("image", "https://i.imgur.com/jZJ8W4A.jpg");
localStorage.setItem("username", "Lawrence");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
