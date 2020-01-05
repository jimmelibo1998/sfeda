import React, { useState } from "react";
import { Select } from "react-materialize";
import { connect } from "react-redux";
import moment from "moment";
import { clearActiveMedrep, fetchMedrepPerf } from "../../../actions/reports";

import MedRepPerfChart from "../medreps/MedRepPerfChart";
import MdCalls from "../medreps/MdCalls";

class ViewProfile extends React.Component {
  state = {
    page: "performance",
    year: moment().format("YYYY")
  };

  componentWillUnmount() {
    this.props.clearActiveMedrep();
  }

  onClick = e => {
    this.setState({ page: e.target.id });
  };

  renderComponent = () => {
    return this.state.page === "performance" ? (
      <MedRepPerfChart />
    ) : (
      <MdCalls />
    );
  };
  render() {
    return (
      <div>
        <h4 className="light-green-text text-darken-3 center">Profile</h4>
        <div className="row">
          <div className="col s12 m12 green darken-3">
            <div style={{ textAlign: "center" }}>
              <h3 className="white-text">Valleryn Patosa</h3>
              <p className="white-text">valeryn.patosa@prebiotech.com</p>
            </div>
            <div className="divider"></div>
          </div>
          <div className="col s12">
            <div className="row" style={{ marginTop: "10px" }}>
              <div className="col s12 m6">
                <button
                  onClick={e => this.onClick(e)}
                  id="performance"
                  className="waves-effect waves-light btn btn-large green darken 3"
                  style={{ width: "100%" }}
                  disabled={this.state.page === "performance" ? "disabled" : ""}
                >
                  Performance
                </button>
              </div>
              <div className="col s12 m6">
                <button
                  onClick={e => this.onClick(e)}
                  id="mdcalls"
                  className="waves-effect waves-light btn btn-large yellow darken-3"
                  style={{ width: "100%" }}
                  disabled={this.state.page === "performance" ? "" : "disabled"}
                >
                  MD Calls
                </button>
              </div>
            </div>
            {this.renderComponent()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeMedrep: state.reports.activeMedrep
});

export default connect(mapStateToProps, { clearActiveMedrep, fetchMedrepPerf })(
  ViewProfile
);
