import React, { Fragment } from "react";
import { connect } from "react-redux";
import { changePassword } from "../../../actions/medrep";

class MAccount extends React.Component {
  state = {
    old: "",
    pass1: "",
    pass2: ""
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <Fragment>
        <div>
          <div className="card-panel">
            <div className="row">
              <div className="col s12 m6 offset-m3">
                <h6 className="blue-text darken-3 center">Password</h6>
                <div className="input-field">
                  <input
                    onChange={e => this.onChange(e)}
                    value={this.state.old}
                    id="old"
                    type="password"
                    className="validate"
                    required
                  />
                  <label htmlFor="current_pass">Current Password</label>
                </div>
                <br />
                <div className="row">
                  <div className="col s12 m6">
                    <div className="input-field">
                      <input
                        onChange={e => this.onChange(e)}
                        value={this.state.pass1}
                        id="pass1"
                        type="password"
                        className="validate"
                        required
                      />
                      <label htmlFor="new_pass">New Password</label>
                    </div>
                  </div>
                  <div className="col s12 m6">
                    <div className="input-field">
                      <input
                        onChange={e => this.onChange(e)}
                        value={this.state.pass2}
                        id="pass2"
                        type="password"
                        className="validate"
                        required
                      />
                      <label htmlFor="confirm_pass">Confirm Password</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 m6">
                    <button
                      style={{ width: "100%" }}
                      className="waves-effect waves-light btn btn-large teal darken-3"
                    >
                      <i className="material-icons left">arrow_left</i>Back
                    </button>
                  </div>
                  <div className="col s12 m6">
                    <button
                      onClick={async () => {
                        await this.props.changePassword(
                          this.state.old,
                          this.state.pass1,
                          this.state.pass2
                        );
                        this.setState({ old: "", pass1: "", pass2: "" });
                      }}
                      style={{ width: "100%" }}
                      className="waves-effect waves-light btn btn-large green"
                    >
                      <i className="material-icons left">check</i>Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { changePassword })(MAccount);
