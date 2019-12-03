import React from "react";
import { Line } from "react-chartjs-2";

class RegionPerformance extends React.Component {
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
          label: "Call Reach (88%)",
          data: [65, 92, 95, 65, 23, 50, 88, 100],
          fill: false,
          borderColor: "#827717",
          lineTension: 0.1
        },
        {
          label: "Call Frequency (67%)",
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
        text: "North Luzon",
        fontSize: 25
      },
      layout: {
        padding: {
          left: 50,
          right: 0,
          bottom: 0,
          top: 0
        }
      },
      tooltips: {
        enabled: true
      }
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <Line data={this.state.chartData} options={this.state.chartOption} />
        </div>
      </div>
    );
  }
}

export default RegionPerformance;
