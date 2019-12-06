const mongoose = require("mongoose");

module.exports = DCR = mongoose.model(
  "dcr",
  new mongoose.Schema({
    dates: [
      {
        date: {
          type: Date,
          required: true
        },
        score: {
          type: Number,
          default: 0
        },
        doctors: [{ type: String }]
      }
    ],
    totalScore: {
      type: Number,
      default: 0
    }
  })
);
