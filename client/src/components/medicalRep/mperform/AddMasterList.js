import React from "react";

class AddMasterList extends React.Component {
  render() {
    return (
      <div>
        <h3 className="flow-text light-green-text text-darken-3">
          Add Master List
        </h3>
        <div className="row">
          <div className="input-field col s4">
            <input
              placeholder="Placeholder"
              id="last_name"
              type="text"
              className="validate"
            />
            <label htmlFor="first_name">Last Name</label>
          </div>
          <div className="input-field col s4">
            <input
              placeholder="Placeholder"
              id="first_name"
              type="text"
              className="validate"
            />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="input-field col s4">
            <input
              placeholder="Placeholder"
              id="class_code"
              type="text"
              className="validate"
            />
            <label htmlFor="first_name">Class Code</label>
          </div>
          <div className="input-field col s4">
            <input
              placeholder="Placeholder"
              id="sp_code"
              type="text"
              className="validate"
            />
            <label htmlFor="first_name">Specialization Code</label>
          </div>
          <div className="input-field col s4">
            <input
              placeholder="Placeholder"
              id="institution_name"
              type="text"
              className="validate"
            />
            <label htmlFor="first_name">Institution Name</label>
          </div>
          <div className="input-field col s12">
            <button className="green darken-3 waves-effect waves-light btn btn-large">
              <i className="material-icons left">add</i>Add Doctor
            </button>
            <button className="yellow darken-4 waves-effect waves-light btn btn-large">
              <i className="material-icons left">repeat</i>Clear
            </button>
            <button className="green darken-3 waves-effect waves-light btn btn-large">
              <i className="material-icons left">send</i>submit master list
            </button>
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

export default AddMasterList;
