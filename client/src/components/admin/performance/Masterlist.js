import React from "react";
import { DatePicker, Select } from "react-materialize";
import { connect } from "react-redux";
import { excludeDate } from "../../../actions/noCalls";
import moment from "moment";
import M from "materialize-css/dist/js/materialize";

class Masterlist extends React.Component {
  state = {
    year: moment().format("YYYY"),
    month: moment().format("MMMM"),
    datetoexclude: "2019/12/12",
    desc: ""
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.excludeDate();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeDate(e) {
    this.setState({ datetoexclude: e.target.value });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Select
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
            options={{
              autoClose: false,
              container: null,
              defaultDate: null,
              disableDayFn: null,
              disableWeekends: false,
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
              showClearBtn: false,
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
        </form>
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
        <table className="col s12">
          <thead>
            <tr>
              <th>Date</th>
              <th>Decription</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Alvin</td>
              <td>Eclair</td>
            </tr>
            <tr>
              <td>Alan</td>
              <td>Jellybean</td>
            </tr>
            <tr>
              <td>Jonathan</td>
              <td>Lollipop</td>
            </tr>
            <tr>
              <td colSpan="2">
                <h4 className="center green-text text-darken-1">
                  Goal Score:{" "}
                  <span className="green-text text-darken-3"> 340 </span>
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

export default connect(mapStateToProps, { excludeDate })(Masterlist);
