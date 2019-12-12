const mongoose = require("mongoose");

module.exports = NoCallDays = mongoose.model(
  "nocallday",
  new mongoose.Schema({
    masterlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masterlist"
    },
    dates: [{ type: Date }]
  })
);
