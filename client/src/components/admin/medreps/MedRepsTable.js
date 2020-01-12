import React, { Component, Fragment } from "react";
import { Modal as Mod, Button } from "react-materialize";
import { clearActiveMedrep } from "../../../actions/reports";
import { connect } from "react-redux";
import { fetchActiveMedrep } from "../../../actions/reports";
import { resetPassword } from "../../../actions/medrep";
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
            <i className="material-icons center">search</i>
          </button>
        </td>
        <td>
          <button
            onClick={async () => {
              await this.props.fetchActiveMedrep(medrep._id);
              history.push("/admin/medrep/new");
            }}
            className="btn yellow darken-3"
          >
            <i className="material-icons center">mode_edit</i>
          </button>
        </td>
        <td>
          <Mod
            actions={[
              <Button
                onClick={() => this.props.resetPassword(medrep._id)}
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
              <Button className="btn red darken-1" node="button">
                {" "}
                <i className="material-icons center">cached</i>
              </Button>
            }
          >
            <h4 className="center red-text">
              Are you sure you want to reset the password?
            </h4>
          </Mod>
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
              <th>Reset Password</th>
            </tr>
          </thead>

          <tbody>
            {this.props.medreps !== null ? (
              this.renderMedreps()
            ) : (
              <tr>
                <td colSpan="7">
                  <p className="center grey-text">No Medreps</p>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7">
                <button
                  onClick={async () => {
                    await this.props.clearActiveMedrep();
                    history.push("/admin/medrep/new");
                  }}
                  style={{ marginRight: "20px" }}
                  to="/admin/medrep/new"
                  className="waves-effect waves-light btn btn-large perf-btn green darken-1 right"
                >
                  <i className="material-icons left">person_add</i>
                  Add New
                </button>
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

export default connect(mapStateToProps, {
  fetchActiveMedrep,
  resetPassword,
  clearActiveMedrep
})(MedRepsTable);
