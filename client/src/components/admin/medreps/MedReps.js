import React, { Component, Fragment } from "react";
import MedRepsTable from "./MedRepsTable";

class MedReps extends Component {
  render() {
    return (
      <Fragment>
        <div className="row">
          <h4 className="light-green-text text-darken-3">
            Medical Representatives
          </h4>
          <br />
          <div className="col s12 m2">
            <button
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
              disabled
            >
              All
            </button>
          </div>
          <div className="col s12 m2">
            <button
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              North Luzon
            </button>
          </div>
          <div className="col s12 m2">
            <button
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              North GMA
            </button>
          </div>
          <div className="col s12 m2">
            <button
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              South GMA
            </button>
          </div>
          <div className="col s12 m2">
            <button
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              South Luzon I
            </button>
          </div>
          <div className="col s12 m2">
            <button
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              South Luzon II
            </button>
          </div>
          <MedRepsTable />
        </div>
      </Fragment>
    );
  }
}

export default MedReps;
