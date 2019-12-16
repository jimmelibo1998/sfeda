import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./NavBar.css";

const Navbar = ({ role }) => {
  return (
    <Fragment>
      <nav className="white main-nav">
        <div className="container">
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
  role: state.auth.role
});

export default connect(mapStateToProps, {})(Navbar);
