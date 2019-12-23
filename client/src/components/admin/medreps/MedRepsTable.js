import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class MedRepsTable extends Component {
  renderMedreps = () => {
    return this.props.medreps.map(medrep => (
      <tr key={medrep._id}>
        <td>{medrep.lastName}</td>
        <td>{medrep.firstName}</td>
        <td>{medrep.email}</td>
        <td>{medrep.area}</td>
        <td>
          <Link to="/admin/medrep/profile" className="btn blue darken-4">
            VIEW
          </Link>
        </td>
        <td>
          <Link to="/admin/medrep/profile" className="btn yellow darken-1">
            Edit
          </Link>
        </td>
      </tr>
    ));
  };
  render() {
    return (
      <Fragment>
        <table className="striped highlight s12 centered">
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Area</th>
              <th>Profile</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {this.props.medreps !== null ? (
              this.renderMedreps()
            ) : (
              <tr>
                <td colSpan="5">
                  <p className="center grey-text">No Medreps</p>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">
                <Link
                  to="/admin/medrep/new"
                  className="waves-effect waves-light btn btn-large perf-btn green darken-1"
                >
                  <i className="material-icons left">person_add</i>
                  Add New
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  medreps: state.medrep
});

export default connect(mapStateToProps)(MedRepsTable);
