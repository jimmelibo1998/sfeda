const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const DCR = require("../../models/DCR");
const DCRDoctor = require("../../models/DCRDoctor");
const MasterList = require("../../models/MasterList");

//@route POST /api/dcr/:masterlist
//@desc  Create DCR
//@access Private
router.post("/:masterlist", async (req, res) => {
  const d = new Date();

  const dateToday =
    (d.getMonth() + 1).toString() +
    "/" +
    d.getDate().toString() +
    "/" +
    d.getFullYear().toString();

  const valid = mongoose.Types.ObjectId.isValid(req.params.masterlist);
  if (valid === false)
    return res.status(400).json({ errors: [{ msg: "Invalid ObjectId" }] });

  try {
    let masterlist = await MasterList.findById(req.params.masterlist);
    if (!masterlist)
      return res
        .status(400)
        .json({ errors: [{ msg: "Masterlist not found" }] });

    if (masterlist.sent === false)
      return res.status(400).json({ errors: [{ msg: "Masterlist not sent" }] });

    let dcr = await DCR.findOne({ dateId: dateToday });
    if (dcr)
      return res
        .status(400)
        .json({ errors: [{ msg: "Already have a dcr for today" }] });

    dcr = new DCR({});
    await dcr.save();
    res.json(dcr);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route POST /api/dcr/add/:dcr
//@desc  Add Doctor to DCR
//@access Private
router.post(
  "/add/:dcr",
  [
    check("lastName", "Last Name is required").exists(),
    check("firstName", "First Name is required").exists(),
    check(
      "registered",
      "Please specify if registered or not(true or false)"
    ).isBoolean()
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    const valid = mongoose.Types.ObjectId.isValid(req.params.dcr);
    if (valid === false)
      return res.status(400).json({ errors: [{ msg: "Invalid ObjectId" }] });

    try {
      let dcr = await DCR.findById(req.params.dcr);
      if (!dcr)
        return res.status(400).json({ errors: [{ msg: "DCR not found" }] });

      const { lastName, firstName, registered } = req.body;
      let dcrDoctor = await DCRDoctor.findOne({
        lastName,
        firstName,
        registered
      });
      if (dcrDoctor)
        return res
          .status(400)
          .json({ errors: [{ msg: "Doctor already in the list" }] });

      dcrDoctor = new DCRDoctor({
        dcr: req.params.dcr,
        lastName,
        firstName,
        registered
      });

      await dcrDoctor.save();
      res.json(dcrDoctor);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

module.exports = router;
