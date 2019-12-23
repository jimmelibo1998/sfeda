import React from "react";
import { Link } from "react-router-dom";
import { Select } from "react-materialize";

class NewDoctor extends React.Component {
  render() {
    return (
      <div>
        <h4 className="light-green-text text-darken-3 center">New Doctor</h4>
        <form>
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="lastname"
                    type="text"
                    className="validate"
                    required
                  />
                  <label htmlFor="lastname">Last Name</label>
                </div>
                <div className="input-field col s12">
                  <input
                    id="firstname"
                    type="text"
                    className="validate"
                    required
                  />
                  <label htmlFor="firstname">First Name</label>
                </div>
                <Select
                  s={12}
                  label="Class Code"
                  options={{
                    classes: "",
                    dropdownOptions: {
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      container: null,
                      coverTrigger: false,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250
                    }
                  }}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Select>
                <Select
                  s={12}
                  label="Area"
                  options={{
                    classes: "",
                    dropdownOptions: {
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      container: null,
                      coverTrigger: false,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250
                    }
                  }}
                >
                  <option value="NORTH LUZON">NORTH LUZON</option>
                  <option value="NORTH GMA">NORTH GMA</option>
                  <option value="SOUTH GMA">SOUTH GMA</option>
                  <option value="SOUTH LUZON 1">SOUTH LUZON 1</option>
                  <option value="SOUTH LUZON 2">SOUTH LUZON 2</option>
                </Select>
                <div className="input-field col s12">
                  <input id="sc" type="text" className="validate" required />
                  <label htmlFor="sc">Specialization Code</label>
                </div>
                <div className="input-field col s12">
                  <input
                    id="institution"
                    type="text"
                    className="validate"
                    required
                  />
                  <label htmlFor="institution">Institution</label>
                </div>
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>

              <br />
              <div className="row">
                <div className="col s12 m6">
                  <button
                    type="submit"
                    className="waves-effect waves-light btn btn-large green darken-3"
                    style={{ width: "100%" }}
                  >
                    Create Account
                  </button>
                </div>
                <div className="col s12 m6">
                  <Link
                    to="/medrep/doctors"
                    className="waves-effect waves-light btn btn-large red darken 3"
                    style={{ width: "100%" }}
                  >
                    cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewDoctor;
