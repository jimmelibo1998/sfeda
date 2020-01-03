import React, { Component, Fragment } from "react";
import RegionalReport from "./RegionalReport";
import RegionalChart from "./RegionalChart";

class AdminDashboard extends Component {
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col s12 m4">
            <div className="card-panel white">
              <h5 className="green-text center"> Current Doctors </h5>
              <h2 className="green-text center">10</h2>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel white">
              <h5 className="green-text center"> Current Masterlists </h5>
              <h2 className="green-text center">10</h2>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel white">
              <h5 className="green-text center"> Current DCRS </h5>
              <h2 className="green-text center">10</h2>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <RegionalReport />
        <RegionalChart />
      </Fragment>
    );
  }
}

export default AdminDashboard;
