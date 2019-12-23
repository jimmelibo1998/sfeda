import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllDoctors, clearDoctors } from "../../../actions/doctors";
import { Autocomplete, Select } from "react-materialize";

class MDoctors extends React.Component {
  async componentDidMount() {
    await this.props.fetchAllDoctors();
  }

  componentWillUnmount() {
    this.props.clearDoctors();
  }

  renderDoctors = () => {
    if (this.props.doctors !== null) {
      return this.props.doctors.map(doctor => (
        <tr key={doctor._id}>
          <td>{doctor.lastName}</td>
          <td>{doctor.firstName}</td>
          <td>{doctor.classCode}</td>
          <td>{doctor.specialityCode}</td>
          <td>{doctor.email}</td>
          <td>
            <Link
              to="/medrep/doctors/new"
              className="waves-effect waves-light btn yellow darken-3"
            >
              <i className="material-icons left">edit</i>Edit
            </Link>
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
          <Autocomplete
            s={12}
            m={4}
            options={{
              data: {
                "Gus Fring": null,
                "Saul Goodman": null,
                "Tuco Salamanca": "https://placehold.it/250x250"
              }
            }}
            placeholder="Search Names"
          />
          <Autocomplete
            s={12}
            m={4}
            options={{
              data: {
                "Gus Fring": null,
                "Saul Goodman": null,
                "Tuco Salamanca": "https://placehold.it/250x250"
              }
            }}
            placeholder="Search Email"
          />
          <Select
            s={12}
            m={4}
            onChange={function noRefCheck() {}}
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
            value=""
          >
            <option disabled value="">
              Class Code
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </Select>
        </div>
        <div className="row">
          <div className="col s12">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Class Code</th>
                  <th>Specialization Code</th>
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
              <tfoot>
                <tr>
                  <td colSpan="6">
                    <Link to="/medrep/doctors/new" className="btn right green">
                      Add New
                    </Link>
                  </td>
                </tr>
              </tfoot>
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

export default connect(mapStateToProps, { fetchAllDoctors, clearDoctors })(
  MDoctors
);
