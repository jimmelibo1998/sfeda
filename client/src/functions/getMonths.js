import moment from "moment";
export const months = year => {
  let currentYear = moment(year).format("YYYY");
  const months = [];
  const dateStart = moment(`${currentYear}-01-01`);
  const dateEnd = moment().add(new Date().getMonth() - 1, "month");
  while (dateEnd.diff(dateStart, "months") >= 0) {
    months.push(dateStart.format("MMMM"));
    dateStart.add(1, "month");
  }
  return months;
};
