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
    console.log(masterlists);
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

    let noCalls = await NoCallDays.findOne({ month: req.params.month });
    if (!noCalls)
      return res.status(404).json({ errors: [{ msg: "no calls found" }] });
    let nocallArr = await noCalls.dates.map(date => date.date);
    let numOfDays = arrayDiff(
      nocallArr,
      getAllDatesInMonth(
        new Date(req.params.month).getMonth(),
        new Date(req.params.month).getFullYear()
      )
    ).length;

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

router.get("/medreps/:area/:month/:year", auth, async (req, res) => {
  let medreps = await MedRepAccount.find({ area: req.params.area });
  let masterlisting = [];
  medreps.map(async medrep => {
    let data = [];
    let masterlist = await MasterList.find({
      medrep: req.params.medrep._id,
      month: req.params.month + " " + req.params.year
    });
    await masterlist.map(masterlist => {
      data.push(masterlist);
    });
    masterlisting.push(data);
  });
});

module.exports = router;
