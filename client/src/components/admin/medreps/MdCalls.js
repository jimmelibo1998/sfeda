import React, { Component, Fragment } from "react";
import { Select } from "react-materialize";
import { fetchMasterlist } from "../../../actions/reports";
import { connect } from "react-redux";
import moment from "moment";

class MdCalls extends Component {
  state = {
    month: moment().format("MMMM"),
    year: moment().format("YYYY")
  };

  async componentDidMount() {
    await this.props.fetchMasterlist(this.state.month + " " + this.state.year);
  }

  onChange = async e => {
    await this.setState({ [e.target.id]: e.target.value });
    this.props.fetchMasterlist(this.state.month + " " + this.state.year);
  };

  renderDCRS = () => {
    return this.props.mdCalls.dcrs.map(dcr => (
      <tr key={dcr._id}>
        <td>{moment(dcr.date).format("dddd")}</td>
        <td>{moment(dcr.date).format("LL")}</td>
        <td>{dcr.totalPoints}</td>
      </tr>
    ));
  };

  render() {
    return (
      <Fragment>
        <div className="row">
          <Select
            s={12}
            m={6}
            id="year"
            onChange={e => this.onChange(e)}
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
          </Select>
          <Select
            s={12}
            m={6}
            id="month"
            onChange={e => this.onChange(e)}
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
            value={this.state.month}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </Select>
        </div>
        <table className="centered">
          <thead>
            <tr>
              <th>Day</th>
              <th>Date</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            {this.props.mdCalls.dcrs.length > 0 ? (
              this.renderDCRS()
            ) : (
              <tr>
                <td colSpan="3">
                  <p className="center grey-text">No DCR</p>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="center">
                <b>Total</b>
              </td>
              <td className="center">
                <b>
                  {this.props.mdCalls.masterlist !== null
                    ? this.props.mdCalls.masterlist.goalScore
                    : 0}
                </b>
              </td>
              <td className="center">
                <b>
                  {this.props.mdCalls.masterlist !== null
                    ? this.props.mdCalls.masterlist.currentScore
                    : 0}
                </b>
              </td>
            </tr>
          </tfoot>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mdCalls: state.reports.activeMedrep.mdCalls
});

export default connect(mapStateToProps, { fetchMasterlist })(MdCalls);
