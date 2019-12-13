const mongoose = require("mongoose");

module.exports = NoCallDays = mongoose.model(
  "nocallday",
  new mongoose.Schema({
    month: {
      type: String,
      unique: true
    },
    dates: [{ type: String }]
  })
);
