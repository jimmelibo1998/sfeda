const mongoose = require("mongoose");

const d = new Date();

module.exports = MdCalls = mongoose.model(
  "mdcalls",
  new mongoose.Schema({
    masterlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masterlist"
    },
    dates: [
      {
        date: {
          type: Date,
          required: true,
          unique: true
        },
        scores: [
          {
            type: Number,
            default: 0
          }
        ]
      }
    ],
    goalScore: {
      type: Number,
      default: this.dates.length * 15
    },
    currentScore: {
      type: Number,
      default: 0
    },
    callRate: {
      type: Number,
      default: (this.goalScore / this.currentScore) * 100
    }
  })
);
