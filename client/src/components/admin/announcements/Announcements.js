import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Announcements extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <h4 className="light-green-text text-darken-3">Announcements</h4>
          <table className="responsive-table centered striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date Posted</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Edit Announcement</th>
                <th>Cancel Announcement</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Meeting</td>
                <td>MM/DD/YYYY</td>
                <td>MM/DD/YYYY</td>
                <td>MM/DD/YYYY</td>
                <td>
                  <Link
                    to="/admin/announcements/edit"
                    className="yellow darken-4 waves-effect waves-light btn"
                  >
                    <i className="material-icons">edit</i>
                  </Link>
                </td>
                <td>
                  <button className="red darken-4 waves-effect waves-light btn">
                    <i className="material-icons">cancel</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Alan</td>
                <td>MM/DD/YYYY</td>
                <td>MM/DD/YYYY</td>
                <td>MM/DD/YYYY</td>
                <td>
                  <Link
                    to="/admin/announcements/edit"
                    className="yellow darken-4 waves-effect waves-light btn"
                  >
                    <i className="material-icons">edit</i>
                  </Link>
                </td>
                <td>
                  <button className="red darken-4 waves-effect waves-light btn">
                    <i className="material-icons">cancel</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Jonathan</td>
                <td>MM/DD/YYYY</td>
                <td>MM/DD/YYYY</td>
                <td>MM/DD/YYYY</td>
                <td>
                  <Link
                    to="/admin/announcements/edit"
                    className="yellow darken-4 waves-effect waves-light btn"
                  >
                    <i className="material-icons">edit</i>
                  </Link>
                </td>
                <td>
                  <button className="red darken-4 waves-effect waves-light btn">
                    <i className="material-icons">cancel</i>
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot colSpan="4">
              <tr>
                <td>
                  <Link
                    to="/admin/announcements/edit"
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

export default Announcements;
