const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const moment = require("moment");

const MasterList = require("../../models/MasterList");
const DoctorAccount = require("../../models/DoctorAccount");
const MedRepAccount = require("../../models/MedRepAccount");
const MasterListDoctor = require("../../models/MasterListDoctor");
const NoCallDays = require("../../models/NoCallDays");

const auth = require("../../middleware/auth");

const getAllDatesInMonth = require("../../functions/getAllDatesInMonth");
const arrayDiff = require("../../functions/arrayDiff");

//@route POST /api/masterlist/:medrep
//@desc  Add MasterList
//@access Private
router.post(
  "/:medrep",
  [auth, [check("date", "Date is required").exists()]],
  async (req, res) => {
    let d = new Date();
    let errors = validationResult(req);
    if (!errors.isEmpty())
      return req.status(400).json({ errors: errors.array() });

    //check if object id is valid
    const valid = mongoose.Types.ObjectId.isValid(req.params.medrep);
    if (valid === false)
      return res.status(400).json({ errors: [{ msg: "Invalid ObjectId3" }] });
    let monthYear = moment(req.body.date).format("MMMM YYYY");
    let inputDate = moment(req.body.date).format("YYYY-MM-DD");
    try {
      let nocalldays = await NoCallDays.findOne({
        month: monthYear
      });

      if (!nocalldays)
        return res
          .status(400)
          .json({ errors: [{ msg: "No Call Days not set" }] });

      const medrepExists = await MedRepAccount.findById(req.params.medrep);
      if (!medrepExists)
        return res
          .status(400)
          .json({ errors: [{ msg: "Medrep doesn't exist" }] });

      let masterlist = await MasterList.findOne({
        month: monthYear,
        medrep: req.params.medrep
      });

      if (masterlist)
        return res.status(400).json({
          errors: [{ msg: "Already have a masterlist for the current month" }]
        });

      let datesInMonth = getAllDatesInMonth(
        new Date(inputDate).getMonth(),
        new Date(inputDate).getFullYear()
      );

      let datesExcluded = nocalldays.dates.map(date => date.date);

      let goalScore = arrayDiff(datesInMonth, datesExcluded).length * 15;
      masterlist = new MasterList({
        medrep: req.params.medrep,
        month: monthYear,
        goalScore
      });

      await masterlist.save();

      res.json(masterlist);
    } catch (err) {
      console.error(err);
      res.send("Server error");
    }
  }
);

//@route POST /api/masterlist/add/:masterlist/:doctor
//@desc  Add Doctor to masterlist
//@access Private
router.post("/add/:masterlist/:doctor", auth, async (req, res) => {
  const { masterlist, doctor } = req.params;
  //check if object id is valid
  const validMasterlist = mongoose.Types.ObjectId.isValid(masterlist);
  if (validMasterlist === false)
    return res.status(400).json({ errors: [{ msg: "Invalid ObjectId4" }] });

  const validDoctor = mongoose.Types.ObjectId.isValid(doctor);
  if (validDoctor === false)
    return res.status(400).json({ errors: [{ msg: "Invalid ObjectId5" }] });

  try {
    let doc = await DoctorAccount.findById(doctor);
    if (!doc)
      return res.status(400).json({ errors: [{ msg: "Doctor not found" }] });

    let mlist = await MasterList.findById(masterlist);
    if (!mlist)
      return res
        .status(400)
        .json({ errors: [{ msg: "Master List not found" }] });

    let listdoctor = await MasterListDoctor.findOne({ masterlist, doctor });
    if (listdoctor)
      return res
        .status(400)
        .json({ errors: [{ msg: "Doctor already in the masterlist" }] });
    listdoctor = new MasterListDoctor({
      masterlist,
      doctor
    });

    listdoctor.save();

    doc.inMasterlist = true;
    await doc.save();
    res.json(listdoctor);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route POST /api/masterlist/delete/:masterlist/:doctor
//@desc  Rmove Doctor in masterlist
//@access Private
router.delete("/delete/:masterlist/:doctor", auth, async (req, res) => {
  const validMasterlist = mongoose.Types.ObjectId.isValid(
    req.params.masterlist
  );
  if (validMasterlist === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId not valid" }] });

  const validDoctor = mongoose.Types.ObjectId.isValid(req.params.doctor);
  if (validDoctor === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId not valid" }] });

  try {
    let masterlistdoctor = await MasterListDoctor.findOne({
      masterlist: req.params.masterlist,
      doctor: req.params.doctor
    });

    if (!masterlistdoctor)
      return res.status(400).json({ errors: [{ msg: "No doctor to delete" }] });

    let doc = await DoctorAccount.findById(req.params.doctor);
    if (!doc)
      return res.status(400).json({ errors: [{ msg: "Doctor not found" }] });

    masterlistdoctor = await MasterListDoctor.findOneAndDelete({
      masterlist: req.params.masterlist,
      doctor: req.params.doctor
    });

    doc.inMasterlist = false;
    doc.save();
    console.log("Doctor removed from masterlist");
    res.send(masterlistdoctor);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route POST /api/masterlist/send/:id
//@desc  Send masterlist
//@access Private
router.put("/send/:id", auth, async (req, res) => {
  const { id } = req.params;

  const validId = mongoose.Types.ObjectId.isValid(id);
  if (validId === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId not valid" }] });

  try {
    let masterlist = await MasterList.findById(id);
    if (!masterlist)
      return res
        .status(400)
        .json({ errors: [{ msg: "Masterlist not found" }] });

    masterlist = await MasterList.findOneAndUpdate(
      { _id: id },
      { $set: { sent: true } },
      { new: true },
      (err, doc) => {
        if (err) throw errl;
        return doc;
      }
    );
    res.json(masterlist);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route GET/api/masterlist/:medrep
//@desc  Fetch Current Masterlist
//@access Private
router.get("/:medrep", auth, async (req, res) => {
  let isValid = mongoose.Types.ObjectId.isValid(req.params.medrep);
  if (isValid === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId not valid" }] });

  let monthYear = moment().format("MMMM YYYY");
  try {
    let masterlist = await MasterList.findOne({
      month: monthYear,
      medrep: req.params.medrep
    });
    if (!masterlist)
      return res
        .status(400)
        .json({ errors: [{ msg: "Masterlist not found" }] });

    res.json(masterlist);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route GET/api/masterlist/doctors/:masterlist
//@desc  Get Masterlist Doctors
//@access Private
router.get("/doctors/:masterlist", auth, async (req, res) => {
  try {
    let masterlistdoctors = await MasterListDoctor.find({
      masterlist: req.params.masterlist
    });
    if (!masterlistdoctors)
      return res
        .status(400)
        .json({ errors: [{ msg: "No doctors in masterlist" }] });

    res.json(masterlistdoctors);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route PUT /api/masterlist/goalscore/:score
//@desc  Update Goal Scores
//@access Private
router.put(
  "/goalscore/:score",
  [auth, [check("month", "Date is required").exists()]],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    try {
      let masterlist = await MasterList.updateMany(
        { month: req.body.month },
        { goalScore: req.params.score }
      );
      console.log(res.n + " " + res.nModified);
      await masterlist.save();
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

module.exports = router;
