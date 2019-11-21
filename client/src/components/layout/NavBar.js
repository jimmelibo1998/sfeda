import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

class Navbar extends Component {
  render() {
    return (
      <Fragment>
        <nav className="white main-nav">
          <Link to="#!" className="brand-logo light-green-text text-darken-3">
            Prebiotech
          </Link>
          <div className="container">
            <div className="nav-wrapper">
              <ul className="right hide-on-med-and-down">
                <li>
                  <Link to="#!" className="light-green-text text-darken-3">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="light-green-text text-darken-3">
                    Med Rep
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="light-green-text text-darken-3">
                    Announcements
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="light-green-text text-darken-3">
                    Manage Admin
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-trigger"
                    to="#!"
                    data-target="dropdown1"
                    className="light-green-text text-darken-3"
                  >
                    Jimmel Ibo
                    <i className="material-icons right">arrow_drop_down</i>
                  </Link>
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
