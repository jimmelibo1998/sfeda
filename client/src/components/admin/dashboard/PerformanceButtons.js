import React, { Component, Fragment } from "react";

class PerformanceButtons extends Component {
  render() {
    return (
      <Fragment>
        <div className="row">
          <h3 className="center light-green-text text-darken-3">Performance</h3>
          <div className="col s12 m4">
            <button
              className="waves-effect waves-light btn perf-btn light-green darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              Call Rate
            </button>
          </div>
          <div className="col s12 m4">
            <button
              className="waves-effect waves-light btn perf-btn green darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              Call Reach
            </button>
          </div>
          <div className="col s12 m4">
            <button
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              Call Frequency
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PerformanceButtons;
