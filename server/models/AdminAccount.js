const mongoose = require("mongoose");
module.exports = Admin = mongoose.model(
  "admin",
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
    adminType: {
      type: String,
      default: "admin"
    }
  })
);
