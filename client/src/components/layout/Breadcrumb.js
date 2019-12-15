import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Breadcrumb extends Component {
  displayBreadcrumb() {
    if (this.props.isAuthenticated) {
      return (
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
      );
    }
  }

  render() {
    return <Fragment>{this.displayBreadcrumb()}</Fragment>;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Breadcrumb);
