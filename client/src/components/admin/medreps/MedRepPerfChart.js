import React, { Component, Fragment } from "react";
import { Line } from "react-chartjs-2";
import { Select } from "react-materialize";
import { connect } from "react-redux";
import { fetchMedrepPerf, clearActiveMedrep } from "../../../actions/reports";
import moment from "moment";

class MedRepPerfChart extends Component {
  state = {
    year: moment().format("YYYY")
  };

  async componentDidMount() {
    await this.props.fetchMedrepPerf(
      this.state.year,
      this.props.activeMedrep.userDetails._id
    );
  }

  render() {
    return (
      <Fragment>
        <Select
          s={12}
          id="year"
          onChange={async e => {
            await this.setState({ year: e.target.value });
            this.props.fetchMedrepPerf(
              this.state.year,
              this.props.userDetails._id
            );
          }}
          options={{
            classes: "",
            dropdownOptions: {
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              container: null,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250
            }
          }}
          value={this.state.year}
        >
          <option disabled value="">
            Year
          </option>
          <option value="2020">2020</option>
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
          <option value="2001">2001</option>
          <option value="2000">2000</option>
        </Select>
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
              "October",
              "November",
              "December"
            ],
            datasets: [
              {
                label: `Call Rate ${this.props.activeMedrep.performance.callRate
                  .slice(-1)
                  .pop()}%`,
                data: this.props.activeMedrep.performance.callRate,
                fill: false,
                borderColor: "#2e7d32",
                lineTension: 0.1
              },
              {
                label: `Call Frequency ${this.props.activeMedrep.performance.callFreq
                  .slice(-1)
                  .pop()}%`,
                data: this.props.activeMedrep.performance.callFreq,
                fill: false,
                borderColor: "#827717",
                lineTension: 0.1
              },
              {
                label: `Call Reach ${this.props.activeMedrep.performance.callReach
                  .slice(-1)
                  .pop()}%`,
                data: this.props.activeMedrep.performance.callReach,
                fill: false,
                borderColor: "#64dd17",
                lineTension: 0.1
              }
            ]
          }}
          options={{
            title: {
              display: true,
              text: "Performance Chart"
            }
          }}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  activeMedrep: state.reports.activeMedrep,
  userDetails: state.reports.activeMedrep.userDetails
});

export default connect(mapStateToProps, { fetchMedrepPerf, clearActiveMedrep })(
  MedRepPerfChart
);
