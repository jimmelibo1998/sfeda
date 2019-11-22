import React, { Component, Fragment } from "react";

class Breadcrumb extends Component {
  render() {
    return (
      <Fragment>
        <nav
          className="z-depth-0 light-green lighten-5 container"
          style={{ marginTop: "3px" }}
        >
          <div className="nav-wrapper">
            <div className="col s12">
              <div className="container">
                <a
                  href="#!"
                  className="breadcrumb light-green-text text-darken-2"
                >
                  Dashboard
                </a>
              </div>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default Breadcrumb;
