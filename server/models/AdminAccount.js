const mongoose = require("mongoose");
module.exports = User =>
  mongoose.model(
    "user",
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
      adminType: {
        type: String,
        default: "admin"
      }
    })
  );
