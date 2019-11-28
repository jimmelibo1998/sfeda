import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const AdminMainNav = () => {
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
                <Link to="/admin" className="light-green-text text-darken-3">
                  <i className="small material-icons left">insert_chart</i>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/medrep"
                  className="light-green-text text-darken-3"
                >
                  <i className="small material-icons left">people</i>
                  Med Rep
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/announcements"
                  className="light-green-text text-darken-3"
                >
                  <i className="small material-icons left">announcement</i>
                  Announcements
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/manageadmin"
                  className="light-green-text text-darken-3"
                >
                  <i className="small material-icons left">people_outline</i>
                  Manage Admin
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-trigger light-green-text text-darken-3"
                  to="#!"
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
          <Link to="/admin/profile" className="light-green-text text-darken-1">
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
    </Fragment>
  );
};

export default AdminMainNav;
