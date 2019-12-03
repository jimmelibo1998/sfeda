import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class LoginPage extends Component {
  render() {
    return (
      <Fragment>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col s12 m6 l4 offset-m3 offset-l4">
            <div className="card z-depth-3" style={{ marginTop: "10%" }}>
              <div className="card-action green darken-1 white-text">
                <h3 className="center"> Prebiotech </h3>
              </div>

              <div className="card-content">
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" />
                </div>
                <br />

                <div className="form-field">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" />
                </div>
                <br />

                <div className="form-field">
                  <Link
                    to="/medrep"
                    className="btn-large waves-effect waves-light green darken-1"
                    style={{ width: "100%" }}
                  >
                    Login
                  </Link>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LoginPage;
