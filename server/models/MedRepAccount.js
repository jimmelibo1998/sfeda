const mongoose = require("mongoose");

module.exports = MedRep = mongoose.model(
  "medrep",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      default: this.lastName + this.firstName
    },
    area: {
      type: String,
      required: true
    }
  })
);
