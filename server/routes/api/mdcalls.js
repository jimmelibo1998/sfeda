const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const MdCalls = require("../../models/MdCalls");
const Masterlist = require("../../models/MasterList");
const MdCallsScore = require("../../models/MdCallsScore");
const NoCallDays = require("../../models/NoCallDays");
const DCR = require("../../models/DCR");

//@route POST /api/mdcalls/:masterlist
//@desc  Add MdCalls
//@access Private
router.post("/:masterlist", async (req, res) => {
  let valid = mongoose.Types.ObjectId.isValid(req.params.masterlist);
  if (valid === false)
    return res.status(400).json({ errors: [{ msg: "Object Id not valid" }] });

  try {
    let masterlist = await Masterlist.findById(req.params.masterlist);
    if (!masterlist)
      return res
        .status(400)
        .json({ errors: [{ msg: "Masterlist not found" }] });

    let mdcalls = await MdCalls.findOne({ masterlist: req.params.masterlist });
    if (mdcalls)
      return res.status(400).json({
        errors: [{ msg: "Md Calls already created for the masterlist" }]
      });
    mdcalls = new MdCalls({
      masterlist: req.params.masterlist
    });

    await mdcalls.save();
    res.json(mdcalls);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route POST /api/mdcalls/score/:mdcalls
//@desc  Add mdcalls Score
//@access Private
router.post("/score/:dcr", async (req, res) => {
  let valid = mongoose.Types.ObjectId.isValid(req.params.dcr);
  if (valid === false)
    return res.status(400).json({ errors: [{ msg: "Object Id not valid" }] });

  try {
    let dcr = await DCR.findById(req.params.dcr);
    if (!dcr)
      return res.status(400).json({ errors: [{ msg: "DCR not found" }] });

    let mdcallscore = await MdCallsScore.findOne({ dcr: req.params.dcr });
    if (mdcallscore)
      return res
        .status(400)
        .json({ errors: [{ msg: "Md Calls Score already created for DCR" }] });

    mdcallscore = new MdCallsScore({
      dcr: req.params.dcr
    });

    await mdcallscore.save();
    res.json(mdcallscore);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route POST /api/mdcalls/nocalls/:masterlist
//@desc  Add no call days
//@access Private
router.post(
  "/nocalls/:masterlist",
  [check("date", "Date is required").exists()],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    const valid = mongoose.Types.ObjectId.isValid(req.params.masterlist);
    if (valid === false)
      return res
        .status(400)
        .json({ errors: [{ msg: "ObjectId is not Valid" }] });

    try {
      let masterlist = await Masterlist.findById(req.params.masterlist);
      if (!masterlist)
        return res
          .status(400)
          .json({ errors: [{ msg: "Masterlist not found" }] });
      let nocalldays = await NoCallDays.findOne({
        masterlist: req.params.masterlist
      });

      if (!nocalldays) {
        nocalldays = new NoCallDays({
          masterlist: req.params.masterlist,
          dates: [new Date(req.body.date)]
        });

        await nocalldays.save();
        return res.json(nocalldays);
      }

      // let dates = nocalldays.dates.filter(
      //   date => date === Date(req.body.date).toString()
      // );
      // if (dates.length > 0)
      //   return res.status(400).json({ errors: [{ msg: "Date exists" }] });

      nocalldays.dates.push(new Date(req.body.date));
      nocalldays.save();
      res.json(nocalldays);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

//@route PUT /api/mdcalls/:masterlist
//@desc  Set mdcalls goal score
//@access Private
// router.put('/:masterlist', (req, res) => {

// });

module.exports = router;
