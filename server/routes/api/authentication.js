const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Admin = require("../../models/AdminAccount");
const MedRepAccount = require("../../models/MedRepAccount");
const DoctorAccount = require("../../models/DoctorAccount");

//@route GET /api/auth
//@desc  Get currently logged in Admin or user
//@access Private
router.get("/", auth, async (req, res) => {
  if (req.user.role === "admin" || req.user.role === "super-admin") {
    let user = await Admin.findById(req.user.id).select("-password");
    if (!user)
      return res.status(400).json({ errors: [{ msg: "user not found" }] });
    res.json(user);
  } else if (req.user.role === "medrep") {
    let user = await MedRepAccount.findById(req.user.id).select("-password");
    if (!user)
      return res.status(400).json({ errors: [{ msg: "user not found" }] });
    res.json(user);
  }
});

//@route POST /api/auth
//@desc  Login MedRep and Admin
//@access Public
router.post(
  "/",
  [
    check("email", "Must enter a valid email").isEmail(),
    check("password", "Password is required")
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });

      if (admin) {
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch)
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });

        const payload = {
          user: {
            id: admin._id,
            role: admin.role
          }
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );

        return;
      }

      let medrep = await MedRepAccount.findOne({ email, active: true });

      if (medrep) {
        const isMatch = await bcrypt.compare(password, medrep.password);

        if (!isMatch)
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });

        const payload = {
          user: {
            id: medrep._id,
            role: "medrep"
          }
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );

        return;
      }

      res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

//@route POST /api/auth/doctor
//@desc  Login Doctor
//@access Public
router.post(
  "/doctor",
  [
    check("email", "It must be a valid email").isEmail(),
    check("pasword", "password is required").exists()
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    const { email, password } = req.body;

    try {
      let doctor = await DoctorAccount.findOne({ email });
      if (!doctor)
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid Credentials" }] });

      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ erros: [{ msg: "Invalid Credentials" }] });

      const payload = {
        user: {
          id: doctor._id,
          role: "doctor"
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

module.exports = router;
