const mongoose = require("mongoose");

const d = new Date();

module.exports = MdCalls = mongoose.model(
  "mdcalls",
  new mongoose.Schema({
    masterlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masterlist",
      unique: true
    },
    goalScore: {
      type: Number,
      default: 0
    },
    currentScore: {
      type: Number,
      default: 0
    },
    callRate: {
      type: Number,
      default: 0
    }
  })
);
