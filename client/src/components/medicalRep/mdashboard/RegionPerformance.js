import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { getRegional } from "../../../actions/reports";
import { loadUser } from "../../../actions/auth";
import moment from "moment";

class RegionPerformance extends React.Component {
  async componentDidMount() {
    await this.props.loadUser();
    this.props.getRegional(this.props.user.area, moment().format("YYYY"));
  }
  render() {
    return (
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
                  borderColor: "#2e7d32",
                  lineTension: 0.1
                },
                {
                  label: `Call Rate ${this.props.regional.callReach
                    .slice(-1)
                    .pop()}%`,
                  data: this.props.regional.callReach,
                  fill: false,
                  borderColor: "#827717",
                  lineTension: 0.1
                },
                {
                  label: `Call Rate ${this.props.regional.callFreq
                    .slice(-1)
                    .pop()}%`,
                  data: this.props.regional.callFreq,
                  fill: false,
                  borderColor: "#64dd17",
                  lineTension: 0.1
                }
              ]
            }}
            options={{
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
            }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  regional: state.reports.regional
});

export default connect(mapStateToProps, { getRegional, loadUser })(
  RegionPerformance
);
