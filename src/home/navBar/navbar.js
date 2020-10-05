import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import "./navbar.css";
import Avatar from "@material-ui/core/Avatar";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIcon: localStorage.getItem("image") && null,
      pathname: this.props.pathname,
    };
  }
  render() {
    return (
      <div id="sideContainer">
        <div id="tab">
          <Nav defaultActiveKey="/home" className="flex-column" id="navBar">
            <Nav.Link href="/home" id="tabContainer">
              <HomeOutlinedIcon fontSize="large" id="tabIcon" />
              <span id="tabName">Home</span>
            </Nav.Link>
            <Nav.Link
              eventKey="notification"
              href="/notification"
              id="tabContainer"
            >
              <NotificationsNoneOutlinedIcon fontSize="large" id="tabIcon" />
              <span id="tabName">Notifications</span>
            </Nav.Link>
            <Nav.Link eventKey="message" href="/message" id="tabContainer">
              <MailOutlineIcon fontSize="large" id="tabIcon" />
              <span id="tabName">Messages</span>
            </Nav.Link>
            <Nav.Link eventKey="bookmark" href="/bookmark" id="tabContainer">
              <BookmarkBorderOutlinedIcon fontSize="large" id="tabIcon" />
              <span id="tabName">Bookmarks</span>
            </Nav.Link>
            <Nav.Link eventKey="userInfo" href="/userInfo" id="tabContainer">
              {this.state.userIcon ? (
                <Avatar src={this.state.userIcon} id="tabIcon" />
              ) : (
                <AccountCircleOutlinedIcon fontSize="large" id="tabIcon" />
              )}
              <span id="tabName">Profile</span>
            </Nav.Link>
          </Nav>
        </div>
      </div>
    );
  }
}

export default NavBar;
