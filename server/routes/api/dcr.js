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

//@route POST /api/dcr/:masterlist
//@desc  Create DCR
//@access Private
router.post("/:masterlist", auth, async (req, res) => {
  const dateToday = moment().format("YYYY-MM-DD");

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

    let dcr = await DCR.findOne({ date: dateToday });
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

//@route POST /api/dcr/add/:id
//@desc  Add Doctor to DCR
//@access Private
router.post(
  "/add/:dcr/:id",
  [
    auth,
    [
      check(
        "inMasterlist",
        "Please specify if registered or not(true or false)"
      ).isBoolean()
    ]
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    let valid = mongoose.Types.ObjectId.isValid(req.params.dcr);
    if (valid === false)
      return res.status(400).json({ errors: [{ msg: "Invalid ObjectId" }] });

    valid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (valid === false)
      return res.status(400).json({ errors: [{ msg: "Invalid ObjectId" }] });

    try {
      let dcr = await DCR.findById(req.params.dcr);
      if (!dcr)
        return res.status(400).json({ errors: [{ msg: "DCR not found" }] });

      let dcrDoctor = await DCRDoctor.findOne({
        lastName,
        firstName,
        registered
      });

      if (dcrDoctor)
        return res
          .status(400)
          .json({ errors: [{ msg: "Doctor already in the list" }] });

      let user = await DoctorAccount.findById(req.params.id);
      if (!user) {
        user = await RegularCustomer.findById(req.params.id);
        if (!user)
          return res.status(400).json({ errors: [{ msg: "User not found" }] });
      }

      let registered = false;
      if (user.classCode) {
        registered = true;
      }

      dcrDoctor = new DCRDoctor({
        dcr: req.params.dcr,
        lastName: user.lastName,
        firstName: user.firstName,
        id: user._id,
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

//@route PUT /api/dcr/visit/:dcrdoctor
//@desc  Set DCR's doctor to visited: true
//@access Private

module.exports = router;
