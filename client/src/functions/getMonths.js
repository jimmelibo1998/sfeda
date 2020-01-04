import moment from "moment";
export const months = () => {
  let currentYear = moment().format("YYYY");
  const months = [];
  const dateStart = moment(`${currentYear}-01-01`);
  const dateEnd = moment().add(new Date().getMonth(), "month");
  while (dateEnd.diff(dateStart, "months") >= 0) {
    months.push(dateStart.format("MMMM"));
    dateStart.add(1, "month");
  }
  return months;
};
