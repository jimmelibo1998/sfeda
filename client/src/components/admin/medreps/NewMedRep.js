import React, { Component } from "react";
import { Select, Modal, Button } from "react-materialize";
import { connect } from "react-redux";
import { addMedrep, clearMedreps } from "../../../actions/medrep";
import { updateActiveMedrep } from "../../../actions/reports";
import { disableAccount } from "../../../actions/medrep";
import history from "../../../history";

class NewMedRep extends Component {
  state = {
    firstName: "",
    lastName: "",
    area: "NORTH LUZON",
    email: ""
  };

  async componentDidMount() {
    if (this.props.userDetails !== null) {
      await this.setState({
        firstName: this.props.userDetails.firstName,
        lastName: this.props.userDetails.lastName,
        area: this.props.userDetails.area,
        email: this.props.userDetails.email
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    const { firstName, lastName, area, email } = this.state;
    this.props.addMedrep(firstName, lastName, area, email);
    this.setState({ firstName: "", lastName: "", area: "", email: "" });
  };

  onEdit = async () => {
    await this.props.updateActiveMedrep(
      this.state.firstName,
      this.state.lastName,
      this.state.area,
      this.state.email
    );
    this.setState({
      firstName: this.props.userDetails.firstName,
      lastName: this.props.userDetails.lastName,
      area: this.props.userDetails.area,
      email: this.props.userDetails.email
    });
  };
  componentWillUnmount() {
    this.props.clearMedreps();
  }

  disableAccount = async () => {
    await this.props.disableAccount(this.props.userDetails._id);
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h4 className="light-green-text text-darken-3 center">
          {this.props.userDetails !== null ? "Edit" : "New"} Med Rep
        </h4>

        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="input-field">
              <input
                onChange={e => this.onChange(e)}
                value={this.state.firstName}
                id="firstName"
                name="firstName"
                type="text"
                className="validate"
                placeholder="First Name"
                required
              />
            </div>
            <div className="input-field">
              <input
                onChange={e => this.onChange(e)}
                value={this.state.lastName}
                id="lastName"
                name="lastName"
                type="text"
                className="validate"
                placeholder="Last Name"
                required
              />
            </div>
            <Select
              value={this.state.value}
              onChange={e => this.onChange(e)}
              style={{ margin: "0 0" }}
              name="area"
              s={12}
              required
              options={{
                classes: "",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  container: null,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250
                }
              }}
            >
              <option value="NORTH LUZON">NORTH LUZON</option>
              <option value="NORTH GMA">NORTH GMA</option>
              <option value="SOUTH GMA">SOUTH GMA</option>
              <option value="SOUTH LUZON 1">SOUTH LUZON 1</option>
              <option value="SOUTH LUZON 2">SOUTH LUZON 2</option>
            </Select>
            <br />
            <div className="input-field">
              <input
                required
                value={this.state.email}
                onChange={e => this.onChange(e)}
                id="email"
                name="email"
                type="email"
                className="validate"
                placeholder="Ëmail"
              />
            </div>
            <br />
            <div className="row">
              <div className="col s12 m4">
                <button
                  onClick={() => history.push("/admin/medrep")}
                  className="waves-effect waves-light btn btn-large teal"
                  style={{ width: "100%" }}
                >
                  cancel
                </button>
              </div>
              <div className="col s12 m4">
                <button
                  onClick={() => {
                    if (this.props.userDetails !== null) {
                      this.onEdit();
                    } else {
                      this.onSubmit();
                    }
                  }}
                  type="submit"
                  className={`waves-effect waves-light btn btn-large ${
                    this.props.userDetails !== null ? "yellow" : "green"
                  } darken-3`}
                  style={{ width: "100%" }}
                >
                  {this.props.userDetails !== null ? "Edit" : "CREATE ACCOUNT"}
                </button>
              </div>

              <div className="col s12 m4">
                <Modal
                  actions={[
                    <Button
                      onClick={() => this.disableAccount()}
                      className="red-text"
                      flat
                      modal="close"
                      node="button"
                      waves="green"
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
                      className="waves-effect waves-light btn btn-large red darken-3"
                      style={{ width: "100%" }}
                      node="button"
                    >
                      Disable account
                    </Button>
                  }
                >
                  <h3 className="red-text center">
                    Are you sure you want to disable the account?
                  </h3>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userDetails: state.reports.activeMedrep.userDetails
});
export default connect(mapStateToProps, {
  addMedrep,
  clearMedreps,
  updateActiveMedrep,
  disableAccount
})(NewMedRep);
