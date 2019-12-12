const mongoose = require("mongoose");

module.exports = MdCallsScore = mongoose.model(
  "mdcallsscore",
  new mongoose.Schema({
    dcr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dcr",
      required: true
    },
    date: {
      type: Date,
      default: Date.now()
    },
    doctors: [
      {
        lastName: {
          type: String
        },
        firstName: {
          type: String
        },
        inMasterlist: {
          type: Boolean
        },
        score: {
          type: Number
        }
      }
    ]
  })
);
