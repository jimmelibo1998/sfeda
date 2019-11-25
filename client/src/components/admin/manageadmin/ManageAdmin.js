import React, { Component, Fragment } from "react";

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
                  <a class="yellow darken-4 waves-effect waves-light btn">
                    <i class="material-icons">edit</i>
                  </a>
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
                  <a class="yellow darken-4 waves-effect waves-light btn">
                    <i class="material-icons">edit</i>
                  </a>
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
                  <a class="yellow darken-4 waves-effect waves-light btn">
                    <i class="material-icons">edit</i>
                  </a>
                </td>
              </tr>
            </tbody>
            <tfoot colSpan="4">
              <tr>
                <td>
                  <a className="waves-effect waves-light btn btn-large perf-btn green darken-1">
                    <i className="material-icons left">person_add</i>
                    Add New
                  </a>
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
