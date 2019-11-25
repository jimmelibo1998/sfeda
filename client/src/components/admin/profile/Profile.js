import React, { Component, Fragment } from "react";
import ProPic from "./profile.jpg";

class Profile extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <div class="card-panel  green" style={{ textAlign: "center" }}>
            <img
              src={ProPic}
              alt="Image"
              class="circle"
              style={{ width: "200px" }}
            />
            <p>
              <a class="waves-effect waves-light btn green darken-4">
                Change Picture
              </a>
            </p>

            <h5 className="white-text">Jimmel Ibo</h5>
            <h6 className="white-text">jimmel.ibo1998@yahoo.com</h6>
          </div>

          <div className="card-panel">
            <div className="row">
              <h6 className="blue-text darken-3">Profile</h6>
              <div className="col s12 m6">
                <div class="input-field">
                  <input
                    placeholder="Placeholder"
                    id="last_name"
                    type="text"
                    class="validate"
                  />
                  <label for="last_name">Last Name</label>
                </div>
                <br />
                <div class="input-field">
                  <input
                    placeholder="Placeholder"
                    id="first_name"
                    type="text"
                    class="validate"
                  />
                  <label for="first_name">First Name</label>
                </div>
                <br />
                <div class="input-field">
                  <input
                    placeholder="Placeholder"
                    id="first_name"
                    type="text"
                    class="validate"
                  />
                  <label for="first_name">Phone Number</label>
                </div>
                <br />
                <a class="waves-effect waves-light btn">
                  <i class="material-icons left">edit</i>Edit
                </a>{" "}
                <a class="green waves-effect waves-light btn">
                  <i class="material-icons left">check</i>Save
                </a>
                {"  "}
                <a class="red waves-effect waves-light btn">
                  <i class="material-icons left">cancel</i>Cancel
                </a>
              </div>
              <div className="col s12 m6">
                <div class="input-field">
                  <input
                    placeholder="Placeholder"
                    id="role"
                    type="text"
                    class="validate"
                  />
                  <label for="role">Role</label>
                </div>
                <br />
                <div class="input-field">
                  <input
                    placeholder="Placeholder"
                    id="position"
                    type="text"
                    class="validate"
                  />
                  <label for="position">Position</label>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="row">
              <h6 className="blue-text darken-3">Account</h6>
              <div className="col s12 m6">
                <div class="input-field">
                  <input
                    placeholder="Placeholder"
                    id="current_email"
                    type="text"
                    class="validate"
                  />
                  <label for="current_email">Current Email</label>
                </div>
                <br />
                <div class="input-field">
                  <input
                    placeholder="Placeholder"
                    id="new_email"
                    type="text"
                    class="validate"
                  />
                  <label for="new_email">New Email</label>
                </div>
                <br />
                <a class="waves-effect waves-light btn">
                  <i class="material-icons left">edit</i>Edit
                </a>{" "}
                <a class="green waves-effect waves-light btn">
                  <i class="material-icons left">check</i>Save
                </a>
                {"  "}
                <a class="red waves-effect waves-light btn">
                  <i class="material-icons left">cancel</i>Cancel
                </a>
              </div>
              <div className="col s12 m6">
                <div class="input-field">
                  <input
                    placeholder="Placeholder"
                    id="current_pass"
                    type="password"
                    class="validate"
                  />
                  <label for="current_pass">Current Password</label>
                </div>
                <br />
                <div className="row">
                  <div className="col s12 m6">
                    <div class="input-field">
                      <input
                        placeholder="Placeholder"
                        id="new_pass"
                        type="password"
                        class="validate"
                      />
                      <label for="new_pass">New Password</label>
                    </div>
                  </div>
                  <div className="col s12 m6">
                    <div class="input-field">
                      <input
                        placeholder="Placeholder"
                        id="confirm_pass"
                        type="password"
                        class="validate"
                      />
                      <label for="confirm_pass">Confirm Password</label>
                    </div>
                  </div>
                </div>
                <a class="waves-effect waves-light btn">
                  <i class="material-icons left">edit</i>Edit
                </a>{" "}
                <a class="green waves-effect waves-light btn">
                  <i class="material-icons left">check</i>Save
                </a>
                {"  "}
                <a class="red waves-effect waves-light btn">
                  <i class="material-icons left">cancel</i>Cancel
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
