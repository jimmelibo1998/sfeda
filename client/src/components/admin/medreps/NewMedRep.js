import React, { Component } from "react";

class NewMedRep extends Component {
  render() {
    return (
      <div>
        <h4 className="light-green-text text-darken-3 center">New Med Rep</h4>
        <form>
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="input-field">
                <select className="browser-default" placeholder="Select Area">
                  <option value="" disabled>
                    Select Area
                  </option>
                  <option value="north-luzon">Noth Luzon</option>
                  <option value="north-gma">North GMA</option>
                  <option value="south-gma">South GMA</option>
                  <option value="south-luzon-1">South Luzon I</option>
                  <option value="south-luzon-2">South Luzon II</option>
                </select>
              </div>
              <br />
              <div className="input-field">
                <input id="email" type="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
              <br />
              <div className="row">
                <div className="col s12 m6">
                  <button
                    className="waves-effect waves-light btn btn-large green darken-3"
                    style={{ width: "100%" }}
                  >
                    Create Account
                  </button>
                </div>
                <div className="col s12 m6">
                  <button
                    className="waves-effect waves-light btn btn-large red darken 3"
                    style={{ width: "100%" }}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewMedRep;
