const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const arrayDiff = require("../../functions/arrayDiff");
const getAllDatesInMonth = require("../../functions/getAllDatesInMonth");

const auth = require("../../middleware/auth");
const NoCallDays = require("../../models/NoCallDays");

const DCR = require("../../models/DCR");
const DCRDoctor = require("../../models/DCRDoctor");
const MasterList = require("../../models/MasterList");
const MdCalls = require("../../models/MdCalls");
const MdCallsScore = require("../../models/MdCallsScore");
const DoctorAccount = require("../../models/DoctorAccount");
const RegularCustomer = require("../../models/RegularCustomer");
const MedRepAccount = require("../../models/MedRepAccount");

//@route GET /api/reports/dmd
//@desc  Fetch Curretng Doctors Masterlists and DCR count
//@access Private
router.get("/dmd", auth, async (req, res) => {
  let currentMonthYear = moment().format("MMMM YYYY");
  try {
    let inMasterlistDoctors = await DoctorAccount.find({
      inMasterlist: true
    }).countDocuments();
    let monthsMasterlists = await MasterList.find({
      month: currentMonthYear
    }).countDocuments();
    let dcrs = await DCR.find({
      date: moment().format("YYYY-MM-DD")
    }).countDocuments();

    let currents = {
      doctors: inMasterlistDoctors,
      masterlists: monthsMasterlists,
      dcrs: dcrs
    };

    res.json(currents);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route GET /api/reports/average/:area/:month
//@desc  Fetch Curretng Doctors Masterlists and DCR count
//@access Private
router.get("/average/:area/:month", auth, async (req, res) => {
  try {
    let masterlists = await MasterList.find({
      month: req.params.month,
      area: req.params.area
    });
    if (!masterlists) {
      return res.json({
        avgCallRate: 0,
        avgCallFreq: 0,
        avgCallReach: 0
      });
    }
    let data = {
      callRate: [],
      callFreq: [],
      callReach: []
    };
    masterlists.map(masterlist => {
      data.callRate.push(masterlist.callRate);
      data.callFreq.push(masterlist.callFreq);
      data.callReach.push(masterlist.callReach);
    });

    let medreps = await MedRepAccount.find({
      area: req.params.area
    }).countDocuments();

    let avgCallRate =
      (await data.callRate.reduce((a, b) => {
        return a + b;
      }, 0)) / medreps;

    let avgCallFreq =
      (await data.callFreq.reduce((a, b) => {
        return a + b;
      }, 0)) / medreps;

    let avgCallReach =
      (await data.callReach.reduce((a, b) => {
        return a + b;
      }, 0)) / medreps;

    res.json({
      avgCallRate: Math.round(avgCallRate),
      avgCallFreq: Math.round(avgCallFreq),
      avgCallReach: Math.round(avgCallReach)
    });
  } catch (err) {
    console.error(err);
    res.send("Server Error");
  }
});

//@route GET /api/reports/medrep/:id
//@desc  Fetch Active Medrep
//@access Private
router.get("/medrep/:id", auth, async (req, res) => {
  let valid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (valid === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });

  try {
    let medrep = await MedRepAccount.findById(req.params.id);
    if (!medrep)
      return res.status(404).json({ errors: [{ msg: "Medrep not found" }] });

    res.json(medrep);
  } catch (err) {
    console.error(err);
    res.send("Server Error");
  }
});

//@route GET /api/reports/medrep/perf/:medrepId/:month
//@desc  Fetch Active Medrep's Performance (callREach, callFreq, callRate)
//@access Private
router.get("/medrep/perf/:medrepId/:month", auth, async (req, res) => {
  let valid = mongoose.Types.ObjectId.isValid(req.params.medrepId);
  if (valid === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });
  console.log(req.params.medrepId);
  console.log(req.params.month);
  try {
    let medrep = await MedRepAccount.findById(req.params.medrepId);
    if (!medrep)
      return res.status(404).json({ errors: [{ msg: "Medrep not found" }] });

    let masterlist = await MasterList.findOne({
      medrep: req.params.medrepId,
      month: req.params.month
    });

    console.log(masterlist);
    let response = {
      callRate: masterlist ? masterlist.callRate : 0,
      callFreq: masterlist ? masterlist.callFreq : 0,
      callReach: masterlist ? masterlist.callReach : 0
    };
    console.log(response);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.send("Server Error");
  }
});

//@route GET /api/reports/medrep/mdcalls/masterlist/:medrep/:month
//@desc  Fetch masterlist
//@access Private
router.get(
  "/medrep/mdcalls/masterlist/:medrep/:month",
  auth,
  async (req, res) => {
    let validId = mongoose.Types.ObjectId.isValid(req.params.medrep);
    if (validId === false)
      return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });
    try {
      let masterlist = await MasterList.findOne({
        medrep: req.params.medrep,
        month: req.params.month
      });
      if (!masterlist) return res.send(false);

      res.json(masterlist);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

//@route GET /api/reports/medrep/mdcalls/dcrs/:masterlist
//@desc  Fetch masterlist
//@access Private
router.get("/medrep/mdcalls/dcrs/:masterlist", auth, async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params.masterlist);
  if (validId === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });

  try {
    let dcrs = await DCR.find({ masterlist: req.params.masterlist }).sort({
      date: 1
    });
    res.json(dcrs);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});
module.exports = router;
