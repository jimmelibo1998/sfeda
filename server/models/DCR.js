const mongoose = require("mongoose");

module.exports = DCR = mongoose.model(
  "dcr",
  new mongoose.Schema({
    masterlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masterlist"
    },
    date: {
      type: String,
      unique: true
    },
    registeredDoctors: {
      type: Number,
      default: 0
    },
    regularCustomers: {
      type: Number,
      default: 0
    },
    totalVisits: {
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
