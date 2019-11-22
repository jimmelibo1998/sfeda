import React, { Component, Fragment } from "react";
import { Line } from "react-chartjs-2";

class RegionalChart extends Component {
  state = {
    chartData: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "North Luzon (99%)",
          data: [65, 46, 85, 23, 10, 54, 99, 100],
          fill: false,
          borderColor: "#2e7d32",
          lineTension: 0.1
        },
        {
          label: "North GMA (88%)",
          data: [65, 92, 95, 65, 23, 50, 88, 100],
          fill: false,
          borderColor: "#827717",
          lineTension: 0.1
        },
        {
          label: "South Gma (67%)",
          data: [90, 80, 84, 34, 99, 87, 67, 100],
          fill: false,
          borderColor: "#64dd17",
          lineTension: 0.1
        },
        {
          label: "South Luzon I (35%)",
          data: [40, 20, 83, 100, 88, 20, 35, 100],
          fill: false,
          borderColor: "#01579b",
          lineTension: 0.1
        },
        {
          label: "South Luzon II (45%)",
          data: [70, 54, 80, 20, 77, 30, 45, 100],
          fill: false,
          borderColor: "#00695c",
          lineTension: 0.1
        }
      ]
    },
    chartOption: {
      title: {
        display: true,
        text: "Call Rate"
      }
    }
  };

  render() {
    return (
      <Fragment>
        <div className="row">
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

export default RegionalChart;
