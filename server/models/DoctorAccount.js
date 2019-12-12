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
    registered: {
      type: Boolean,
      required: true
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    specialityCode: {
      type: String
    },
    classCode: {
      type: String
    }
  })
);
