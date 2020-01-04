const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const moment = require("moment");

const auth = require("../../middleware/auth");

const DCR = require("../../models/DCR");
const DCRDoctor = require("../../models/DCRDoctor");
const MasterList = require("../../models/MasterList");
const MdCalls = require("../../models/MdCalls");
const MdCallsScore = require("../../models/MdCallsScore");
const DoctorAccount = require("../../models/DoctorAccount");
const RegularCustomer = require("../../models/RegularCustomer");
const MedRepAccount = require("../../models/MedRepAccount");

//@route POST /api/dcr/:masterlist/:date
//@desc  Create DCR
//@access Private
router.post("/:masterlist/:date", auth, async (req, res) => {
  const date = moment(req.params.date).format("YYYY-MM-DD");

  const valid = mongoose.Types.ObjectId.isValid(req.params.masterlist);
  if (valid === false)
    return res
      .status(400)
      .json({ errors: [{ msg: "Invalid ObjectId1wqeqweqweq" }] });

  try {
    let masterlist = await MasterList.findById(req.params.masterlist);
    if (!masterlist)
      return res
        .status(400)
        .json({ errors: [{ msg: "Masterlist not found" }] });

    if (masterlist.sent === false)
      return res.status(400).json({ errors: [{ msg: "Masterlist not sent" }] });

    let dcr = await DCR.findOne({
      date: date,
      masterlist: req.params.masterlist
    });
    if (dcr)
      return res.status(400).json({ errors: [{ msg: "Already have a dcr" }] });

    dcr = new DCR({
      masterlist: req.params.masterlist,
      date: date,
      medrep: masterlist.medrep
    });
    await dcr.save();
    res.json(dcr);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route GET /api/dcr/:masterlist
//@desc  Fetch All DCRS in the masterlist
//@access Private
router.get("/:masterlist", auth, async (req, res) => {
  let isValid = mongoose.Types.ObjectId.isValid(req.params.masterlist);
  if (isValid === false)
    return res.status(400).json({ errors: [{ msg: "Object Id not valid" }] });

  try {
    let dcrs = await DCR.find({ masterlist: req.params.masterlist });
    if (!dcrs) res.send("NO DCRS IN MASTERLIST");

    res.json(dcrs);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route DELETE /api/dcr/remove/doctor/:dcrDoctorId
//@desc  Remove Doctor from DCR
//@access Private
router.delete(`/remove/doctor/:dcrDoctorId`, auth, async (req, res) => {
  const valid = mongoose.Types.ObjectId.isValid(req.params.dcrDoctorId);
  if (valid === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });

  try {
    let dcrDoctor = await DCRDoctor.findByIdAndRemove(req.params.dcrDoctorId);
    res.json(dcrDoctor);
    // let dcrDoctor = await DCRDoctor.findByIdAndRemove(
    //   req.params.dcrDoctorId,
    //   (err, doc) => {
    //     if (err) throw err;
    //     res.json(doc);
    //   }
    // );
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route POST /api/dcr/insert/doctor/:dcrId
//@desc  Add Doctor to DCR
//@access Private
router.post(
  "/insert/doctor/:dcr",
  [
    auth,
    [
      check("lastName", "lastName is required").exists(),
      check("firstName", "firstName is required").exists(),
      check(
        "inMasterlist",
        "Please specify if registered or not(true or false)"
      ).isBoolean(),
      check("contact", "Input a valid email").exists()
    ]
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });
    let valid = mongoose.Types.ObjectId.isValid(req.params.dcr);
    if (valid === false)
      return res.status(400).json({ errors: [{ msg: "Invalid ObjectId2" }] });

    try {
      let dcr = await DCR.findById(req.params.dcr);
      if (!dcr)
        return res.status(400).json({ errors: [{ msg: "DCR not found" }] });

      let dcrDoctor = await DCRDoctor.findOne({
        contact: req.body.email
      });

      if (dcrDoctor)
        return res
          .status(400)
          .json({ errors: [{ msg: "Doctor already in the list" }] });

      dcrDoctor = new DCRDoctor({
        dcr: req.params.dcr,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        inMasterlist: req.body.inMasterlist,
        contact: req.body.contact,
        classCode: req.body.classCode ? req.body.classCode : "",
        doctorId: req.body.doctorId ? req.body.doctorId : ""
      });

      await dcrDoctor.save();
      res.json(dcrDoctor);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

//@route PUT /api/dcr/doctors/count/:dcrId/:inMasterlist
//@desc  Count dcr doctors with inMasterlist and update dcr details
//@access Private
router.put("/doctors/count/:dcrId/:inMasterlist", auth, async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params.dcrId);
  if (validId === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });

  try {
    let dcr = await DCR.findById(req.params.dcrId);
    if (!dcr)
      return res.status(400).json({ errors: [{ msg: "DCR not found" }] });

    let count = await DCRDoctor.find({
      inMasterlist: req.params.inMasterlist,
      dcr: req.params.dcrId
    }).countDocuments();
    let inMasterlist = req.params.inMasterlist === "true" ? true : false;
    if (inMasterlist === true) {
      dcr.registeredDoctors = count;
    } else if (inMasterlist === false) {
      dcr.regularCustomers = count;
    }

    await dcr.save();
    res.json(dcr);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//1
//@route PUT /api/dcr/doctors/visited/:dcrDoctorId
//@desc  Update Visited in DCR Doctor[visited]
//@access Private
router.put(
  "/doctors/visited/:dcrDoctorId",
  [auth, [check("visited", "visited is required").isBoolean()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const validId = mongoose.Types.ObjectId.isValid(req.params.dcrDoctorId);
    if (validId === false)
      return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });

    try {
      let dcrDoctor = await DCRDoctor.findById(req.params.dcrDoctorId);
      if (!dcrDoctor)
        return res
          .status(400)
          .json({ errors: [{ msg: "DCR Doctor not found" }] });

      let visitedValue = req.body.visited === true ? false : true;

      dcrDoctor.visited = visitedValue;
      await dcrDoctor.save();
      res.json(dcrDoctor);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

//2
//@route PUT /api/dcr/totalvisits/totalpoints/:dcrId
//@desc COUNT Visited doctors in DCR and Update TotalVisits / TotalPoints
//@access Private
router.put("/totalvisits/totalpoints/:dcrId", auth, async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params.dcrId);
  if (validId === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });

  try {
    let dcr = await DCR.findById(req.params.dcrId);
    if (!dcr)
      return res.status(400).json({ errors: [{ msg: "DCR no found" }] });
    let countVisited = await DCRDoctor.find({
      dcr: req.params.dcrId,
      visited: true
    }).countDocuments();
    let countInMasterlistVisited = await DCRDoctor.find({
      dcr: req.params.dcrId,
      visited: true,
      inMasterlist: true
    }).countDocuments();

    let countNotInMasterlistVisited = await DCRDoctor.find({
      dcr: req.params.dcrId,
      visited: true,
      inMasterlist: false
    }).countDocuments();

    dcr.totalVisits = countVisited;
    dcr.totalPoints =
      0.5 * countNotInMasterlistVisited + countInMasterlistVisited;

    await dcr.save();
    res.json(dcr);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route GET /api/dcr/detail/:dcrId
//@desc  Fetch 1 DCR with Id
//@access Private
router.get("/detail/:dcrId", auth, async (req, res) => {
  try {
    let dcr = await DCR.findById(req.params.dcrId);
    if (!dcr)
      return res.status(400).json({ errors: [{ msg: "No Dcr found" }] });

    res.json(dcr);
  } catch (err) {
    console.log(err.message);
    res.send("Server Error");
  }
});

//@route GET /api/dcr/doctors/:dcrId
//@desc  Fetch DCR Doctors
//@access Private
router.get("/doctors/:dcrId", auth, async (req, res) => {
  let isValid = mongoose.Types.ObjectId.isValid(req.params.dcrId);
  if (isValid === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId not valid" }] });
  try {
    let doctors = await DCRDoctor.find({ dcr: req.params.dcrId });
    if (!doctors) res.send("No Doctors in DCR");

    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route PUT /api/dcr/nocover/add/:dcrId
//@desc  Set noCover = true of DCR
//@access Private
router.put("/nocover/add/:dcrId", auth, async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params.dcrId);
  if (validId === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });

  try {
    let dcr = await DCR.findById(req.params.dcrId);
    if (!dcr)
      return res.status(404).json({ errors: [{ msg: "DCR no found" }] });

    dcr.noCover = true;
    dcr.reason = req.body.reason ? req.body.reason : "";
    dcr.ack = false;
    await dcr.save();
    res.json(dcr);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route GET /api/dcr/nocover/fetch
//@desc  Fetch All No Covers
//@access Private
router.get("/nocover/fetch", auth, async (req, res) => {
  try {
    let dcrs = await DCR.find({ noCover: true, ack: false });
    console.log(dcrs);
    res.json(dcrs);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route GET /api/dcr/nocover/medrep/:masterlistId
//@desc  Get medrep data for no covers using masterlistId
//@access Private
router.get("/nocover/medrep/:masterlistId", auth, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params.masterlistId);
  if (validId === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });

  try {
    let masterlist = await MasterList.findById(req.params.masterlistId);
    if (!masterlist)
      return res
        .status(404)
        .json({ errors: [{ msg: "masterlist not found" }] });

    let medrep = await MedRepAccount.findById(masterlist.medrep);
    if (!medrep)
      return res.status(404).json({ errors: [{ msg: "Medrep not found" }] });

    res.json(medrep);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route PUT /api/dcr/nocover/respond/:dcrId/:masterlistId
//@desc  Set accept = true/false ,ack = true and additionalScore(masterlist) += 15 [accepted = true/false]
//@access Private
router.put(
  "/nocover/respond/:dcrId/:masterlistId",
  [auth, check("accepted", "accepted is required").isBoolean()],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    let validDcr = mongoose.Types.ObjectId.isValid(req.params.dcrId);
    let validMasterlist = mongoose.Types.ObjectId.isValid(
      req.params.masterlistId
    );
    if (validDcr === false || validMasterlist === false)
      return res.status(400).json({ errors: [{ msg: "Invalid Object Id33" }] });
    try {
      let dcr = await DCR.findById(req.params.dcrId);
      if (!dcr)
        return res.status(404).json({ errors: [{ msg: "DCR not found" }] });

      dcr.accepted = req.body.accepted;
      dcr.ack = true;

      let masterlist = await MasterList.findById(req.params.masterlistId);
      if (!masterlist)
        return res
          .status(404)
          .json({ errors: [{ msg: "Masterlist not found" }] });

      let additional = req.body.accepted === true ? 15 : 0;
      masterlist.additionalScore += additional;

      await masterlist.save();
      await dcr.save();
      res.send("No cover accepted");
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

module.exports = router;
