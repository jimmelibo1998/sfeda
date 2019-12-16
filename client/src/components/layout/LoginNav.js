import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const LoginNav = () => {
  return (
    <Fragment>
      <nav className="white main-nav">
        <div className="container">
          <div className="nav-wrapper">
            <Link
              to="/"
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
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default LoginNav;
