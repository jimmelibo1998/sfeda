const mongoose = require("mongoose");

module.exports = MedRepAccount = mongoose.model(
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
      required: true
    },
    area: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    role: {
      type: String,
      default: "medrep"
    }
  })
);
