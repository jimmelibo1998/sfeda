import React from "react";
import { DatePicker, Select } from "react-materialize";
import { connect } from "react-redux";
import {
  excludeDate,
  fetchMasterlistCall,
  removeExcludedDate,
  updateAllMasterlistGoalScore,
  clearNoCalls
} from "../../../actions/noCalls";
import moment from "moment";

import { getAllDatesInMonth } from "../../../functions/getAllDatesInMonth";
import { arrayDiff } from "../../../functions/arrayDiff";

class Masterlist extends React.Component {
  state = {
    year: moment().format("YYYY"),
    month: moment().format("MMMM"),
    datetoexclude: "",
    desc: "",
    goalScore: 0
  };

  async componentDidMount() {
    await this.props.clearNoCalls();
    await this.props.fetchMasterlistCall(
      this.state.year + " " + this.state.month
    );
    this.getGoalScore();
  }
  componentWillUnmount() {
    this.props.clearNoCalls();
  }
  onFilter = e => {
    e.preventDefault();
    console.log(this.state.month + " " + this.state.year);
    this.props.fetchMasterlistCall(this.state.month + " " + this.state.year);
  };

  onSubmit = async e => {
    e.preventDefault();
    await this.props.excludeDate(this.state.datetoexclude, this.state.desc);
    await this.setState({
      year: moment(this.props.nocall.month).format("YYYY"),
      month: moment(this.props.nocall.month).format("MMMM"),
      datetoexclude: "",
      desc: ""
    });
    await this.getGoalScore();
  };

  onChange = async e => {
    await this.setState({ [e.target.name]: e.target.value });
    await this.props.fetchMasterlistCall(
      this.state.year + " " + this.state.month
    );
    await this.getGoalScore();
  };
  onChangeDate(e) {
    this.setState({ datetoexclude: e.target.value });
  }
  renderExcludedDates = () => {
    return this.props.nocall.dates.map(date => (
      <tr key={date._id}>
        <td>{date.date}</td>
        <td>{date.desc}</td>
        <td>
          <button
            onClick={async () => {
              await this.props.removeExcludedDate(
                this.props.nocall._id,
                date.date
              );
              await this.getGoalScore();
            }}
            className="btn red"
          >
            <i className="material-icons center">remove</i>
          </button>
        </td>
      </tr>
    ));
  };

  disableDates = () => {
    return this.props.nocall !== null && typeof this.props.nocall === "object"
      ? this.props.nocall.dates.map(date => new Date(date.date).toDateString())
      : [];
  };

  getGoalScore = async () => {
    if (this.props.nocall.dates instanceof Array) {
      let month = this.state.month + " " + this.state.year;
      let datesInMonth = getAllDatesInMonth(
        new Date(month).getMonth(),
        new Date(month).getFullYear()
      );

      let excludedDates = this.props.nocall.dates.map(date => date.date);
      let gc = arrayDiff(datesInMonth, excludedDates).length * 15;

      console.log(excludedDates);
      await this.props.updateAllMasterlistGoalScore(gc, month);

      return this.setState({ goalScore: gc });
    }
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <form>
          <Select
            onChange={e => this.onChange(e)}
            name="year"
            value={this.state.year}
            s={12}
            m={6}
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
          </Select>
          <Select
            onChange={e => this.onChange(e)}
            name="month"
            value={this.state.month}
            s={12}
            m={6}
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
            <option disabled value="">
              Month
            </option>
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
        </form>
        <form onSubmit={e => this.onSubmit(e)}>
          <DatePicker
            onChange={newDate => {
              this.onChange({
                target: {
                  name: "datetoexclude",
                  value: moment(newDate).format("YYYY-MM-DD")
                }
              });
            }}
            name="datetoexclude"
            s={12}
            m={4}
            label="Exclude Date"
            value={this.state.datetoexclude}
            options={{
              autoClose: true,
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
              format: "yyyy-mm-dd",
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
              maxDate: null,
              minDate: null,
              onClose: null,
              onDraw: null,
              onOpen: null,
              onSelect: null,
              parse: null,
              setDefaultDate: false,
              showClearBtn: true,
              showDaysInNextAndPreviousMonths: false,
              showMonthAfterYear: false,
              yearRange: 10
            }}
          />
          <div className="input-field col s12 m6">
            <input
              onChange={e => this.onChange(e)}
              value={this.state.desc}
              name="desc"
              id="desc"
              type="text"
              className="validate"
              placeholder="Description"
            />
          </div>

          <div className="col s2">
            <button
              type="submit"
              className="waves-effect waves-light btn btn-large perf-btn green"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              <i className="material-icons left">add</i>
              Add
            </button>
          </div>
        </form>
        <table className="col s12">
          <thead>
            <tr>
              <th>Date</th>
              <th>Decription</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {typeof this.props.nocall === "object" &&
            this.props.nocall !== null ? (
              this.renderExcludedDates()
            ) : (
              <tr>
                <td colSpan="3">
                  <p className="center grey-text">No Calls not set</p>
                </td>
              </tr>
            )}
            <tr>
              <td colSpan="3">
                <h4 className="center green-text text-darken-1">
                  Goal Score:{" "}
                  <span className="green-text text-darken-3">
                    {" "}
                    {typeof this.props.nocall === "object" &&
                    this.props.nocall !== null
                      ? this.state.goalScore
                      : 0}{" "}
                  </span>
                </h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nocall: state.nocall
});

export default connect(mapStateToProps, {
  excludeDate,
  fetchMasterlistCall,
  removeExcludedDate,
  updateAllMasterlistGoalScore,
  clearNoCalls
})(Masterlist);
