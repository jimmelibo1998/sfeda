import React from "react";
import { Select } from "react-materialize";
import { connect } from "react-redux";
import {
  loadAggregateDoctors,
  searchByName,
  loadAggregateDoctorsClassCode,
  clearDoctors
} from "../../../actions/doctors";
import {
  getCurrentMasterlist,
  addDoctorToML,
  getMasterlistDoctors,
  removeDoctorFromML,
  sendMasterlist,
  clearMasterlist
} from "../../../actions/masterlist";

import history from "../../../history";

class AddMasterList extends React.Component {
  state = {
    name: "",
    email: "",
    classcode: "",
    disabled: false
  };
  async componentDidMount() {
    await this.props.loadAggregateDoctors(this.props.user.area);
    if (this.props.masterlist.sent === true) {
      this.setState({ disabled: true });
    }
  }

  componentWillUnmount() {
    this.props.clearMasterlist();
    this.props.clearDoctors();
  }
  renderAggregatedDoctors = () => {
    return this.props.doctors.map(doctor => (
      <li className="collection-item" key={doctor._id}>
        <div>
          {doctor.fullName} /{" "}
          <span className="green-text text-darken-2">{doctor.email}</span> /{" "}
          {doctor.classCode}
          <a
            onClick={e => {
              e.preventDefault();
              if (this.state.disabled === false) {
                this.props.addDoctorToML(
                  this.props.masterlist._id,
                  doctor._id,
                  doctor.classCode
                );
              } else {
                console.log("Cant Add Doctor");
              }
            }}
            href="#!"
            className="secondary-content"
          >
            <i className="material-icons green-text">send</i>
          </a>
        </div>
      </li>
    ));
  };

  onChangeEmail = async e => {
    await this.setState({ [e.target.id]: e.target.value });
    if (this.props.doctors === null || this.state.email === "") {
      return this.props.loadAggregateDoctors(this.props.user.area);
    }

    let data = this.state.email;
    let regexs = [RegExp(data, "i")];
    console.log(regexs);
    let filtered = this.props.doctors.filter(doctor => {
      return regexs.some(regex => {
        return regex.test(doctor.email);
      });
    });

    console.log(filtered);

    return this.props.searchByName(filtered);
  };
  onChangeName = async e => {
    await this.setState({ [e.target.id]: e.target.value });
    if (this.props.doctors === null || this.state.name === "") {
      return this.props.loadAggregateDoctors(this.props.user.area);
    }

    let data = this.state.name;
    let regexs = [RegExp(data, "i")];
    console.log(regexs);
    let filtered = this.props.doctors.filter(doctor => {
      return regexs.some(regex => {
        return regex.test(doctor.fullName);
      });
    });

    return this.props.searchByName(filtered);
  };

  onChangeClassCode = async e => {
    await this.setState({ classcode: e.target.value });
    if (this.state.classcode === "") {
      return this.props.loadAggregateDoctors(this.props.user.area);
    }
    this.props.loadAggregateDoctorsClassCode(
      this.state.classcode,
      this.props.user.area
    );
  };
  sendMasterlist = async () => {
    await this.props.sendMasterlist(this.props.masterlist._id);
    if (this.props.masterlist.sent === true) {
      this.setState({ disabled: true });
    }
  };
  renderDoctorDetails = () => {
    let num = 0;
    return this.props.doctorDetails.map(doctorDetail => (
      <tr key={doctorDetail._id}>
        <td>{(num += 1)}</td>
        <td>{doctorDetail.lastName}</td>
        <td>{doctorDetail.firstName}</td>
        <td>{doctorDetail.classCode}</td>
        <td>{doctorDetail.specialityCode}</td>
        <td>{doctorDetail.institution}</td>
        <td>
          <button
            onClick={() =>
              this.props.removeDoctorFromML(
                this.props.masterlist._id,
                doctorDetail._id
              )
            }
            className="red darken-4 waves-effect waves-light btn btn-small"
            disabled={this.state.disabled}
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
          ADD MASTERLIST
        </h3>
        <div className="row">
          <div className="col s12 m3">
            <h4 className="flow-text light-green-text text-darken-3 center">
              Filtering
            </h4>
            <form onSubmit={e => e.preventDefault()}>
              <div className="input-field col s12">
                <input
                  onChange={e => this.onChangeName(e)}
                  value={this.state.name}
                  id="name"
                  type="text"
                  className="validate"
                  placeholder="Name"
                />
              </div>
            </form>
            <form>
              <div className="input-field col s12">
                <input
                  onChange={e => this.onChangeEmail(e)}
                  value={this.state.email}
                  id="email"
                  type="text"
                  className="validate"
                  placeholder="Email"
                />
              </div>
            </form>
            <Select
              s={12}
              onChange={e => this.onChangeClassCode(e)}
              value={this.state.classCode}
              id="classcode"
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
              <option value="">Class Code ( All )</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Select>
          </div>
          <div className="col s12 m9">
            <ul
              className="collection with-header"
              style={{
                maxHeight: "407px",
                minHeight: "407px",
                overflowY: "scroll"
              }}
            >
              <li className="collection-header">
                <h6 className="green-text center">Doctors </h6>
              </li>
              {this.props.doctors.length > 0 ? (
                this.renderAggregatedDoctors()
              ) : (
                <li className="collection-header">
                  <p className="grey-text text-darken-3 center">No Doctors </p>
                </li>
              )}
            </ul>
          </div>

          <div className="input-field col s12">
            <div className="row">
              <div className="col s12 m6">
                {" "}
                <button
                  onClick={() => history.push("/medrep/perform/masterlist")}
                  style={{ width: "100%" }}
                  className="teal darken-3 waves-effect waves-light btn btn-large"
                >
                  <i className="material-icons left">arrow_back</i>Go Back
                </button>
              </div>
              <div className="col s12 m6">
                <button
                  onClick={() => this.sendMasterlist()}
                  style={{ width: "100%" }}
                  className="green darken-3 waves-effect waves-light btn btn-large"
                  disabled={this.state.disabled}
                >
                  <i className="material-icons left">send</i>submit master list
                </button>
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
                  <th>Specialization Code</th>
                  <th>Institution Name</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody>
                {this.props.doctorDetails.length > 0 ? (
                  this.renderDoctorDetails()
                ) : (
                  <tr>
                    <td colSpan="7">
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
  user: state.auth.user,
  doctors: state.doctors,
  masterlist: state.masterlist.masterlist,
  doctorDetails: state.masterlist.doctorDetails
});

export default connect(mapStateToProps, {
  loadAggregateDoctors,
  searchByName,
  getCurrentMasterlist,
  loadAggregateDoctorsClassCode,
  addDoctorToML,
  getMasterlistDoctors,
  removeDoctorFromML,
  sendMasterlist,
  clearMasterlist,
  clearDoctors
})(AddMasterList);
