const mongoose = require("mongoose");

const d = new Date();

module.exports = Masterlist = mongoose.model(
  "masterlist",
  new mongoose.Schema({
    medrep: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "medrep"
    },
    month: {
      type: Number,
      default: d.getMonth().toString() + "-" + d.getFullYear().toString(),
      unique: true
    },
    scores: [
      {
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "doctor"
        },
        wOne: {
          dates: {
            type: Array,
            default: []
          },
          total: {
            type: Number,
            default: this.scores.wOne.dates.length
          },
          visited: {
            type: Boolean,
            default: (() => {
              if (this.scores.wOne.dates.length >= 1) return true;
              return false;
            })()
          }
        },
        wTwo: {
          dates: {
            type: Array,
            default: []
          },
          total: {
            type: Number,
            default: this.scores.wTwo.dates.length
          },
          visited: {
            type: Boolean,
            default: (() => {
              if (this.scores.wTwo.dates.length >= 1) return true;
              return false;
            })()
          }
        },
        wThree: {
          dates: {
            type: Array,
            default: []
          },
          total: {
            type: Number,
            default: this.scores.wThree.dates.length
          },
          visited: {
            type: Boolean,
            default: (() => {
              if (this.scores.wThree.dates.length >= 1) return true;
              return false;
            })()
          }
        },
        wFour: {
          dates: {
            type: Array,
            default: []
          },
          total: {
            type: Number,
            default: this.scores.wFour.dates.length
          },
          visited: {
            type: Boolean,
            default: (() => {
              if (this.scores.wFour.dates.length >= 1) return true;
              return false;
            })()
          }
        }
      }
    ],
    callFreq: {
      type: Number,
      default: 0
    },
    callReach: {
      type: Number,
      default: 0
    }
  })
);
