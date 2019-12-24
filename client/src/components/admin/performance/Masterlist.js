import React from "react";
import { DatePicker } from "react-materialize";

class Masterlist extends React.Component {
  render() {
    return (
      <div>
        <DatePicker
          s={10}
          label="Exclude Date"
          options={{
            autoClose: false,
            container: null,
            defaultDate: null,
            disableDayFn: null,
            disableWeekends: false,
            events: [],
            firstDay: 0,
            format: "mmm dd, yyyy",
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
        <div className="col s2">
          <button
            className="waves-effect waves-light btn btn-large perf-btn green"
            style={{ width: "100%", marginBottom: "5px" }}
          >
            <i className="material-icons left">add</i>
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default Masterlist;
