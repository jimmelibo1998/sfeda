const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../../middleware/auth");

const DoctorAccount = require("../../models/DoctorAccount");

//@route GET /api/doctors
//@desc  Fetch all Doctors
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    let doctors = await DoctorAccount.find().select("-password");
    if (!doctors)
      return res.status(400).json({ errors: [{ msg: "No Doctor found" }] });

    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route GET /api/doctors/area/:area
//@desc  Fetch Doctors by Area
//@access Private
router.get("/area/:area", auth, async (req, res) => {
  try {
    let docs = await DoctorAccount.aggregate([
      {
        $match: { area: req.params.area, inMasterlist: false }
      },
      {
        $project: {
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
          email: "$email",
          specialityCode: "$specialityCode",
          classCode: "$classCode",
          institution: "$institution",
          area: "$area"
        }
      }
    ]);

    if (!docs) return console.log("No doctors found");

    res.send(docs);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route GET /api/doctors/classcode/:classcode
//@desc  Fetch Doctors by Area
//@access Private
router.get("/classcode/:classcode/:area", auth, async (req, res) => {
  try {
    let docs = await DoctorAccount.aggregate([
      {
        $match: {
          classCode: req.params.classcode,
          area: req.params.area,
          inMasterlist: false
        }
      },
      {
        $project: {
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
          email: "$email",
          specialityCode: "$specialityCode",
          classCode: "$classCode",
          institution: "$institution",
          area: "$area"
        }
      }
    ]);

    if (!docs) return console.log("No doctors found");

    res.send(docs);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route GET /api/doctors/:doctor
//@desc  Fetch a doctor
//@access Private
router.get("/:doctor", auth, async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.doctor);
  if (isValid === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId not valid" }] });
  try {
    let doctors = await DoctorAccount.findById(req.params.doctor).select(
      "-password"
    );

    if (!doctors)
      return res.status(400).json({ errors: [{ msg: "No doctor found" }] });

    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

module.exports = router;
