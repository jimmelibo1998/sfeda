import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./layout/NavBar";
import SideNav from "./layout/SideNav";
import LoginPage from "./layout/LoginPage";
import Breadcrumb from "./layout/Breadcrumb";

// FOR ADMIN
import AdminDashboard from "./admin/dashboard/AdminDashboard";
import Announcements from "./admin/announcements/Announcements";
import AddEditAnnouncement from "./admin/announcements/AddEditAnnouncement";
import ManageAdmin from "./admin/manageadmin/ManageAdmin";
import AddEditAdmin from "./admin/manageadmin/AddEditAdmin";
import MedReps from "./admin/medreps/MedReps";
import NewMedRep from "./admin/medreps/NewMedRep";
import Profile from "./admin/profile/Profile";
import ViewProfile from "./admin/medreps/ViewProfile";

// FOR MEDREP
import MAccount from "./medicalRep/maccount/MAccount";
import MDashboard from "./medicalRep/mdashboard/MDashboard";
import MDoctors from "./medicalRep/mdoctors/MDoctors";
import NewDoctor from "./medicalRep/mdoctors/NewDoctor";
import MMasterList from "./medicalRep/mperform/MMasterList";
import AddMasterList from "./medicalRep/mperform/AddMasterList";
import MDcrsList from "./medicalRep/mperform/MDcrsList";
import MDcrs from "./medicalRep/mperform/MDcrs";

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
              {/* Admins */}
              <Route exact path="/admin" component={AdminDashboard} />
              <Route
                exact
                path="/admin/announcements"
                component={Announcements}
              />
              <Route
                exact
                path="/admin/announcements/edit"
                component={AddEditAnnouncement}
              />
              <Route exact path="/admin/manageadmin" component={ManageAdmin} />
              <Route
                exact
                path="/admin/manageadmin/edit"
                component={AddEditAdmin}
              />
              <Route exact path="/admin/medrep" component={MedReps} />
              <Route exact path="/admin/medrep/new" component={NewMedRep} />
              <Route
                exact
                path="/admin/medrep/profile"
                component={ViewProfile}
              />
              <Route exact path="/admin/profile" component={Profile} />
              {/* Medreps */}
              <Route exact path="/medrep" component={MDashboard} />
              <Route exact path="/medrep/account" component={MAccount} />
              <Route exact path="/medrep/doctors" component={MDoctors} />
              <Route exact path="/medrep/doctors/new" component={NewDoctor} />
              <Route
                exact
                path="/medrep/perform/masterlist"
                component={MMasterList}
              />
              <Route
                exact
                path="/medrep/perform/masterlist/add"
                component={AddMasterList}
              />
              <Route exact path="/medrep/perform/dcrs" component={MDcrsList} />
              <Route exact path="/medrep/perform/dcrs/add" component={MDcrs} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
