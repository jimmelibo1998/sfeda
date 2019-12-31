module.exports = weekOfMonth = input => {
  const firstDayOfMonth = input.clone().startOf("month");
  const firstDayOfWeek = firstDayOfMonth.clone().startOf("week");

  const offset = firstDayOfMonth.diff(firstDayOfWeek, "days");
  let weekNumber = Math.ceil((input.date() + offset) / 7);
  return weekNumber > 4 ? 4 : weekNumber;
};
