const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const weekOfMonth = require("../../functions/weekOfMonth");

const MasterList = require("../../models/MasterList");
const DoctorAccount = require("../../models/DoctorAccount");
const MedRepAccount = require("../../models/MedRepAccount");
const MasterListDoctor = require("../../models/MasterListDoctor");
const NoCallDays = require("../../models/NoCallDays");
const DCR = require("../../models/DCR");

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
        .status(404)
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
      let ress = await MasterList.updateMany(
        { month: req.body.month },
        { goalScore: req.params.score }
      );
      console.log(ress.n + " " + ress.nModified);
      console.log(ress);
      res.json(ress);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);
//4
//@route PUT /api/masterlist/doctors/week/:masterlistId/:doctorId
//@desc  update doctor in masterlist and total all week's score [dcrDate (weekNumber)]
//@access Private
router.put(
  "/doctors/week/:masterlistId/:doctorId",
  [
    auth,
    [
      check("date", "Date is required").exists(),
      check("visited", "visited is required and must be boolean").isBoolean()
    ]
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const validMasterlist = mongoose.Types.ObjectId.isValid(
      req.params.masterlistId
    );
    if (validMasterlist === false)
      return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });

    const validDoctor = mongoose.Types.ObjectId.isValid(req.params.doctorId);
    if (validDoctor === false)
      return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });

    try {
      let doctor = await MasterListDoctor.findOne({
        masterlist: req.params.masterlistId,
        doctor: req.params.doctorId
      });
      if (!doctor)
        return res
          .status(400)
          .json({ errors: [{ msg: "Masterlist Doctor Not Found" }] });

      let weekNumber = weekOfMonth(moment(req.body.date));
      console.log(weekNumber);
      if (req.body.visited === false) {
        if (weekNumber === 1) {
          if (!doctor.weekOne.dates.includes(req.body.date)) {
            let arr = arrayDiff(doctor.weekOne.dates, [req.body.date]);
            doctor.weekOne.dates = arr;
            await doctor.save();
            doctor.weekOne.score = doctor.weekOne.dates.length;
            await doctor.save();
          }
        }

        if (weekNumber === 2) {
          if (!doctor.weekTwo.dates.includes(req.body.date)) {
            let arr = arrayDiff(doctor.weekTwo.dates, [req.body.date]);
            doctor.weekTwo.dates = arr;
            await doctor.save();
            doctor.weekTwo.score = doctor.weekTwo.dates.length;
            await doctor.save();
          }
        }

        if (weekNumber === 3) {
          if (!doctor.weekThree.dates.includes(req.body.date)) {
            let arr = arrayDiff(doctor.weekThree.dates, [req.body.date]);
            doctor.weekThree.dates = arr;
            await doctor.save();
            doctor.weekThree.score = doctor.weekThree.dates.length;
            await doctor.save();
          }
        }

        if (weekNumber === 4) {
          if (!doctor.weekFour.dates.includes(req.body.date)) {
            let arr = await arrayDiff(doctor.weekFour.dates, [
              moment(req.body.date).format("YYYY-MM-DD")
            ]);
            console.log(arr);
            doctor.weekFour.dates = arr;
            doctor.weekFour.score = doctor.weekFour.dates.length;
            await doctor.save();
          }
        }
      }
      if (req.body.visited === true) {
        console.log(weekNumber);
        if (weekNumber === 1) {
          let arr = doctor.weekOne.dates.filter(
            date => date !== moment(req.body.date).format("YYYY-MM-DD")
          );
          doctor.weekOne.dates = arr;
          doctor.weekOne.score = doctor.weekOne.dates.length;
          await doctor.save();
        }

        if (weekNumber === 2) {
          let arr = doctor.weekTwo.dates.filter(
            date => date !== moment(req.body.date).format("YYYY-MM-DD")
          );
          doctor.weekTwo.dates = arr;
          doctor.weekTwo.score = doctor.weekTwo.dates.length;
          await doctor.save();
        }

        if (weekNumber === 3) {
          let arr = doctor.weekThree.dates.filter(
            date => date !== moment(req.body.date).format("YYYY-MM-DD")
          );
          doctor.weekThree.dates = arr;
          doctor.weekThree.score = doctor.weekThree.dates.length;
          await doctor.save();
        }

        if (weekNumber === 4) {
          let arr = doctor.weekFour.dates.filter(
            date => date !== moment(req.body.date).format("YYYY-MM-DD")
          );
          console.log(arr);
          doctor.weekFour.dates = arr;
          await doctor.save();
          doctor.weekFour.score = doctor.weekFour.dates.length;
          await doctor.save();
        }
      }

      doctor.total =
        doctor.weekOne.score +
        doctor.weekTwo.score +
        doctor.weekThree.score +
        doctor.weekFour.score;
      await doctor.save();
      res.json(doctor);
    } catch (err) {
      console.log(err.message);
      res.send("Server Error");
    }
  }
);

//5
//@route PUT /api/masterlist/currentscore/:masterlistId
//@desc GEt and update currentScore of masterlist
//@access Private
router.put(`/currentscore/:masterlistId`, auth, async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params.masterlistId);
  if (validId === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });

  try {
    let masterlist = await MasterList.findById(req.params.masterlistId);
    if (!masterlist)
      return res.status(400).json({ errors: [{ msg: "No masterlist found" }] });

    let dcrs = await DCR.find({ masterlist: req.params.masterlistId }).select(
      "totalPoints"
    );
    if (!dcrs) return res.send("No DCRs found in masterlist");

    let total = 0;
    dcrs.map(dcr => (total += dcr.totalPoints));

    masterlist.currentScore = total;
    masterlist.callRate = Number(
      ((masterlist.currentScore / masterlist.goalScore) * 100).toFixed(2)
    );
    await masterlist.save();
    res.send(masterlist);
  } catch (err) {
    console.log(err.message);
    res.send("Server Error");
  }
});

//7
//@route PUT /api/masterlist/callfreq/:masterlistId
//@desc  Update Call Freq
//@access Private

//9
//@route PUT /api/masterlist/callReach/:masterlistId
//@desc  Update Call Reach
//@access Private

module.exports = router;
