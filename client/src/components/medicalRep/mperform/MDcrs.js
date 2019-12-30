import React from "react";
import { connect } from "react-redux";
import {
  activeDcrClear,
  addDoctorToDcr,
  removeDoctorFromDcr
} from "../../../actions/masterlist";

class MDcrs extends React.Component {
  state = {
    lastname: "",
    firstname: "",
    email: ""
  };
  componentWillUnmount() {
    this.props.activeDcrClear();
  }

  addRegistered = async (e, lastName, firstName, email, classCode) => {
    e.preventDefault();
    let dcrDoctor = {
      lastName,
      firstName,
      inMasterlist: true,
      contact: email,
      classCode
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
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
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
                detail.classCode
              )
            }
            href="#!"
            className="secondary-content"
          >
            <i className="material-icons green-text">send</i>
          </a>
        </div>
      </li>
    ));
  };

  renderDcrDoctors = () => {
    return this.props.dcrDoctors.map(doctor => (
      <tr key={doctor._id}>
        <td>{doctor.lastName}</td>
        <td>{doctor.firstName}</td>
        <td>{doctor.classCode}</td>
        <td>{doctor.contact}</td>
        <td>{doctor.inMasterlist === true ? "Yes" : "No"}</td>
        <td>
          <label>
            <input type="checkbox" />
            <span>Yes</span>
          </label>
        </td>
        <td>
          <button className="green darken-3 waves-effect waves-light btn">
            <i className="material-icons">add</i>
          </button>
        </td>
        <td>
          <button
            onClick={() =>
              this.props.removeDoctorFromDcr(doctor._id, doctor.inMasterlist)
            }
            className="red darken-4 waves-effect waves-light btn btn-small"
          >
            <i className="material-icons">cancel</i>
          </button>
        </td>
      </tr>
    ));
  };
  render() {
    return (
      <div>
        <h3 className="flow-text light-green-text text-darken-3 center">
          Add Daily Coverage Report ({this.props.activeDcr.date})
        </h3>
        <div className="row">
          <div className="col s12 m3">
            <div className="input-field col s12">
              <h5 className="green-text center">Not in Masterlist</h5>
            </div>
            <form onSubmit={e => this.addNotRegistered(e)}>
              <div className="input-field col s12">
                <input
                  onChange={e => this.onChange(e)}
                  value={this.state.firstname}
                  id="firstname"
                  type="text"
                  className="validate"
                  placeholder="First Name"
                />
              </div>

              <div className="input-field col s12">
                <input
                  onChange={e => this.onChange(e)}
                  value={this.state.lastname}
                  id="lastname"
                  type="text"
                  className="validate"
                  placeholder="Last Name"
                />
              </div>

              <div className="input-field col s12">
                <input
                  onChange={e => this.onChange(e)}
                  value={this.state.email}
                  id="email"
                  type="text"
                  className="validate"
                  placeholder="Email"
                />
              </div>

              <div className="input-field col s12">
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
          <div className="col s12 m9">
            <ul
              className="collection with-header"
              style={{
                maxHeight: "504px",
                minHeight: "504px",
                overflowY: "scroll"
              }}
            >
              <li className="collection-header">
                <div className="row">
                  <div className="col s12 m6">
                    <input
                      id="namesearch"
                      type="text"
                      className="validate"
                      placeholder="Name"
                    />
                  </div>
                  <div className="col s12 m6">
                    <input
                      id="emailsearch"
                      type="text"
                      className="validate"
                      placeholder="Email"
                    />
                  </div>
                </div>
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

          <div className="input-field col s12">
            <div className="row">
              <div className="col s12 m3">
                <button
                  style={{ width: "100%" }}
                  className="teal darken-4 btn btn-large"
                >
                  <i className="material-icons left">arrow_left</i>Back
                </button>
              </div>
              <div className="col s12 m3">
                <button
                  style={{ width: "100%" }}
                  className="yellow darken-4 btn btn-large"
                >
                  <i className="material-icons left">repeat</i>Clear
                </button>
              </div>
              <div className="col s12 m3">
                <button
                  style={{ width: "100%" }}
                  className="green darken-3 btn btn-large"
                >
                  <i className="material-icons left">send</i>Submit DCR
                </button>
              </div>
              <div className="col s12 m3">
                <button
                  style={{ width: "100%" }}
                  className="red darken-3 btn btn-large"
                >
                  <i className="material-icons left">cancel</i>No Coverage
                </button>
              </div>
            </div>
          </div>
          <div className="col s12">
            <table>
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Class Code</th>
                  <th>Email</th>
                  <th>In Masterlist</th>
                  <th>Visited</th>
                  <th>Add Comment</th>
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
  doctorDetails: state.masterlist.doctorDetails
});

export default connect(mapStateToProps, {
  activeDcrClear,
  addDoctorToDcr,
  removeDoctorFromDcr
})(MDcrs);
