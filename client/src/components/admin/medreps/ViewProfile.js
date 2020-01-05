import React, { useState } from "react";
import { Select } from "react-materialize";
import { connect } from "react-redux";
import moment from "moment";
import { clearActiveMedrep, fetchMedrepPerf } from "../../../actions/reports";

import MedRepPerfChart from "../medreps/MedRepPerfChart";
import MdCalls from "../medreps/MdCalls";

class ViewProfile extends React.Component {
  state = {
    year: moment().format("YYYY")
  };

  componentWillUnmount() {
    this.props.clearActiveMedrep();
  }
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
                  className="waves-effect waves-light btn btn-large green darken 3"
                  style={{ width: "100%" }}
                >
                  Performance
                </button>
              </div>
              <div className="col s12 m6">
                <button
                  className="waves-effect waves-light btn btn-large yellow darken-3"
                  style={{ width: "100%" }}
                >
                  MD Calls
                </button>
              </div>
            </div>
            <MedRepPerfChart />
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
