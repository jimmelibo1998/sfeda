const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const MasterList = require("../../models/MasterList");
const DoctorAccount = require("../../models/DoctorAccount");
const MedRepAccount = require("../../models/MedRepAccount");
const MasterListDoctor = require("../../models/MasterListDoctor");

//@route POST /api/masterlist/:medrep
//@desc  Add MasterList
//@access Private
router.post("/:medrep", async (req, res) => {
  const d = new Date();
  let monthYear = d.getMonth().toString() + "-" + d.getFullYear().toString();
  try {
    //check if object id is valid
    const valid = mongoose.Types.ObjectId.isValid(req.params.medrep);
    if (valid === false)
      return res.status(400).json({ errors: [{ msg: "Invalid ObjectId" }] });

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

    masterlist = new MasterList({
      medrep: req.params.medrep
    });

    await masterlist.save();

    res.json(masterlist);
  } catch (err) {
    console.error(err.message);
    res.send("Server error");
  }
});

//@route POST /api/masterlist/add/:masterlist/:doctor
//@desc  Add Doctor to masterlist
//@access Private
router.post("/add/:masterlist/:doctor", async (req, res) => {
  const { masterlist, doctor } = req.params;
  //check if object id is valid
  const validMasterlist = mongoose.Types.ObjectId.isValid(masterlist);
  if (validMasterlist === false)
    return res.status(400).json({ errors: [{ msg: "Invalid ObjectId" }] });

  const validDoctor = mongoose.Types.ObjectId.isValid(doctor);
  if (validDoctor === false)
    return res.status(400).json({ errors: [{ msg: "Invalid ObjectId" }] });

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
    res.json(listdoctor);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route POST /api/masterlist/send/:id
//@desc  Send masterlist
//@access Private
router.put("/send/:id", async (req, res) => {
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
module.exports = router;
