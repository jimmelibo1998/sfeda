import React from "react";
import { Select, DatePicker } from "react-materialize";
import { connect } from "react-redux";
import {
  getCurrentMasterlist,
  addDcr,
  clearMasterlist
} from "../../../actions/masterlist";
import { fetchMasterlistCall } from "../../../actions/noCalls";
import moment from "moment";
import history from "../../../history";

class MDcrsList extends React.Component {
  state = {
    year: moment().format("YYYY"),
    month: moment().format("MMMM"),
    date: moment().format("YYYY-MM-DD")
  };

  async componentDidMount() {
    await this.props.clearMasterlist();
    await this.props.getCurrentMasterlist(this.props.auth.user._id);
    this.props.fetchMasterlistCall(this.props.masterlist.month);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      date: moment().format("YYYY-MM-DD")
    });
  };

  onChangeDate = e => {
    this.setState({
      [e.target.name]: e.target.value,
      year: moment(e.target.value).format("YYYY"),
      month: moment(e.target.value).format("MMMM")
    });
  };

  disableDates = () => {
    return this.props.nocall !== null
      ? this.props.nocall.dates.map(date => new Date(date.date).toDateString())
      : [];
  };

  renderDcrs = () => {
    return this.props.dcrs.map(dcr => (
      <tr key={dcr._id}>
        <td>{dcr.date}</td>
        <td>{dcr.registeredDoctors}</td>
        <td>{dcr.regularCustomers}</td>
        <td>{dcr.totalVisits}</td>
        <td>{dcr.totalPoints}</td>
        <td>
          <button
            className="waves-effect waves-light btn yellow darken-3"
            disabled={!dcr.enabledEdit}
            onClick={() => history.push("/medrep/perform/dcr/add")}
          >
            <i className="material-icons left">edit</i>Edit
          </button>
        </td>
      </tr>
    ));
  };
  render() {
    return (
      <div>
        <h3 className="flow-text light-green-text text-darken-3 center">
          Daily Coverage Reports
        </h3>
        <div className="row">
          <Select
            s={12}
            m={4}
            onChange={e => this.onChange(e)}
            value={this.state.year}
            name="year"
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
          >
            <option value="">Year</option>
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
          <Select
            s={12}
            m={4}
            onChange={e => this.onChange(e)}
            value={this.state.month}
            name="month"
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
          >
            <option value="">Month</option>
            <option value="January">January</option>
            <option value="Febuary">Febuary</option>
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

          <DatePicker
            s={12}
            m={3}
            onChange={newDate => {
              this.onChangeDate({
                target: {
                  name: "date",
                  value: moment(newDate).format("YYYY-MM-DD")
                }
              });
            }}
            options={{
              autoClose: false,
              container: null,
              defaultDate: null,
              disableDayFn: date => {
                let disableListDate = this.disableDates();

                if (disableListDate.includes(date.toDateString())) {
                  return true;
                } else {
                  return false;
                }
              },
              disableWeekends: false,
              disable: [new Date()],
              events: [],
              firstDay: 0,
              format: "mm/dd/yyyy",
              i18n: {
                cancel: "Cancel",
                clear: "Clear",
                done: "Ok",
                months: [
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
                monthsShort: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec"
                ],
                nextMonth: "›",
                previousMonth: "‹",
                weekdays: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                weekdaysAbbrev: ["S", "M", "T", "W", "T", "F", "S"],
                weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
              },
              isRTL: false,
              maxDate: new Date(
                moment()
                  .endOf("month")
                  .format("YYYY-MM-DD")
              ),
              minDate: new Date(
                moment()
                  .startOf("month")
                  .format("YYYY-MM-DD")
              ),
              onClose: null,
              onDraw: null,
              onOpen: null,
              onSelect: null,
              parse: null,
              setDefaultDate: true,
              showClearBtn: false,
              showDaysInNextAndPreviousMonths: false,
              showMonthAfterYear: false,
              yearRange: 10
            }}
          />
          <div className="col s12 m1">
            <button
              onClick={() =>
                this.props.addDcr(this.props.masterlist._id, this.state.date)
              }
              className="btn btn-large green"
            >
              <i className="material-icons center">add</i>
            </button>
          </div>
          <div className="col s12">
            <table className="responsive-table centered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Registered Doctors</th>
                  <th>Regular Customers</th>
                  <th>Total Visits</th>
                  <th>Total Points</th>
                  <th>Edit</th>
                </tr>
              </thead>

              <tbody>
                {this.props.dcrs.length > 0 ? (
                  this.renderDcrs()
                ) : (
                  <tr>
                    <td colSpan="6">
                      <p className="center grey-text">No DCR</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  masterlist: state.masterlist.masterlist,
  nocall: state.nocall,
  dcrs: state.masterlist.dcrs
});

export default connect(mapStateToProps, {
  getCurrentMasterlist,
  fetchMasterlistCall,
  addDcr,
  clearMasterlist
})(MDcrsList);
