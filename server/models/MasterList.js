const mongoose = require("mongoose");

const d = new Date();

module.exports = Masterlist = mongoose.model(
  "masterlist",
  new mongoose.Schema({
    medrep: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "medrep"
    },
    month: {
      type: String,
      default: d.getMonth().toString() + "-" + d.getFullYear().toString(),
      unique: true
    },
    callFreq: {
      type: Number,
      default: 0
    },
    callReach: {
      type: Number,
      default: 0
    },
    sent: {
      type: Boolean,
      default: false
    }
  })
);
