import React, { Component, Fragment } from "react";
import { Line } from "react-chartjs-2";

class MedRepPerfChart extends Component {
  state = {
    chartData: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Call Rate (99%)",
          data: [65, 46, 85, 23, 10, 54, 99, 100],
          fill: false,
          borderColor: "#2e7d32",
          lineTension: 0.1
        },
        {
          label: "Call Frequency (88%)",
          data: [65, 92, 95, 65, 23, 50, 88, 100],
          fill: false,
          borderColor: "#827717",
          lineTension: 0.1
        },
        {
          label: "Call Reach (67%)",
          data: [90, 80, 84, 34, 99, 87, 67, 100],
          fill: false,
          borderColor: "#64dd17",
          lineTension: 0.1
        }
      ]
    },
    chartOption: {
      title: {
        display: true,
        text: "Performance Chart"
      }
    }
  };
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col s12">
            <div classNam="row">
              <div class="input-field col s6">
                <input
                  placeholder="2019"
                  id="first_name"
                  type="text"
                  class="validate"
                />
                <label for="first_name">Year</label>
              </div>
              <div class="input-field col s6">
                <a class="waves-effect waves-light btn green darken 3">
                  Search
                </a>
              </div>
            </div>
          </div>
          <div className="col s12">
            <Line
              data={this.state.chartData}
              options={this.state.chartOption}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MedRepPerfChart;
