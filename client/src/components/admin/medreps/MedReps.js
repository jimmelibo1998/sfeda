import React, { Component, Fragment } from "react";
import MedRepsTable from "./MedRepsTable";

class MedReps extends Component {
  render() {
    return (
      <Fragment>
        <div className="row container">
          <h4 className="light-green-text text-darken-3">
            Medical Representatives
          </h4>
          <br />
          <div className="col s12 m2">
            <a
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
              disabled
            >
              All
            </a>
          </div>
          <div className="col s12 m2">
            <a
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              North Luzon
            </a>
          </div>
          <div className="col s12 m2">
            <a
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              North GMA
            </a>
          </div>
          <div className="col s12 m2">
            <a
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              South GMA
            </a>
          </div>
          <div className="col s12 m2">
            <a
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              South Luzon I
            </a>
          </div>
          <div className="col s12 m2">
            <a
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              South Luzon II
            </a>
          </div>
          <MedRepsTable />
        </div>
      </Fragment>
    );
  }
}

export default MedReps;
