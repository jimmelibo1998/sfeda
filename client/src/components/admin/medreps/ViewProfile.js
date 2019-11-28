import React, { Component } from "react";
import ProPic from "./profile.jpg";

import MedRepPerfChart from "../medreps/MedRepPerfChart";
// import MedRepMasterList from "../medreps/MedRepMasterList";
// import MdCalls from "../medreps/MdCalls";
// import DCR from "../medreps/DCR";

class ViewProfile extends Component {
  render() {
    return (
      <div className="container">
        <h4 className="light-green-text text-darken-3">Profile</h4>
        <div className="row">
          <h6 className="light-green-text text-darken-3">Information</h6>
          <div className="col s12 m4 green darken-3">
            <div style={{ textAlign: "center" }}>
              <br />
              <img
                src={ProPic}
                alt="Propic"
                className="circle"
                style={{ width: "200px" }}
              />
              <h5 className="white-text">Valleryn Patosa</h5>
              <p className="white-text">valeryn.patosa@prebiotech.com</p>
            </div>
            <div className="divider"></div>
            <h5 className="white-text center">Details</h5>
            <table className="white-text">
              <tbody>
                <tr>
                  <td>
                    <b>Area</b>
                  </td>
                  <td>North Luzon I</td>
                </tr>
                <tr>
                  <td>
                    <b>Phone Number</b>
                  </td>
                  <td>09983545261</td>
                </tr>
                <tr>
                  <td>
                    <b>Home Address</b>
                  </td>
                  <td>12 Poinsettia Tahanan Village Paranaque City</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col s12 m8">
            <div className="row">
              <div className="col s12 m3">
                <button
                  className="waves-effect waves-light btn btn-large green darken 3"
                  style={{ width: "100%" }}
                >
                  Performance
                </button>
              </div>
              <div className="col s12 m3">
                <button
                  className="waves-effect waves-light btn btn-large blue darken 3"
                  style={{ width: "100%" }}
                >
                  Master List
                </button>
              </div>
              <div className="col s12 m3">
                <button
                  className="waves-effect waves-light btn btn-large yellow darken-3"
                  style={{ width: "100%" }}
                  disabled
                >
                  MD Calls
                </button>
              </div>
              <div className="col s12 m3">
                <button
                  className="waves-effect waves-light btn btn-large teal darken 3"
                  style={{ width: "100%" }}
                >
                  DCR
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

export default ViewProfile;
