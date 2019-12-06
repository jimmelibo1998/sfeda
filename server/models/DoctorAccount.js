const mongoose = require("mongoose");
module.exports = Doctor = mongoose.model(
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
      default: this.email
    },
    specialityCode: {
      type: String,
      required: true
    },
    classCode: {
      type: String,
      required: true
    }
  })
);
