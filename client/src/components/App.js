import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./layout/NavBar";
import SideNav from "./layout/SideNav";
import LoginPage from "./layout/LoginPage";
import Breadcrumb from "./layout/Breadcrumb";

import AdminDashboard from "./admin/dashboard/AdminDashboard";
import Announcements from "./admin/announcements/Announcements";
import ManageAdmin from "./admin/manageadmin/ManageAdmin";
import MedReps from "./admin/medreps/MedReps";
import NewMedRep from "./admin/medreps/NewMedRep";
import Profile from "./admin/profile/Profile";
import ViewProfile from "./admin/medreps/ViewProfile";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
          <SideNav />
          <div style={{ fontFamily: "Noto Serif" }}>
            <Breadcrumb />
            <Route exact path="/" component={LoginPage} />
            <Switch>
              <Route exact path="/admin" component={AdminDashboard} />
              <Route
                exact
                path="/admin/announcements"
                component={Announcements}
              />
              <Route exact path="/admin/manageadmin" component={ManageAdmin} />
              <Route exact path="/admin/medrep" component={MedReps} />
              <Route exact path="/admin/medrep/new" component={NewMedRep} />
              <Route
                exact
                path="/admin/medrep/profile"
                component={ViewProfile}
              />
              <Route exact path="/admin/profile" component={Profile} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
