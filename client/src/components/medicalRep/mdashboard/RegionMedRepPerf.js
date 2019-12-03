import React from "react";
import { Bar } from "react-chartjs-2";

class RegionMedRepPerf extends React.Component {
  state = {
    northLuzon: {
      labels: ["Archille", "Erica", "Jam", "Glenn", "Tiffany", "Cedrick"],
      datasets: [
        {
          label: "Call Rate",
          data: [100, 70, 60, 40, 20, 100],
          backgroundColor: [
            "rgba(104, 159, 56, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)"
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000"
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Individual",
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
          <h5 className="center green-text text-darken-3">Performance</h5>
          <div className="divider"></div>
        </div>
        <div className="col s12">
          <Bar data={this.state.northLuzon} options={this.state.options} />
        </div>
      </div>
    );
  }
}

export default RegionMedRepPerf;
