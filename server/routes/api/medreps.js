const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const MedRepAccount = require("../../models/MedRepAccount");

//@route GET /api/medreps
//@desc  get all medreps
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    let medreps = await MedRepAccount.find();
    if (!medreps)
      return res.status(400).json({ errors: [{ msg: "No medreps fetched" }] });

    res.json(medreps);
  } catch (err) {
    res.send(err.message);
    console.log("Server Error");
  }
});

//@route GET /api/medreps/:area
//@desc  get medreps by area
//@access Private
router.get("/:area", auth, async (req, res) => {
  try {
    let medreps = await MedRepAccount.find({ area: req.params.area });
    if (!medreps) res.status(400).json({ errors: [{ msg: "No medreps" }] });

    res.json(medreps);
  } catch (err) {
    res.send(err.message);
    console.log("Server Error");
  }
});

module.exports = router;
