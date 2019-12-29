import React from "react";
import { Select } from "react-materialize";

class MDcrs extends React.Component {
  render() {
    return (
      <div>
        <h3 className="flow-text light-green-text text-darken-3 center">
          Add Daily Coverage Report (Dec 29, 2019)
        </h3>
        <div className="row">
          <div className="col s12 m3">
            <div className="input-field col s12">
              <h5 className="green-text center">Not in Masterlist</h5>
            </div>
            <form>
              <div className="input-field col s12">
                <input
                  id="firstname"
                  type="text"
                  className="validate"
                  placeholder="First Name"
                />
              </div>
            </form>
            <form>
              <div className="input-field col s12">
                <input
                  id="lastname"
                  type="text"
                  className="validate"
                  placeholder="Last Name"
                />
              </div>
            </form>

            <form>
              <div className="input-field col s12">
                <input
                  id="email"
                  type="text"
                  className="validate"
                  placeholder="Email"
                />
              </div>
            </form>
            <form>
              <div className="input-field col s12">
                <button
                  style={{ width: "100%" }}
                  className="green darken-3 btn btn-large"
                >
                  <i className="material-icons left">add</i>Add Doctor
                </button>
              </div>
            </form>
          </div>
          <div className="col s12 m9">
            <ul
              className="collection with-header"
              style={{
                maxHeight: "504px",
                minHeight: "504px",
                overflowY: "scroll"
              }}
            >
              <li className="collection-header">
                <div className="row">
                  <div className="col s12 m6">
                    <input
                      id="namesearch"
                      type="text"
                      className="validate"
                      placeholder="Name"
                    />
                  </div>
                  <div className="col s12 m6">
                    <input
                      id="emailsearch"
                      type="text"
                      className="validate"
                      placeholder="Email"
                    />
                  </div>
                </div>
              </li>
              <li className="collection-header">
                <p className="grey-text text-darken-3 center">No Doctors </p>
              </li>
            </ul>
          </div>

          <div className="input-field col s12">
            <div className="row">
              <div className="col s12 m3">
                <button
                  style={{ width: "100%" }}
                  className="teal darken-4 btn btn-large"
                >
                  <i className="material-icons left">arrow_left</i>Back
                </button>
              </div>
              <div className="col s12 m3">
                <button
                  style={{ width: "100%" }}
                  className="yellow darken-4 btn btn-large"
                >
                  <i className="material-icons left">repeat</i>Clear
                </button>
              </div>
              <div className="col s12 m3">
                <button
                  style={{ width: "100%" }}
                  className="green darken-3 btn btn-large"
                >
                  <i className="material-icons left">send</i>Submit DCR
                </button>
              </div>
              <div className="col s12 m3">
                <button
                  style={{ width: "100%" }}
                  className="red darken-3 btn btn-large"
                >
                  <i className="material-icons left">cancel</i>No Coverage
                </button>
              </div>
            </div>
          </div>
          <div className="col s12">
            <table>
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Class Code</th>
                  <th>Specialization Code</th>
                  <th>Institution Name</th>
                  <th>Visited</th>
                  <th>Add Comment</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Chiong</td>
                  <td>Abigail Rivera</td>
                  <td>B</td>
                  <td>PEDIA2</td>
                  <td>MMC</td>
                  <td>
                    <label>
                      <input type="checkbox" />
                      <span>Yes</span>
                    </label>
                  </td>
                  <td>
                    <button className="green darken-3 waves-effect waves-light btn">
                      <i className="material-icons">add</i>
                    </button>
                  </td>
                  <td>
                    <button className="red darken-4 waves-effect waves-light btn btn-small">
                      <i className="material-icons">cancel</i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Chiong</td>
                  <td>Abigail Rivera</td>
                  <td>B</td>
                  <td>PEDIA2</td>
                  <td>MMC</td>
                  <td>
                    <label>
                      <input type="checkbox" />
                      <span>Yes</span>
                    </label>
                  </td>
                  <td>
                    <button className="green darken-3 waves-effect waves-light btn">
                      <i className="material-icons">add</i>
                    </button>
                  </td>
                  <td>
                    <button className="red darken-4 waves-effect waves-light btn btn-small">
                      <i className="material-icons">cancel</i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Chiong</td>
                  <td>Abigail Rivera</td>
                  <td>B</td>
                  <td>PEDIA2</td>
                  <td>MMC</td>
                  <td>
                    <label>
                      <input type="checkbox" />
                      <span>Yes</span>
                    </label>
                  </td>
                  <td>
                    <button className="green darken-3 waves-effect waves-light btn">
                      <i className="material-icons">add</i>
                    </button>
                  </td>
                  <td>
                    <button className="red darken-4 waves-effect waves-light btn btn-small">
                      <i className="material-icons">cancel</i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MDcrs;
