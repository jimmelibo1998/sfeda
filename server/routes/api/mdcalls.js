const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const moment = require("moment");

const auth = require("../../middleware/auth");

const MdCalls = require("../../models/MdCalls");
const Masterlist = require("../../models/MasterList");
const MdCallsScore = require("../../models/MdCallsScore");
const NoCallDays = require("../../models/NoCallDays");
const DCR = require("../../models/DCR");

//@route GET /api/mdcalls/nocalls/:month
//@desc  Get current masterlist  no call days
//@access Private
router.get("/nocalls/:month", auth, async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty())
    return res.status(400).json({ errors: validationErrors.array() });
  console.log(req.params.month);
  try {
    let nocalls = await NoCallDays.findOne({
      month: moment(req.params.month).format("MMMM YYYY")
    });
    if (!nocalls) return res.send("No call days not set for the month");

    res.json(nocalls);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route PUT /api/mdcalls/nocalls/:nocallid/:dateid
//@desc  Remove date from docalldays
//@access Private
router.put("/nocalls/:nocallid/:date", auth, async (req, res) => {
  let validNoCall = mongoose.Types.ObjectId.isValid(req.params.nocallid);
  if (validNoCall === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId not valid" }] });

  try {
    let nocalls = await NoCallDays.findOne({ _id: req.params.nocallid });
    if (!nocalls)
      return res.status(400).json({ errors: [{ msg: "No colls not found" }] });

    let dates = nocalls.dates.filter(date => date.date !== req.params.date);

    nocalls.dates = dates;
    await nocalls.save();
    res.json(nocalls);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route POST /api/mdcalls/nocalls
//@desc  Add no call days
//@access Private
router.post(
  "/nocalls",
  [
    auth,
    [
      check("date", "Date is required").exists(),
      check("desc", "Description is required").exists()
    ]
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    let monthYear = moment(req.body.date).format("MMMM YYYY");
    try {
      let nocalldays = await NoCallDays.findOne({
        month: monthYear
      });

      if (!nocalldays) {
        nocalldays = new NoCallDays({
          month: monthYear,
          dates: [
            {
              date: moment(req.body.date).format("YYYY-MM-DD"),
              desc: req.body.desc
            }
          ]
        });

        await nocalldays.save();
        return res.json(nocalldays);
      }

      let dates = await nocalldays.dates.filter(
        date => date.date === moment(req.body.date).format("YYYY-MM-DD")
      );
      if (dates.length > 0)
        return res.status(400).json({ errors: [{ msg: "Date exists" }] });

      nocalldays.dates.push({
        date: moment(req.body.date).format("YYYY-MM-DD"),
        desc: req.body.desc
      });

      await nocalldays.save();
      res.json(nocalldays);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

module.exports = router;
