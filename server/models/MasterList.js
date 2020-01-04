const mongoose = require("mongoose");
const moment = require("moment");

const d = new Date();

module.exports = Masterlist = mongoose.model(
  "masterlist",
  new mongoose.Schema({
    medrep: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "medrep"
    },
    area: {
      type: String,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      default: new Date().getFullYear()
    },
    callFreq: {
      type: Number,
      default: 0
    },
    callReach: {
      type: Number,
      default: 0
    },
    goalScore: {
      type: Number,
      default: 0
    },
    currentScore: {
      type: Number,
      default: 0
    },
    callRate: {
      type: Number,
      default: 0
    },
    sent: {
      type: Boolean,
      default: false
    },
    additionalScore: {
      type: Number,
      default: 0
    }
  })
);
