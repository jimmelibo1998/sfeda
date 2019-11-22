import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

import "./NavBar.css";

class Navbar extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".dropdown-trigger");
      M.Dropdown.init(elems, {
        constrainWidth: false,
        coverTrigger: false,
        hover: true
      });
    });
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems, {});
    });
  }

  render() {
    return (
      <Fragment>
        <nav className="white main-nav">
          <div className="container">
            <div className="nav-wrapper">
              <Link
                to="#!"
                className="brand-logo light-green-text text-darken-3 nav-text"
              >
                <img
                  src="./img/company-logo.png"
                  alt="company logo"
                  style={{
                    maxHeight: "56px"
                  }}
                />
              </Link>

              <a href="#" data-target="slide-out" className="sidenav-trigger">
                <i className="material-icons green-text">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li>
                  <Link to="#!" className="light-green-text text-darken-3">
                    <i className="small material-icons left">insert_chart</i>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="light-green-text text-darken-3">
                    <i className="small material-icons left">people</i>
                    Med Rep
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="light-green-text text-darken-3">
                    <i className="small material-icons left">announcement</i>
                    Announcements
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="light-green-text text-darken-3">
                    <i className="small material-icons left">people_outline</i>
                    Manage Admin
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-trigger light-green-text text-darken-3"
                    to="#!"
                    data-target="dropdown1"
                  >
                    <i className="small material-icons left">account_circle</i>
                    Jimmel Ibo
                    <i className="material-icons right">arrow_drop_down</i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <ul id="dropdown1" className="dropdown-content">
          <li>
            <a href="#!" className="light-green-text text-darken-1">
              <i className="small material-icons left">settings</i>
              Account Settings
            </a>
          </li>
          <li className="divider"></li>
          <li>
            <a href="#!" className="light-green-text text-darken-1">
              <i className="small material-icons left">exit_to_app</i>
              Logout
            </a>
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default Navbar;
