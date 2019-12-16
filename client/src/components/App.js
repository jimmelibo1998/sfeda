import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import { loadUser } from "../actions/auth";

import NavBar from "./layout/NavBar";
import SideNav from "./layout/SideNav";
import LoginPage from "./layout/LoginPage";
import Breadcrumb1 from "./layout/Breadcrumb";

import PrivateRoute from "./routing/PrivateRoute";

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
import setAuthToken from "../utils/setAuthToken";
//Redux
import { Provider } from "react-redux";
import store from "../store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="row">
            <div>
              <SideNav />
            </div>
            <div style={{ paddingLeft: "300px" }}>
              <NavBar />
              <div style={{ fontFamily: "Noto Serif" }}>
                <Route exact path="/" component={LoginPage} />
                <Switch>
                  {/* Admins */}
                  <PrivateRoute
                    exact
                    path="/admin"
                    component={AdminDashboard}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/announcements"
                    component={Announcements}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/announcements/edit"
                    component={AddEditAnnouncement}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/manageadmin"
                    component={ManageAdmin}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/manageadmin/edit"
                    component={AddEditAdmin}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/medrep"
                    component={MedReps}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/medrep/new"
                    component={NewMedRep}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/medrep/profile"
                    component={ViewProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/profile"
                    component={Profile}
                  />
                  {/* Medreps */}
                  <PrivateRoute exact path="/medrep" component={MDashboard} />
                  <PrivateRoute
                    exact
                    path="/medrep/account"
                    component={MAccount}
                  />
                  <PrivateRoute
                    exact
                    path="/medrep/doctors"
                    component={MDoctors}
                  />
                  <PrivateRoute
                    exact
                    path="/medrep/doctors/new"
                    component={NewDoctor}
                  />
                  <PrivateRoute
                    exact
                    path="/medrep/perform/masterlist"
                    component={MMasterList}
                  />
                  <PrivateRoute
                    exact
                    path="/medrep/perform/masterlist/add"
                    component={AddMasterList}
                  />
                  <PrivateRoute
                    exact
                    path="/medrep/perform/dcrs"
                    component={MDcrsList}
                  />
                  <PrivateRoute
                    exact
                    path="/medrep/perform/dcrs/add"
                    component={MDcrs}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
