import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import Login from "./components/login/Login";

function App() {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Switch></Switch>
    </Router>
  );
}

export default App;
