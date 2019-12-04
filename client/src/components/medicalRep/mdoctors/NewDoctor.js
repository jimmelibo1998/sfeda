import React from "react";
import { Link } from "react-router-dom";

class NewDoctor extends React.Component {
  render() {
    return (
      <div className="container">
        <h4 className="light-green-text text-darken-3 center">New Doctor</h4>
        <form>
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="input-field">
                <input id="email" type="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
              <br />
              <div className="row">
                <div className="col s12 m6">
                  <button
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
