const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const MasterList = require("../../models/MasterList");
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
// router.post("/add/:masterlist/:doctor", async (req, res) => {

// });
module.exports = router;
