const mongoose = require("mongoose");

const d = new Date();
module.exports = DCR = mongoose.model(
  "dcr",
  new mongoose.Schema({
    masterlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masterlist"
    },
    dateId: {
      type: String,
      default:
        (d.getMonth() + 1).toString() +
        "/" +
        d.getDate().toString() +
        "/" +
        d.getFullYear().toString()
    },
    date: {
      type: Date,
      default: Date.now()
    },
    registeredDoctors: {
      type: Number,
      default: 0
    },
    regularCustomers: {
      type: Number,
      default: 0
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
