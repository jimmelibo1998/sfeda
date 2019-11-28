import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const AdminSideNav = () => {
  return (
    <Fragment>
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background">
              <img src="./img/cover.jpg" alt="sidenav-cover" />
            </div>
            <Link to="/admin/profile">
              <img className="circle" src="./img/profile.jpg" alt="profile" />
            </Link>
            <Link to="/admin/profile">
              <span className="white-text name">John Doe</span>
            </Link>
            <Link to="/admin/profile">
              <span className="white-text email">jdandturk@gmail.com</span>
            </Link>
          </div>
        </li>
        <li>
          <Link to="/admin" className="light-green-text text-darken-3">
            <i className="small material-icons left">insert_chart</i>Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/medrep" className="light-green-text text-darken-3">
            <i className="small material-icons left">people</i>Med Rep
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
        <li className="divider"></li>
        <li>
          <Link to="/admin/profile">
            <i className="small material-icons left">settings</i>
            Account Settings
          </Link>
        </li>
        <li>
          <Link to="/">
            <i className="small material-icons left">exit_to_app</i>
            Logout
          </Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default AdminSideNav;
