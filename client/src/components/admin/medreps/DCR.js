import React, { Component, Fragment } from "react";

class DCR extends Component {
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col s12">
            <div className="input-field">
              <input
                type="text"
                className="datepicker"
                placeholder="Nov 25, 2019"
              />
            </div>
          </div>
        </div>
        <table className="centered">
          <thead>
            <tr>
              <th>DOCTOR</th>
              <th>Status</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Alvin Eclair</td>
              <td>Visited</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Alan Jellybean</td>
              <td>Not Visited</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Jonathan Lollipop</td>
              <td>Visited</td>
              <td>0.5</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td className="center">
                <b>Total:</b>
              </td>
              <td className="center">
                <b>14.5</b>
              </td>
            </tr>
          </tfoot>
        </table>
      </Fragment>
    );
  }
}

export default DCR;
