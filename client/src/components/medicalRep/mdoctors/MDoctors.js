import React from "react";
import { Link } from "react-router-dom";

class MDoctors extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 className="flow-text light-green-text text-darken-3">Doctors</h3>
        <div className="row">
          <div className="col s12">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Class Code</th>
                  <th>Specialization Code</th>
                  <th>Institution Name</th>
                  <th>Email</th>
                  <th>Account</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Nunez</td>
                  <td>Carlos</td>
                  <td>B</td>
                  <td>PEDIA2</td>
                  <td>Ospital Manila</td>
                  <td>kmc.jimmel@gmail.com</td>
                  <td>
                    <button className="waves-effect waves-light btn yellow darken-3">
                      <i className="material-icons left">edit</i>Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Nunez</td>
                  <td>Carlos</td>
                  <td>B</td>
                  <td>PEDIA2</td>
                  <td>Ospital Manila</td>
                  <td>kmc.jimmel@gmail.com</td>
                  <td>
                    <button className="waves-effect waves-light btn yellow darken-3">
                      <i className="material-icons left">edit</i>Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Nunez</td>
                  <td>Carlos</td>
                  <td>B</td>
                  <td>PEDIA2</td>
                  <td>Ospital Manila</td>
                  <td>kmc.jimmel@gmail.com</td>
                  <td>
                    <button className="waves-effect waves-light btn yellow darken-3">
                      <i className="material-icons left">edit</i>Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="7">
                    <div className="row">
                      <div className="col s12 m6">
                        <ul className="pagination">
                          <li className="disabled">
                            <Link to="/medrep/doctors">
                              <i className="material-icons">chevron_left</i>
                            </Link>
                          </li>
                          <li className="active green">
                            <Link to="/medrep/doctors">1</Link>
                          </li>
                          <li className="waves-effect">
                            <Link to="/medrep/doctors">2</Link>
                          </li>
                          <li className="waves-effect">
                            <Link to="/medrep/doctors">3</Link>
                          </li>
                          <li className="waves-effect">
                            <Link to="/medrep/doctors">4</Link>
                          </li>
                          <li className="waves-effect">
                            <Link to="/medrep/doctors">5</Link>
                          </li>
                          <li className="waves-effect">
                            <Link to="/medrep/doctors">
                              <i className="material-icons">chevron_right</i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col s12 m6">
                        <button className="waves-effect waves-light btn right green">
                          <i className="material-icons left">add</i>Add New
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MDoctors;
