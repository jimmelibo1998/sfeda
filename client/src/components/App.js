import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./layout/NavBar";
import LoginPage from "./layout/LoginPage";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={LoginPage} />
          <Switch>
            <Route exact path="/admin" component={NavBar} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
