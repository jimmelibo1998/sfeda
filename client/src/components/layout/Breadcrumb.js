import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Breadcrumb extends Component {
  render() {
    return (
      <Fragment>
        <nav
          className="z-depth-0 light-green lighten-5"
          style={{ marginTop: "3px" }}
        >
          <div className="nav-wrapper">
            <div className="col s12">
              <div className="container">
                <Link
                  to="/medrep"
                  className="breadcrumb light-green-text text-darken-2"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default Breadcrumb;
