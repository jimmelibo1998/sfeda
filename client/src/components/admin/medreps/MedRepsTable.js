import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class MedRepsTable extends Component {
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
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Dela Rosa</td>
              <td>Tiffany</td>
              <td>tiffany.delarosa@prebiotech.com</td>
              <td>North Luzon</td>
              <td>
                <Link to="/admin/medrep/profile" className="btn blue darken-4">
                  VIEW
                </Link>
              </td>
            </tr>
            <tr>
              <td>Ordonez</td>
              <td>Glenn</td>
              <td>ordonez.glenn@prebiotech.com</td>
              <td>North Luzon</td>
              <td>
                <Link to="/admin/medrep/profile" className="btn blue darken-4">
                  VIEW
                </Link>
              </td>
            </tr>
            <tr>
              <td>Delos Santos</td>
              <td>Patosa</td>
              <td>delosantos.patosa@prebiotech.com</td>
              <td>South GMA</td>
              <td>
                <Link to="/admin/medrep/profile" className="btn blue darken-4">
                  VIEW
                </Link>
              </td>
            </tr>
          </tbody>
          <tfoot colSpan="4">
            <tr>
              <td>
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

export default MedRepsTable;
