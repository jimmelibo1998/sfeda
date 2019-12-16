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
        <select className="browser-default">
          <option disabled value="">
            Select Year
          </option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
        </select>

        <Line data={this.state.chartData} options={this.state.chartOption} />
      </Fragment>
    );
  }
}

export default MedRepPerfChart;
