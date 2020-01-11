import React, { Component, Fragment } from "react";
import { DatePicker, Select } from "react-materialize";
import moment from "moment";
import { addAnnouncement } from "../../../actions/announcements";
import { connect } from "react-redux";
import history from "../../../history";

class AddEditAnnouncement extends Component {
  state = {
    area: "All",
    title: "",
    desc: "",
    start: "",
    end: ""
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state);
  };

  announce = async () => {
    const { area, title, desc, start, end } = this.state;
    await this.props.addAnnouncement(area, title, desc, start, end);
    this.setState({ area: "All", title: "", desc: "", start: "", end: "" });
  };

  render() {
    console.log(this.state);
    return (
      <Fragment>
        <div>
          <div className="row">
            <h4 className="light-green-text text-darken-3 center">
              New Announcement
            </h4>
            <div
              className="card-panel col s12 m10 offset-m1"
              style={{ padding: "20px" }}
            >
              <div className="row">
                <Select
                  s={12}
                  id="area"
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
                  value={this.state.selected}
                >
                  <option value="All">All</option>
                  <option value="NORTH LUZON">NORTH LUZON</option>
                  <option alue="NORTH GMA">NORTH GMA</option>
                  <option value="SOUTH GMA">SOUTH GMA</option>
                  <option value="SOUTH LUZON 1">SOUTH LUZON 1</option>
                  <option value="SOUTH LUZON 2">SOUTH LUZON 2</option>
                </Select>
                <div className="input-field col s12">
                  <input
                    onChange={e => this.onChange(e)}
                    value={this.state.title}
                    id="title"
                    type="text"
                    className="validate"
                    placeholder="Title"
                  />
                </div>
                <div className="input-field col s12">
                  <textarea
                    onChange={e => this.onChange(e)}
                    value={this.state.desc}
                    id="desc"
                    className="materialize-textarea"
                    placeholder="Description"
                  ></textarea>
                </div>
                <DatePicker
                  onChange={newDate => {
                    this.onChange({
                      target: {
                        id: "start",
                        value: moment(newDate).format("YYYY-MM-DD")
                      }
                    });
                  }}
                  value={this.state.start}
                  placeholder="Start Date"
                  s={12}
                  options={{
                    autoClose: false,
                    defaultDate: null,
                    disableDayFn: null,
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
                      weekdaysShort: [
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat"
                      ]
                    },
                    isRTL: false,
                    maxDate: null,
                    minDate: new Date(),
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
                <DatePicker
                  onChange={newDate => {
                    this.onChange({
                      target: {
                        id: "end",
                        value: moment(newDate).format("YYYY-MM-DD")
                      }
                    });
                  }}
                  placeholder="End Date"
                  value={this.state.end}
                  s={12}
                  options={{
                    autoClose: false,
                    container: null,
                    defaultDate: null,
                    disableDayFn: date => {
                      if (new Date(this.state.start) >= date) {
                        return true;
                      } else {
                        return false;
                      }
                    },
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
                      weekdaysShort: [
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat"
                      ]
                    },
                    isRTL: false,
                    maxDate: null,
                    minDate: new Date(),
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
              </div>
              <div className="row">
                <div className="col s12 m6">
                  <button
                    onClick={() => history.push("/admin/announcements")}
                    className="waves-effect waves-light teal darken-2 btn btn-large"
                    style={{ width: "100%" }}
                  >
                    Back
                  </button>
                </div>
                <div className="col s12 m6">
                  <button
                    onClick={() => this.announce()}
                    className="waves-effect waves-light green btn btn-large"
                    style={{ width: "100%" }}
                  >
                    Post Announcement
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { addAnnouncement })(AddEditAnnouncement);
