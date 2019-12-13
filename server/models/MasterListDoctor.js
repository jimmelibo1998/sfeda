const mongoose = require("mongoose");

module.exports = MasterListDoctor = mongoose.model(
  "masterlistdoctor",
  new mongoose.Schema({
    masterlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masterlist",
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true
    },
    class: {
      type: String,
      required: true
    },
    weekOne: {
      dates: [{ type: Date }],
      score: {
        type: Number,
        default: 0
      }
    },
    weekTwo: {
      dates: [{ type: Date }],
      score: {
        type: Number,
        default: 0
      }
    },
    weekThree: {
      dates: [{ type: Date }],
      score: {
        type: Number,
        default: 0
      }
    },
    weekFour: {
      dates: [{ type: Date }],
      score: {
        type: Number,
        default: 0
      }
    },
    total: {
      type: Number,
      default: 0
    }
  })
);
