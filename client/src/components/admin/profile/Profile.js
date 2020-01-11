import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-materialize";
import { changePasswordAdmin, changeAdminInfo } from "../../../actions/auth";

class Profile extends Component {
  state = {
    old: "",
    pass1: "",
    pass2: "",
    firstName: "",
    lastName: "",
    email: ""
  };

  async componentDidMount() {
    await this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email
    });
  }

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
                <h6 className="blue-text darken-3 center">
                  Personal Info/Email
                </h6>

                <br />
                <div className="row">
                  <div className="col s12 m6">
                    <div className="input-field">
                      <input
                        onChange={e => this.onChange(e)}
                        value={this.state.firstName}
                        id="firstName"
                        type="text"
                        className="validate"
                        placeholder="First Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col s12 m6">
                    <div className="input-field">
                      <input
                        onChange={e => this.onChange(e)}
                        value={this.state.lastName}
                        id="lastName"
                        type="text"
                        className="validate"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="input-field">
                  <input
                    onChange={e => this.onChange(e)}
                    value={this.state.email}
                    id="email"
                    type="email"
                    className="validate"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="row">
                  <div className="col s12">
                    <Modal
                      actions={[
                        <Button
                          onClick={async () => {
                            await this.props.changeAdminInfo(
                              this.state.firstName,
                              this.state.lastName,
                              this.state.email
                            );
                            this.setState({
                              firstName: this.props.user.firstName,
                              lastName: this.props.user.lastName,
                              email: this.props.user.email
                            });
                          }}
                          modal="close"
                        >
                          Confirm
                        </Button>,
                        <Button flat modal="close" node="button" waves="green">
                          Close
                        </Button>
                      ]}
                      bottomSheet={false}
                      fixedFooter={false}
                      id="modal-0"
                      options={{
                        dismissible: true,
                        endingTop: "10%",
                        inDuration: 250,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        opacity: 0.5,
                        outDuration: 250,
                        preventScrolling: true,
                        startingTop: "4%"
                      }}
                      trigger={
                        <Button
                          style={{ width: "100%" }}
                          className="waves-effect waves-light btn btn-large green"
                          node="button"
                        >
                          <i className="material-icons left">check</i>
                          Save
                        </Button>
                      }
                    >
                      <h3 className="green-text center">
                        Are you sure you want to save the changes made?
                      </h3>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
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
                  <div className="col s12">
                    <button
                      onClick={async () => {
                        await this.props.changePasswordAdmin(
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
const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps, {
  changePasswordAdmin,
  changeAdminInfo
})(Profile);
