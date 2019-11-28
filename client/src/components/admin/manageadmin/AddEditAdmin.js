import React, { Component, Fragment } from "react";

import M from "materialize-css/dist/js/materialize.min.js";

class AddEditAdmin extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll("select");
      M.FormSelect.init(elems, { coverTrigger: true });
    });
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <h4 className="light-green-text text-darken-3 center">
              New Administrator
            </h4>
            <div className="col s12 m6 offset-m3">
              <form>
                <div className="input-field">
                  <input id="last_name" type="text" className="validate" />
                  <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="input-field">
                  <input id="first_name" type="text" className="validate" />
                  <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field">
                  <select>
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                  </select>
                  <label>Select Role</label>
                </div>
                <div className="input-field">
                  <input id="position" type="text" className="validate" />
                  <label htmlFor="position">Position</label>
                </div>
                <div className="input-field">
                  <input id="email" type="email" className="validate" />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input id="contact" type="text" className="validate" />
                  <label htmlFor="contact">Contact Number</label>
                </div>
                <div className="row">
                  <div className="col s12 m6">
                    <a
                      className="waves-effect waves-light green btn btn-large"
                      style={{ width: "100%" }}
                    >
                      Create New Admin
                    </a>
                  </div>
                  <div className="col s12 m6">
                    <a
                      className="waves-effect waves-light green yellow darken-3 btn-large"
                      style={{ width: "100%" }}
                    >
                      Clear
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AddEditAdmin;
