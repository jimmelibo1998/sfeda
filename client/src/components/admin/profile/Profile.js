import React, { Component, Fragment } from "react";

class Profile extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <div className="card-panel">
            <div className="row">
              <div className="col s12 m6">
                <h6 className="blue-text darken-3">Profile</h6>
                <div className="input-field">
                  <input id="last_name" type="text" className="validate" />
                  <label htmlFor="last_name">Last Name</label>
                </div>
                <br />
                <div className="input-field">
                  <input id="first_name" type="text" className="validate" />
                  <label htmlFor="first_name">First Name</label>
                </div>
                <br />
                <div className="input-field">
                  <input id="role" type="text" className="validate" />
                  <label htmlFor="role">Role</label>
                </div>
                <br />
                <button className="waves-effect waves-light btn">
                  <i className="material-icons left">edit</i>Edit
                </button>{" "}
                <button className="green waves-effect waves-light btn">
                  <i className="material-icons left">check</i>Save
                </button>
                {"  "}
                <button className="red waves-effect waves-light btn">
                  <i className="material-icons left">cancel</i>Cancel
                </button>
              </div>
              <div className="col s12 m6">
                <h6 className="blue-text darken-3">Email</h6>
                <div className="input-field">
                  <input id="current_email" type="text" className="validate" />
                  <label htmlFor="current_email">Current Email</label>
                </div>
                <br />
                <div className="input-field">
                  <input id="new_email" type="text" className="validate" />
                  <label htmlFor="new_email">New Email</label>
                </div>
                <br />
                <button className="waves-effect waves-light btn">
                  <i className="material-icons left">edit</i>Edit
                </button>{" "}
                <button className="green waves-effect waves-light btn">
                  <i className="material-icons left">check</i>Save
                </button>
                {"  "}
                <button className="red waves-effect waves-light btn">
                  <i className="material-icons left">cancel</i>Cancel
                </button>
              </div>
            </div>
            <div className="divider"></div>
            <div className="row">
              <div className="col s12 m6">
                <h6 className="blue-text darken-3">Password</h6>
                <div className="input-field">
                  <input
                    id="current_pass"
                    type="password"
                    className="validate"
                  />
                  <label htmlFor="current_pass">Current Password</label>
                </div>
                <br />
                <div className="row">
                  <div className="col s12 m6">
                    <div className="input-field">
                      <input
                        id="new_pass"
                        type="password"
                        className="validate"
                      />
                      <label htmlFor="new_pass">New Password</label>
                    </div>
                  </div>
                  <div className="col s12 m6">
                    <div className="input-field">
                      <input
                        id="confirm_pass"
                        type="password"
                        className="validate"
                      />
                      <label htmlFor="confirm_pass">Confirm Password</label>
                    </div>
                  </div>
                </div>
                <button className="waves-effect waves-light btn">
                  <i className="material-icons left">edit</i>Edit
                </button>{" "}
                <button className="green waves-effect waves-light btn">
                  <i className="material-icons left">check</i>Save
                </button>
                {"  "}
                <button className="red waves-effect waves-light btn">
                  <i className="material-icons left">cancel</i>Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
