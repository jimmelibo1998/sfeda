import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./layout/NavBar";
import SideNav from "./layout/SideNav";
import LoginPage from "./layout/LoginPage";

import AdminDashboard from "./admin/dashboard/AdminDashboard";
import Breadcrumb from "./layout/Breadcrumb";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
          <SideNav />
          <Breadcrumb />
          <Route exact path="/" component={LoginPage} />
          <Switch>
            <Route exact path="/admin" component={AdminDashboard} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
