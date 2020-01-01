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
    classCode: {
      type: String,
      required: true
    },
    weekOne: {
      dates: [{ type: String }],
      score: {
        type: Number,
        default: 0
      }
    },
    weekTwo: {
      dates: [{ type: String }],
      score: {
        type: Number,
        default: 0
      }
    },
    weekThree: {
      dates: [{ type: String }],
      score: {
        type: Number,
        default: 0
      }
    },
    weekFour: {
      dates: [{ type: String }],
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
