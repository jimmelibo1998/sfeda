import React, { Component, Fragment } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

class MdCalls extends Component {
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
            <div class="input-field">
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
            <div class="input-field">
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
              <th>Day</th>
              <th>Date</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Monday</td>
              <td>01-Jul-2019</td>
              <td>17.00</td>
            </tr>
            <tr>
              <td>Tuesday</td>
              <td>02-Jul-2019</td>
              <td>14.50</td>
            </tr>
            <tr>
              <td>Wednesday</td>
              <td>03-Jul-2019</td>
              <td>10.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="center">
                <b>Total</b>
              </td>
              <td className="center">
                <b>375</b>
              </td>
              <td className="center">
                <b>310.50</b>
              </td>
            </tr>
          </tfoot>
        </table>
      </Fragment>
    );
  }
}

export default MdCalls;
