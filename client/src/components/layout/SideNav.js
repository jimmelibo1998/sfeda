import React from "react";
import { Link } from "react-router-dom";
import { SideNav } from "react-materialize";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const SideNavs = ({ logout, role, user }) => {
  const displayUserName = () => {
    if (user) {
      return user.firstName + " " + user.lastName;
    }
  };

  const displayEmail = () => {
    if (user) return user.email;
  };

  const renderComponent = () => {
    if (role === "medrep") {
      return (
        <SideNav id="slide-out" className="sidenav">
          <li>
            <div className="user-view">
              <div className="background">
                <img src="./img/cover.jpg" alt="sidenav-cover" />
              </div>
              <Link to="/admin/profile">
                <img className="circle" src="./img/profile.jpg" alt="profile" />
              </Link>
              <Link to="/admin/profile">
                <span className="white-text name">{displayUserName()}</span>
              </Link>
              <Link to="/admin/profile">
                <span className="white-text email">{displayEmail()}</span>
              </Link>
            </div>
          </li>
          <li>
            <Link to="/medrep" className="light-green-text text-darken-3">
              <i className="small material-icons left">insert_chart</i>Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/medrep/doctors"
              className="light-green-text text-darken-3"
            >
              <i className="small material-icons left">local_hospital</i>Doctors
            </Link>
          </li>

          <li className="divider"></li>
          <li>
            <Link
              to="/medrep/perform/masterlist"
              className="light-green-text text-darken-3"
            >
              <i className="small material-icons left">format_list_bulleted</i>
              Master List
            </Link>
          </li>
          <li>
            <Link
              to="/medrep/perform/dcr"
              className="light-green-text text-darken-3"
            >
              <i className="small material-icons left">today</i>
              DCR
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to="/medrep/account">
              <i className="small material-icons left">settings</i>
              Account Settings
            </Link>
          </li>
          <li>
            <Link onClick={() => logout()} to="/">
              <i className="small material-icons left">exit_to_app</i>
              Logout
            </Link>
          </li>
        </SideNav>
      );
    }

    if (role === "admin" || role === "super-admin") {
      return (
        <SideNav id="slide-out" className="sidenav sidenav-fixed">
          <li>
            <div className="user-view">
              <div className="background">
                <img src="./img/cover.jpg" alt="sidenav-cover" />
              </div>
              <Link to="/admin/profile">
                <img className="circle" src="./img/profile.jpg" alt="profile" />
              </Link>
              <Link to="/admin/profile">
                <span className="white-text name">{displayUserName()}</span>
              </Link>
              <Link to="/admin/profile">
                <span className="white-text email">{displayEmail()}</span>
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
            <Link onClick={() => logout()} to="/">
              <i className="small material-icons left">exit_to_app</i>
              Logout
            </Link>
          </li>
        </SideNav>
      );
    }
  };
  return <div>{renderComponent()}</div>;
};

const mapStateToProps = state => ({
  role: state.auth.role,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(SideNavs);
