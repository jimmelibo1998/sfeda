const mongoose = require("mongoose");

module.exports = DCRDoctor = mongoose.model(
  "dcrdoctor",
  new mongoose.Schema({
    dcr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dcr",
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    inMasterlist: {
      type: Boolean,
      required: true
    },
    visited: {
      type: Boolean,
      default: false
    },
    comment: {
      type: String
    }
  })
);
