import React from "react";
import history from "../../../history";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllDoctors, clearDoctors } from "../../../actions/doctors";
import {
  loadCurrentDoctor,
  clearCurrentDoctor
} from "../../../actions/currentDoctor";
import { Autocomplete, Select } from "react-materialize";

class MDoctors extends React.Component {
  async componentDidMount() {
    await this.props.clearCurrentDoctor();
    await this.props.fetchAllDoctors();
  }

  componentWillUnmount() {
    this.props.clearDoctors();
  }

  renderDoctors = () => {
    let num = 0;
    if (this.props.doctors !== null) {
      return this.props.doctors.map(doctor => (
        <tr key={doctor._id}>
          <td>{(num += 1)}</td>
          <td>{doctor.lastName}</td>
          <td>{doctor.firstName}</td>
          <td>{doctor.classCode}</td>
          <td>{doctor.specialityCode}</td>
          <td>{doctor.area}</td>
          <td>{doctor.email}</td>
          <td>
            <button
              onClick={async () => {
                await this.props.loadCurrentDoctor(doctor._id);
                history.push("/medrep/doctors/new");
              }}
              className="waves-effect waves-light btn yellow darken-3"
            >
              <i className="material-icons left">edit</i>Edit
            </button>
          </td>
        </tr>
      ));
    }
  };

  render() {
    return (
      <div>
        <h3 className="flow-text light-green-text text-darken-3 center">
          Doctors
        </h3>

        <div className="row">
          <div className="col s12">
            <Link
              style={{ width: "100%" }}
              to="/medrep/doctors/new"
              className="btn btn-large right green"
            >
              <i className="material-icons left">add</i>
              ADD NEW
            </Link>
          </div>
          <div className="col s12">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Class Code</th>
                  <th>Specialization Code</th>
                  <th>Area</th>
                  <th>Email</th>
                  <th>Account</th>
                </tr>
              </thead>
              <tbody>
                {this.props.doctors !== null ? (
                  this.renderDoctors()
                ) : (
                  <tr>
                    <td colSpan="6">
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
  doctors: state.doctors
});

export default connect(mapStateToProps, {
  fetchAllDoctors,
  clearDoctors,
  loadCurrentDoctor,
  clearCurrentDoctor
})(MDoctors);
