const mongoose = require("mongoose");
const moment = require("moment");

module.exports = DCR = mongoose.model(
  "dcr",
  new mongoose.Schema({
    masterlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masterlist"
    },
    date: {
      type: String,
      default: moment().format("YYYY-MM-DD")
    },
    totalPoints: {
      type: Number,
      default: 0
    },
    submited: {
      type: Boolean,
      default: false
    },
    enabledEdit: {
      type: Boolean,
      default: true
    }
  })
);
