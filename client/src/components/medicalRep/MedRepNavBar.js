import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const MedRepNavBar = () => {
  return (
    <Fragment>
      <nav className="white main-nav">
        <div className="container">
          <div className="nav-wrapper">
            <Link
              to="/admin"
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

            <Link to="/" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons green-text">menu</i>
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/medrep" className="light-green-text text-darken-3">
                  <i className="small material-icons left">insert_chart</i>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/medrep/doctors"
                  className="light-green-text text-darken-3"
                >
                  <i className="small material-icons left">local_hospital</i>
                  Doctors
                </Link>
              </li>

              <li>
                <Link
                  className="dropdown-trigger light-green-text text-darken-3"
                  to="medrep/perform"
                  data-target="dropdown2"
                >
                  <i className="small material-icons left">work</i>
                  Perform
                  <i className="material-icons right">arrow_drop_down</i>
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-trigger light-green-text text-darken-3"
                  to="/medrep/account"
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
          <Link to="/medrep/account" className="light-green-text text-darken-1">
            <i className="small material-icons left">settings</i>
            Account Settings
          </Link>
        </li>
        <li className="divider"></li>
        <li>
          <Link to="/" className="light-green-text text-darken-1">
            <i className="small material-icons left">exit_to_app</i>
            Logout
          </Link>
        </li>
      </ul>
      <ul id="dropdown2" className="dropdown-content">
        <li>
          <Link
            to="/medrep/perform/masterlist"
            className="light-green-text text-darken-1"
          >
            <i className="small material-icons left">format_list_bulleted</i>
            Master List
          </Link>
        </li>
        <li className="divider"></li>
        <li>
          <Link
            to="/medrep/perform/dcrs"
            className="light-green-text text-darken-1"
          >
            <i className="small material-icons left">today</i>
            DCR
          </Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default MedRepNavBar;
