const mongoose = require("mongoose");
module.exports = DoctorProfile = mongoose.model(
  "doctor_profile",
  new mongoose.Schema({
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor"
    },
    mobileNumber: {
      type: String
    },
    institution: {
      type: String,
      required: true
    },
    telephoneNumber: {
      type: String
    },
    personal: {
      gender: {
        type: String
      },
      age: {
        type: Number
      },
      birthDate: {
        type: Date
      }
    }
  })
);
