import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./layout/NavBar";
import LoginPage from "./layout/LoginPage";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <LoginPage />
        </Fragment>
      </Router>
    );
  }
}

export default App;
