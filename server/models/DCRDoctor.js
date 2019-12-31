const mongoose = require("mongoose");

module.exports = DCRDoctor = mongoose.model(
  "dcrdoctor",
  new mongoose.Schema({
    dcr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dcr",
      required: true
    },
    doctorId: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    contact: {
      type: String
    },
    classCode: {
      type: String
    },
    inMasterlist: {
      type: Boolean,
      required: true
    },
    visited: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      default: 0
    },
    comment: {
      type: String
    }
  })
);
