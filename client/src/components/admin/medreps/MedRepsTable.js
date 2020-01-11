import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchActiveMedrep } from "../../../actions/reports";
import history from "../../../history";

class MedRepsTable extends Component {
  renderMedreps = () => {
    return this.props.medreps.map(medrep => (
      <tr key={medrep._id}>
        <td>{medrep.lastName}</td>
        <td>{medrep.firstName}</td>
        <td>{medrep.email}</td>
        <td>{medrep.area}</td>
        <td>
          <button
            onClick={async () => {
              await this.props.fetchActiveMedrep(medrep._id);
              history.push("/admin/medrep/profile");
            }}
            className="btn blue darken-4"
          >
            VIEW
          </button>
        </td>
        <td>
          <button
            onClick={async () => {
              await this.props.fetchActiveMedrep(medrep._id);
              history.push("/admin/medrep/new");
            }}
            className="btn yellow darken-1"
          >
            Edit
          </button>
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
              <td colSpan="6">
                <Link
                  style={{ marginRight: "20px" }}
                  to="/admin/medrep/new"
                  className="waves-effect waves-light btn btn-large perf-btn green darken-1 right"
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

export default connect(mapStateToProps, { fetchActiveMedrep })(MedRepsTable);
