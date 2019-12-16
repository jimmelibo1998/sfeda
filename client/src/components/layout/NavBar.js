import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./NavBar.css";

const Navbar = ({ role, isAuthenticated }) => {
  const renderSideNavTrigger = () => {
    if (isAuthenticated) {
      return (
        <a href="!#" data-target="slide-out" className="sidenav-trigger">
          <i className="material-icons green-text">menu</i>
        </a>
      );
    }
  };
  return (
    <Fragment>
      <nav className="light-green lighten-5 main-nav">
        <div className="container">
          {renderSideNavTrigger()}
          <div className="nav-wrapper">
            <Link
              to="/admin"
              className="brand-logo light-green-text text-darken-3 nav-text center"
            >
              <img
                src="./img/company-logo.png"
                alt="company logo"
                style={{
                  maxHeight: "56px"
                }}
              />
            </Link>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  role: state.auth.role,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Navbar);
