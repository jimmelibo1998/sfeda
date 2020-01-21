import React from "react";
import { connect } from "react-redux";
import uuid from "uuid";
import { Modal, Button } from "react-materialize";
import {
  activeDcrClear,
  addDoctorToDcr,
  removeDoctorFromDcr,
  updateVisited,
  updateTotalVisitsPoints,
  setDcrToNoCover
} from "../../../actions/masterlist";
import history from "../../../history";
import moment from "moment";
class MDcrs extends React.Component {
  state = {
    lastname: "",
    firstname: "",
    email: "",
    noCoverReason: ""
  };

  componentDidMount() {
    this.props.updateTotalVisitsPoints();
    if (this.props.activeDcr.noCover === true) {
      history.push("/medrep/perform/dcr");
    }
  }

  componentWillUnmount() {
    this.props.activeDcrClear();
  }

  addRegistered = async (
    e,
    lastName,
    firstName,
    email,
    classCode,
    doctorId
  ) => {
    e.preventDefault();
    let dcrDoctor = {
      lastName,
      firstName,
      inMasterlist: true,
      contact: email,
      classCode,
      doctorId
    };
    await this.props.addDoctorToDcr(dcrDoctor);
  };
  addNotRegistered = async e => {
    e.preventDefault();
    let dcrDoctor = {
      lastName: this.state.lastname,
      firstName: this.state.firstname,
      inMasterlist: false,
      contact: this.state.email
    };
    await this.props.addDoctorToDcr(dcrDoctor);
    this.setState({ lastname: "", firstname: "", email: "" });
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  filterDcrDoctorAndMasterlistDoctor = id => {
    let doc = this.props.dcrDoctors.filter(doctor => doctor.doctorId === id);
    return doc.length > 0 ? true : false;
  };

  renderMasterlistDoctors = () => {
    return this.props.doctorDetails.map(detail => (
      <li className="collection-item" key={detail._id}>
        <div>
          {detail.lastName + " " + detail.firstName} /{" "}
          <span className="green-text text-darken-2">{detail.email}</span> /{" "}
          {detail.classCode}
          <a
            onClick={e =>
              this.addRegistered(
                e,
                detail.lastName,
                detail.firstName,
                detail.email,
                detail.classCode,
                detail._id
              )
            }
            href="#!"
            className="secondary-content"
          >
            <i
              className={`material-icons ${
                this.filterDcrDoctorAndMasterlistDoctor(detail._id) === false
                  ? "green"
                  : "grey"
              }-text`}
            >
              send
            </i>
          </a>
        </div>
      </li>
    ));
  };

  renderDcrDoctors = () => {
    let num = 0;
    return this.props.dcrDoctors.map(doctor => {
      num += 1;
      const id = uuid.v4();
      return (
        <tr key={id}>
          <td>{num}</td>
          <td>{doctor.lastName}</td>
          <td>{doctor.firstName}</td>
          <td>{doctor.classCode}</td>
          <td>{doctor.contact}</td>
          <td>{doctor.inMasterlist === true ? "Yes" : "No"}</td>
          <td>
            <label>
              <input
                onChange={async () => {
                  doctor._id !== ""
                    ? await this.props.updateVisited(
                        doctor._id,
                        doctor.visited,
                        doctor.doctorId
                      )
                    : console.log("Not Registered");
                }}
                type="checkbox"
                checked={doctor.visited}
                disabled={
                  new Date(this.props.activeDcr.date) >
                  new Date(moment().format("YYYY-MM-DD"))
                    ? "disabled"
                    : ""
                }
              />
              <span>Yes</span>
            </label>
          </td>
          <td>
            <button
              onClick={async () => {
                await this.props.removeDoctorFromDcr(
                  doctor._id,
                  doctor.inMasterlist,
                  doctor.doctorId
                );
              }}
              className="red darken-4 waves-effect waves-light btn btn-small"
            >
              <i className="material-icons">cancel</i>
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <h3 className="flow-text light-green-text text-darken-3 center">
          Add Daily Coverage Report ({this.props.activeDcr.date})
        </h3>
        <div className="row">
          <div className="col s12">
            <ul
              className="collection with-header"
              style={{
                maxHeight: "504px",
                minHeight: "504px",
                overflowY: "scroll"
              }}
            >
              <li className="collection-header">
                <h5 className="green-text center">Masterlist Doctors</h5>
              </li>
              {this.props.doctorDetails.length > 0 ? (
                this.renderMasterlistDoctors()
              ) : (
                <li className="collection-header">
                  <p className="grey-text text-darken-3 center">No Doctors </p>
                </li>
              )}
            </ul>
          </div>
          <div className="col s12">
            <form onSubmit={e => this.addNotRegistered(e)}>
              <div className="input-field col s12 m3">
                <input
                  onChange={e => this.onChange(e)}
                  value={this.state.firstname}
                  id="firstname"
                  type="text"
                  className="validate"
                  placeholder="First Name"
                />
              </div>

              <div className="input-field col s1 m3">
                <input
                  onChange={e => this.onChange(e)}
                  value={this.state.lastname}
                  id="lastname"
                  type="text"
                  className="validate"
                  placeholder="Last Name"
                />
              </div>

              <div className="input-field col s12 m3">
                <input
                  onChange={e => this.onChange(e)}
                  value={this.state.email}
                  id="email"
                  type="text"
                  className="validate"
                  placeholder="Email"
                />
              </div>

              <div className="input-field col s12 m3">
                <button
                  type="submit"
                  style={{ width: "100%" }}
                  className="green darken-3 btn btn-large"
                >
                  <i className="material-icons left">add</i>Add Doctor
                </button>
              </div>
            </form>
          </div>
          <div className="input-field col s12">
            <div className="row">
              <div className="col s12 m6">
                <button
                  style={{ width: "100%" }}
                  className="teal darken-4 btn btn-large"
                  onClick={() => history.push("/medrep/perform/dcr")}
                >
                  <i className="material-icons left">arrow_left</i>Back
                </button>
              </div>

              <div className="col s12 m6">
                <Modal
                  actions={[
                    <Button flat modal="close" node="button" waves="green">
                      Close
                    </Button>,
                    <Button
                      onClick={() =>
                        this.props.setDcrToNoCover(this.state.noCoverReason)
                      }
                      className="red-text"
                      flat
                      modal="close"
                      node="button"
                      waves="green"
                    >
                      Confirm
                    </Button>
                  ]}
                  bottomSheet={false}
                  fixedFooter
                  header="No Coverage"
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
                      node="button"
                      className="red darken-3 btn btn-large"
                    >
                      NO COVERAGE
                    </Button>
                  }
                >
                  <div className="input-field">
                    <textarea
                      onChange={e => this.onChange(e)}
                      value={this.state.noCoverReason}
                      style={{ height: "100%" }}
                      id="noCoverReason"
                      className="materialize-textarea browser-default"
                    ></textarea>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          <div className="col s12">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Class Code</th>
                  <th>Email</th>
                  <th>In Masterlist</th>
                  <th>Visited</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody>
                {this.props.dcrDoctors.length > 0 ? (
                  this.renderDcrDoctors()
                ) : (
                  <tr>
                    <td colSpan="8">
                      <p className="center grey-text">No Doctors</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  activeDcr: state.masterlist.activeDcr,
  dcrDoctors: state.masterlist.dcrDoctors,
  doctorDetails: state.masterlist.doctorDetails,
  doctors: state.masterlist.doctors
});

export default connect(mapStateToProps, {
  activeDcrClear,
  addDoctorToDcr,
  removeDoctorFromDcr,
  updateVisited,
  updateTotalVisitsPoints,
  setDcrToNoCover
})(MDcrs);
