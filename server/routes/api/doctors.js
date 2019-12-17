const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../../middleware/auth");

const DoctorAccount = require("../../models/DoctorAccount");

//@route GET /api/doctors/:doctor
//@desc  Register admin
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
