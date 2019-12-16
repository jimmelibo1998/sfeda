import React, { Component, Fragment } from "react";

import PerformanceButtons from "./PerformanceButtons";
import RegionalReport from "./RegionalReport";
import RegionalChart from "./RegionalChart";
import IndividualChart from "./IndividualChart";

class AdminDashboard extends Component {
  render() {
    return (
      <Fragment>
        <PerformanceButtons />
        <div className="divider"></div>
        <RegionalReport />
        <RegionalChart />
        <div className="divider"></div>
        <IndividualChart />
      </Fragment>
    );
  }
}

export default AdminDashboard;
