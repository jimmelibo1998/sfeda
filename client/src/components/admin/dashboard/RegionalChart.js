import React, { Component, Fragment } from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";

class RegionalChart extends Component {
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col s12">
            <Line
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "November",
                  "December"
                ],
                datasets: [
                  {
                    label: `Call Rate ${this.props.regional.callRate
                      .slice(-1)
                      .pop()}%`,
                    data: this.props.regional.callRate,
                    fill: false,
                    borderColor: "#64dd17",
                    lineTension: 0.1
                  },
                  {
                    label: `Call Frequency ${this.props.regional.callFreq
                      .slice(-1)
                      .pop()}%`,
                    data: this.props.regional.callFreq,
                    fill: false,
                    borderColor: "#01579b",
                    lineTension: 0.1
                  },
                  {
                    label: `Call Reach ${this.props.regional.callReach
                      .slice(-1)
                      .pop()}%`,
                    data: this.props.regional.callReach,
                    fill: false,
                    borderColor: "#00695c",
                    lineTension: 0.1
                  }
                ]
              }}
              options={{
                title: {
                  display: true,
                  text: "Performance"
                }
              }}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  regional: state.reports.regional
});

export default connect(mapStateToProps)(RegionalChart);
