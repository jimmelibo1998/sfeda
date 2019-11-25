import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

class NewMedRep extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll("select");
      M.FormSelect.init(elems, { coverTrigger: true });
    });
  }

  render() {
    return (
      <div className="container">
        <h4 className="light-green-text text-darken-3 center">New Med Rep</h4>
        <form>
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div class="input-field">
                <select>
                  <option value="north-luzon">Noth Luzon</option>
                  <option value="north-gma">North GMA</option>
                  <option value="south-gma">South GMA</option>
                  <option value="south-luzon-1">South Luzon I</option>
                  <option value="south-luzon-2">South Luzon II</option>
                </select>
                <label>Area</label>
              </div>
              <br />
              <div class="input-field">
                <input id="email" type="email" class="validate" />
                <label for="email">Email</label>
              </div>
              <br />
              <div className="row">
                <div className="col s12 m6">
                  <a
                    class="waves-effect waves-light btn btn-large green darken-3"
                    style={{ width: "100%" }}
                  >
                    Create Account
                  </a>
                </div>
                <div className="col s12 m6">
                  <a
                    class="waves-effect waves-light btn btn-large red darken 3"
                    style={{ width: "100%" }}
                  >
                    cancel
                  </a>
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
