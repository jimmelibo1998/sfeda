const mongoose = require("mongoose");
module.exports = DoctorAccount = mongoose.model(
  "doctor",
  new mongoose.Schema({
    lastName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    specialityCode: {
      type: String,
      required: true
    },
    classCode: {
      type: String,
      required: true
    },
    institution: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    inMasterlist: {
      type: Boolean,
      default: false
    }
  })
);
