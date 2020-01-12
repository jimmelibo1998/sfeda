const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const MedRepAccount = require("../../models/MedRepAccount");
const nodemailer = require("nodemailer");
const generatePassword = require("password-generator");

//@route PUT /api/medreps/disable/:id
//@desc  disable account
//@access Private
router.put("/disable/:id", auth, async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (validId === false)
    return res.status(400).json({ errors: [{ msg: "Invalid ObjectId" }] });

  try {
    let medrep = await MedRepAccount.findById(req.params.id);
    if (!medrep)
      return res.status(404).json({ errors: [{ msg: "Medrep no found" }] });

    medrep.active = false;
    await medrep.save();
    const output = `
    <h3 style="color: "red"">Account disabled</h3>
    <h5>Your account has been disabled</h5>
    <p>${medrep.email}</p>
  `;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: `sfe.prebio@gmail.com`, // generated ethereal user
        pass: `sfeprebio2020` // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let emailDetails = {
      from: '"SFE.web 👻" <sfe.prebio@gmail.com>', // sender address
      to: medrep.email, // list of receivers
      subject: `Account Disabled`, // Subject line
      text: "", // plain text body
      html: output // html body
    };

    await transporter.sendMail(emailDetails, (error, info) => {
      if (error) {
        return console.log(error);
      }

      //   console.log("Message sent: %s", info.messageId);
      //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // console.log(info);
    });

    res.send("Account Disabled");
  } catch (err) {
    console.log(err.message);
    res.send("Server Error");
  }
});

//@route PUT /api/medreps/reset/:id
//@desc  reset medrep password
//@access Private
router.put("/reset/:id", auth, async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (validId === false)
    return res.status(400).json({ errors: [{ msg: "Invalid ObjectId" }] });

  let newPass = generatePassword(15, false, /\d/, "sfeda-");

  try {
    let medrep = await MedRepAccount.findById(req.params.id);
    if (!medrep)
      return res.status(404).json({ errors: [{ msg: "Medrep no found" }] });

    const salt = await bcrypt.genSalt(10);
    medrep.password = await bcrypt.hash(newPass, salt);

    await medrep.save();
    const output = `
    <h3 style="color: "red""> PASSWORD RESET</h3>
    <h5>New password:</h5>
    <p>${newPass}</p>
  `;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: `sfe.prebio@gmail.com`, // generated ethereal user
        pass: `sfeprebio2020` // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let emailDetails = {
      from: '"SFE.web 👻" <sfe.prebio@gmail.com>', // sender address
      to: medrep.email, // list of receivers
      subject: `Password Reset`, // Subject line
      text: "", // plain text body
      html: output // html body
    };

    await transporter.sendMail(emailDetails, (error, info) => {
      if (error) {
        return console.log(error);
      }

      //   console.log("Message sent: %s", info.messageId);
      //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // console.log(info);
    });
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route GET /api/medreps
//@desc  get all medreps
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    let medreps = await MedRepAccount.find({ active: true });
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
    let medreps = await MedRepAccount.find({
      area: req.params.area,
      active: true
    });
    if (!medreps) res.status(400).json({ errors: [{ msg: "No medreps" }] });

    res.json(medreps);
  } catch (err) {
    res.send(err.message);
    console.log("Server Error");
  }
});

//@route PUT /api/medreps/password/:medrep
//@desc  Change Password
//@access Private
router.put(
  "/password/:medrep",
  [
    auth,
    [
      check("old", "old password is required").exists(),
      check(
        "pass1",
        "First Password is required and must be atleast 6 characters long"
      ).isLength({
        min: 6
      }),
      check("pass2", "Second Password is required").exists()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    let validId = mongoose.Types.ObjectId.isValid(req.params.medrep);
    if (validId === false)
      return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });
    try {
      let medrep = await MedRepAccount.findById(req.params.medrep);
      if (!medrep)
        return res.status(404).json({ errors: [{ msg: "Medrep not found" }] });

      let isMatch = await bcrypt.compare(req.body.old, medrep.password);
      if (!isMatch) return res.json({ msg: "Old password is incorrect" });

      let same = req.body.pass1 === req.body.pass2 ? true : false;
      if (same === false)
        return res.json({
          msg: "Please make sure that new password are the same"
        });

      const salt = await bcrypt.genSalt(10);
      medrep.password = await bcrypt.hash(req.body.pass1, salt);

      await medrep.save();
      res.json({ msg: "Password Changed" });
    } catch (err) {
      res.send(err.message);
      console.log("Server Error");
    }
  }
);

//@route PUT /api/medreps/info/:medrep
//@desc  Change Information
//@access Private
router.put(
  "/info/:medrep",
  [
    auth,
    [
      check("firstName", "firstName is required").exists(),
      check("lastName", "lastName is required").exists(),
      check("area", "Please privide a valid area").isIn([
        "NORTH LUZON",
        "NORTH GMA",
        "SOUTH GMA",
        "SOUTH LUZON 1",
        "SOUTH LUZON 2"
      ]),
      check("email", "Email is required").isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const validId = mongoose.Types.ObjectId.isValid(req.params.medrep);
    if (validId === false)
      return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });
    const { firstName, lastName, area, email } = req.body;

    try {
      let medrep = await MedRepAccount.findById(req.params.medrep);
      if (!medrep)
        return res.status(404).json({ errors: [{ msg: "MEdrep not found" }] });

      medrep.firstName = firstName;
      medrep.lastName = lastName;
      medrep.area = area;
      medrep.email = email;

      await medrep.save();
      res.json(medrep);
    } catch (err) {
      console.error(err.message);
      res.send("Server Errors");
    }
  }
);

module.exports = router;
