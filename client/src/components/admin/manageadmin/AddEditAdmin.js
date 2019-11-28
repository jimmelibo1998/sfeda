import React, { Component, Fragment } from "react";

class AddEditAdmin extends Component {
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
                  <select className="browser-default">
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                  </select>
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
                    <button
                      className="waves-effect waves-light green btn btn-large"
                      style={{ width: "100%" }}
                    >
                      Create New Admin
                    </button>
                  </div>
                  <div className="col s12 m6">
                    <button
                      className="waves-effect waves-light green yellow darken-3 btn-large"
                      style={{ width: "100%" }}
                    >
                      Clear
                    </button>
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
