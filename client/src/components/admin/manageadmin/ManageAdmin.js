import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class ManageAdmin extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <h4 className="light-green-text text-darken-3">Administrators</h4>
          <table className="responsive-table centered striped">
            <thead>
              <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Role</th>
                <th>Position</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Edit Info</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Ibo</td>
                <td>Jimmel</td>
                <td>Super-Admin</td>
                <td>Associate Software Engineer</td>
                <td>jimmel.ibo1998@yahoo.com</td>
                <td>0998-354-5261</td>
                <td>
                  <Link
                    to="/admin/manageadmin/edit"
                    className="yellow darken-4 waves-effect waves-light btn"
                  >
                    <i className="material-icons">edit</i>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Aubrey</td>
                <td>Tizon</td>
                <td>Admin</td>
                <td>IT Manager</td>
                <td>aubrey.tizon@gmail.com</td>
                <td>0999-345-9090</td>
                <td>
                  <Link
                    to="/admin/manageadmin/edit"
                    className="yellow darken-4 waves-effect waves-light btn"
                  >
                    <i className="material-icons">edit</i>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Iloseo</td>
                <td>Freida</td>
                <td>Admin</td>
                <td>Marketing Assistant</td>
                <td>Iloseo.Freida@prebiotech.com</td>
                <td>0994-988-4056</td>
                <td>
                  <Link
                    to="/admin/manageadmin/edit"
                    className="yellow darken-4 waves-effect waves-light btn"
                  >
                    <i className="material-icons">edit</i>
                  </Link>
                </td>
              </tr>
            </tbody>
            <tfoot colSpan="4">
              <tr>
                <td>
                  <Link
                    to="/admin/manageadmin/edit"
                    className="waves-effect waves-light btn btn-large perf-btn green darken-1"
                  >
                    <i className="material-icons left">person_add</i>
                    Add New
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default ManageAdmin;
