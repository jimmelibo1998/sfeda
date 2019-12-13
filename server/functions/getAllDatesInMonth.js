const moment = require("moment");
module.exports = getAllDatesInMonth = (month, year) => {
  var date = new Date(Date.UTC(year, month, 1));
  var days = [];
  while (date.getMonth() === month) {
    days.push(moment(new Date(date).toISOString()).format("YYYY-MM-DD"));
    date.setDate(date.getDate() + 1);
  }
  return days;
};
