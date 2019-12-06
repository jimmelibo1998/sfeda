const mongoose = require("mongoose");

module.exports = MedRepProfile = mongoose.model(
  "medrep_profile",
  new mongoose.Schema({
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "medrep"
    },
    mobile: {
      type: String,
      required: true
    },
    telephone: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    personal: {
      age: {
        type: Number
      },
      gender: {
        type: String
      },
      birthDate: {
        type: Date
      }
    }
  })
);
