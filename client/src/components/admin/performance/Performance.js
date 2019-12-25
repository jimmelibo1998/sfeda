import React from "react";
import Masterlist from "./Masterlist";
import DCR from "./DCR";

class Performance extends React.Component {
  state = {
    page: "masterlist"
  };
  render() {
    return (
      <div className="row">
        <h4 className="light-green-text text-darken-3 center">Performances</h4>
        <div className="col s12 m6">
          <button
            onClick={() => this.setState({ page: "masterlist" })}
            className="waves-effect waves-light btn btn-large perf-btn teal"
            style={{ width: "100%", marginBottom: "5px" }}
          >
            Masterlist
          </button>
        </div>
        <div className="col s12 m6">
          <button
            onClick={() => this.setState({ page: "dcr" })}
            className="waves-effect waves-light btn btn-large perf-btn light-green darken-1"
            style={{ width: "100%", marginBottom: "5px" }}
          >
            DCR
          </button>
        </div>
        <div className="col s12">
          {this.state.page === "dcr" ? <DCR /> : <Masterlist />}
        </div>
      </div>
    );
  }
}

export default Performance;
