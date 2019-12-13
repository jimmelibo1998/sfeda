const mongoose = require("mongoose");

module.exports = RegularCostumer = mongoose.model(
  "regularcustomer",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    email: {
      type: String
    }
  })
);
