import React from "react";
import { Autocomplete } from "react-materialize";

class AddMasterList extends React.Component {
  getData = () => {
    const data = { name: {}, id: {}, email: {} };
    const myArray = [
      { name: "Jimmel Ibo", email: "jimmelibo@yahoo.com", id: 1 },
      {
        name: "Kimberly Banares",
        email: "kimbanares@yahoo.com",
        id: 2
      },
      { name: "Ivory Cinco", email: "ivorycinco@yahoo.com", id: 3 },
      { name: "wtf wt", email: "wt@yahoo.com", id: 3 }
    ];
    myArray.map(array => {
      data.id[array.id] = null;
      data.name[array.name] = null;
      data.email[array.email] = null;
    });

    return data;
  };

  render() {
    return (
      <div>
        <h3 className="flow-text light-green-text text-darken-3 center">
          Add Master List
        </h3>
        <div className="row">
          <Autocomplete
            className="s8"
            options={{
              data: this.getData().name
            }}
            placeholder="Full Name"
          />

          <Autocomplete
            className="s4"
            options={{
              data: this.getData().email
            }}
            placeholder="Email"
          />
          <div className="input-field col s4">
            <input
              id="class_code"
              type="text"
              className="validate"
              placeholder="Class Code"
            />
          </div>
          <div className="input-field col s4">
            <input
              id="sp_code"
              type="text"
              className="validate"
              placeholder="Specialization Code"
            />
          </div>
          <div className="input-field col s4">
            <input
              id="institution_name"
              type="text"
              className="validate"
              placeholder="Institution Name"
            />
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
