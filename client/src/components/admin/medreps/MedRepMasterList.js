import React, { Component, Fragment } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import MedRepPerfChart from "./MedRepPerfChart";

class MedRepMasterList extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll("select");
      M.FormSelect.init(elems, { coverTrigger: true });
    });
  }
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col s12 m6">
            <div className="input-field">
              <select>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
              </select>
              <label>Year</label>
            </div>
          </div>
          <div className="col s12 m6">
            <div className="input-field">
              <select>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <label>Month</label>
            </div>
          </div>
        </div>
        <table className="centered">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Class Code</th>
              <th>Specialization Code</th>
              <th>W1</th>
              <th>W2</th>
              <th>W3</th>
              <th>W4</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>VILLAROMAN VICTOR JESUS</td>
              <td>A</td>
              <td>GAS</td>
              <td></td>
              <td>1</td>
              <td></td>
              <td>1</td>
            </tr>
            <tr>
              <td>VILLAROMAN VICTOR JESUS</td>
              <td>A</td>
              <td>GAS</td>
              <td></td>
              <td></td>
              <td>3</td>
              <td></td>
            </tr>
            <tr>
              <td>VILLAROMAN VICTOR JESUS</td>
              <td>A</td>
              <td>GAS</td>
              <td>2</td>
              <td>2</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default MedRepMasterList;
