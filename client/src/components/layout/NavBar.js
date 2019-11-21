import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

class Navbar extends Component {
  render() {
    return (
      <Fragment>
        <nav className="white main-nav">
          <a href="#!" className="brand-logo light-green-text text-darken-3">
            Prebiotech
          </a>
          <div className="container">
            <div className="nav-wrapper">
              <ul className="right hide-on-med-and-down">
                <li>
                  <a href="#!" className="light-green-text text-darken-3">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#!" className="light-green-text text-darken-3">
                    Med Rep
                  </a>
                </li>
                <li>
                  <a href="#!" className="light-green-text text-darken-3">
                    Announcements
                  </a>
                </li>
                <li>
                  <a href="#!" className="light-green-text text-darken-3">
                    Manage Admin
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-trigger"
                    href="#!"
                    data-target="dropdown1"
                    className="light-green-text text-darken-3"
                  >
                    Jimmel Ibo
                    <i className="material-icons right">arrow_drop_down</i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default Navbar;
