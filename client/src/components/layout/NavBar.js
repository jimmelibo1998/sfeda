import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

class Navbar extends Component {
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
                Prebiotech
              </Link>
              <ul className="right hide-on-med-and-down">
                <li>
                  <Link to="#!" className="light-green-text text-darken-3">
                    <i class="small material-icons left">insert_chart</i>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="light-green-text text-darken-3">
                    <i class="small material-icons left">people</i>
                    Med Rep
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="light-green-text text-darken-3">
                    <i class="small material-icons left">announcement</i>
                    Announcements
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="light-green-text text-darken-3">
                    <i class="small material-icons left">people_outline</i>
                    Manage Admin
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-trigger light-green-text text-darken-3"
                    to="#!"
                    data-target="dropdown1"
                  >
                    <i class="small material-icons left">account_circle</i>
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
