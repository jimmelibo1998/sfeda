import React, { Component, Fragment } from "react";
import RegionalChart from "./RegionalChart";
import { connect } from "react-redux";
import {
  getCurrents,
  getRegional,
  clearReports
} from "../../../actions/reports";
import { Select } from "react-materialize";
import moment from "moment";

class AdminDashboard extends Component {
  state = {
    area: "SOUTH GMA",
    year: moment().format("YYYY"),
    callReach: [],
    callFreq: [],
    callRate: []
  };
  async componentDidMount() {
    await this.props.getCurrents();
    await await this.props.getRegional(this.state.area, this.state.year);
  }

  componentWillUnmount() {
    this.props.clearReports();
  }
  onChange = async e => {
    await this.setState({ [e.target.id]: e.target.value });
    await this.props.getRegional(this.state.area, this.state.year);
    this.setState({
      callRate: this.props.regional.callRate,
      callFreq: this.props.regional.callFreq,
      callReach: this.props.regional.callReach
    });
  };
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col m12 l4">
            <div className="card-panel white">
              <h5 className="green-text center"> Active Doctors </h5>
              <h2 className="green-text center">
                {this.props.current.doctors}
              </h2>
            </div>
          </div>
          <div className="col m12 l4">
            <div className="card-panel white">
              <h5 className="green-text center"> Active Masterlists </h5>
              <h2 className="green-text center">
                {this.props.current.masterlists}
              </h2>
            </div>
          </div>
          <div className="col m12 l4">
            <div className="card-panel white">
              <h5 className="green-text center"> Active DCRS </h5>
              <h2 className="green-text center">{this.props.current.dcrs}</h2>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <Select
          s={12}
          m={6}
          onChange={e => this.onChange(e)}
          id="area"
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
          value={this.state.area.toUpperCase()}
        >
          <option disabled value="">
            Area
          </option>
          <option value="NORTH LUZON">North Luzon</option>
          <option value="NORTH GMA">North Gma</option>
          <option value="SOUTH GMA">South Gma</option>
          <option value="SOUTH LUZON 1">South Luzon 1</option>
          <option value="SOUTH LUZON 2">South Luzon 2</option>
        </Select>
        <Select
          s={12}
          m={6}
          onChange={e => this.onChange(e)}
          id="year"
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
        <RegionalChart
          callRate={this.state.callRate}
          callFreq={this.state.callFreq}
          callReach={this.state.callReach}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  current: state.reports.current,
  regional: state.reports.regional
});

export default connect(mapStateToProps, {
  getCurrents,
  getRegional,
  clearReports
})(AdminDashboard);
