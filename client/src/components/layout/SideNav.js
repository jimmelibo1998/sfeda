import React, { Component, Fragment } from "react";

class SideNav extends Component {
  render() {
    return (
      <Fragment>
        <ul id="slide-out" className="sidenav">
          <li>
            <div className="user-view">
              <div className="background">
                <img src="./img/cover.jpg" alt="sidenav-cover" />
              </div>
              <a href="!#">
                <img className="circle" src="./img/profile.jpg" alt="profile" />
              </a>
              <a href="!#">
                <span className="white-text name">John Doe</span>
              </a>
              <a href="!#">
                <span className="white-text email">jdandturk@gmail.com</span>
              </a>
            </div>
          </li>
          <li>
            <a href="#!" className="light-green-text text-darken-3">
              <i className="small material-icons left">insert_chart</i>Dashboard
            </a>
          </li>
          <li>
            <a href="#!" className="light-green-text text-darken-3">
              <i className="small material-icons left">people</i>Med Rep
            </a>
          </li>
          <li>
            <a href="#!" className="light-green-text text-darken-3">
              <i className="small material-icons left">announcement</i>
              Announcements
            </a>
          </li>
          <li>
            <a href="#!" className="light-green-text text-darken-3">
              <i className="small material-icons left">people_outline</i>
              Manage Admin
            </a>
          </li>
          <li className="divider"></li>
          <li>
            <a href="#!">
              <i className="small material-icons left">settings</i>
              Account Settings
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="small material-icons left">exit_to_app</i>
              Logout
            </a>
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default SideNav;
