import React from "react";
import { Link } from "react-router-dom";

class MDcrsList extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 className="flow-text light-green-text text-darken-3">
          Daily Coverage Reports
        </h3>
        <div className="row">
          <div class="input-field col s6">
            <select className="browser-default">
              <option value="">Year</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
              <option value="2008">2008</option>
              <option value="2007">2007</option>
              <option value="2006">2006</option>
              <option value="2005">2005</option>
              <option value="2004">2004</option>
              <option value="2003">2003</option>
              <option value="2002">2002</option>
              <option value="2001">2001</option>
              <option value="2000">2000</option>
            </select>
          </div>

          <div class="input-field col s6">
            <select className="browser-default">
              <option value="">Month</option>
              <option value="January">January</option>
              <option value="Febuary">Febuary</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div className="col s12">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Registered Doctors</th>
                  <th>Regular Customers</th>
                  <th>Total Visits</th>
                  <th>Total Points</th>
                  <th>Edit</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>mm/dd/yyyy</td>
                  <td>8</td>
                  <td>9</td>
                  <td>17</td>
                  <td>17</td>
                  <td>
                    <button className="waves-effect waves-light btn yellow darken-3">
                      <i className="material-icons left">edit</i>Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>mm/dd/yyyy</td>
                  <td>8</td>
                  <td>9</td>
                  <td>17</td>
                  <td>17</td>
                  <td>
                    <button className="waves-effect waves-light btn yellow darken-3">
                      <i className="material-icons left">edit</i>Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>mm/dd/yyyy</td>
                  <td>8</td>
                  <td>9</td>
                  <td>17</td>
                  <td>17</td>
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
                            <Link to="/medrep/perform/dcrs/add">
                              <i className="material-icons">chevron_right</i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col s12 m6">
                        <Link
                          to="/medrep/perform/dcrs/add"
                          className="waves-effect waves-light btn right green"
                        >
                          <i className="material-icons left">add</i>Add New
                        </Link>
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

export default MDcrsList;
