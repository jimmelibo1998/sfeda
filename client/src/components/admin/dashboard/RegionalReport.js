import React, { Component, Fragment } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

class RegionalReport extends Component {
  constructor(props) {
    super(props);
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
              </select>
              <label>Year</label>
            </div>
          </div>
          <div className="col s12 m6">
            <div className="input-field">
              <select>
                <option value="january">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="1">May</option>
                <option value="2">June</option>
                <option value="3">July</option>
                <option value="1">August</option>
                <option value="2">September</option>
                <option value="3">October</option>
                <option value="2">November</option>
                <option value="3">December</option>
              </select>
              <label>Select Month</label>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default RegionalReport;
