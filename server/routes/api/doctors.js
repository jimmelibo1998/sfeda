const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const DoctorAccount = require("../../models/DoctorAccount");

//@route GET /api/doctors/:area
//@desc  Fetch all Doctors
//@access Private
router.get("/:area", auth, async (req, res) => {
  try {
    let doctors = await DoctorAccount.find({ area: req.params.area })
      .select("-password")
      .sort({ classCode: 1 });

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

//@route GET /api/doctors/current/:doctor
//@desc  Fetch a doctor
//@access Private
router.get("/current/:doctor", auth, async (req, res) => {
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

//@route PUT /api/doctors/update/:doctor
//@desc  Update A Doctor
//@access Private
router.put(
  "/update/:doctor",
  [
    auth,
    [
      check("lastName", "Lastname is required").exists(),
      check("firstName", "Firstname is required").exists(),
      check("specialityCode", "Speciality Code is required").exists(),
      check("classCode", "Class code is only A, B, or C").isIn(["A", "B", "C"]),
      check("area", "Please privide a valid area").isIn([
        "NORTH LUZON",
        "NORTH GMA",
        "SOUTH GMA",
        "SOUTH LUZON 1",
        "SOUTH LUZON 2"
      ]),
      check("institution", "Institution is required is required").exists()
    ]
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    const {
      institution,
      lastName,
      firstName,
      area,
      specialityCode,
      classCode
    } = req.body;
    try {
      let doctor = await DoctorAccount.findById(req.params.doctor);
      if (!doctor)
        return res.status(404).json({ errors: [{ msg: "doctor not found" }] });
      doctor.lastName = lastName;
      doctor.firstName = firstName;
      doctor.specialityCode = specialityCode;
      doctor.classCode = classCode;
      doctor.institution = institution;
      doctor.area = area;

      await doctor.save();
      res.json(doctor);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

module.exports = router;
