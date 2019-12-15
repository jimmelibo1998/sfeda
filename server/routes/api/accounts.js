const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");

const auth = require("../../middleware/auth");

const AdminAccount = require("../../models/AdminAccount");
const MedRepAccount = require("../../models/MedRepAccount");
const DoctorAccount = require("../../models/DoctorAccount");
const RegularCustomer = require("../../models/RegularCustomer");

//@route POST /api/accounts/admin
//@desc  Register admin
//@access Private
router.post(
  "/admin",
  [
    auth,
    [
      check("firstName", "Firstname is required").exists(),
      check("lastName", "Lastname is required").exists(),
      check("email", "must be a valid email").isEmail(),
      check("password", "password must be atleast 6 characters long").isLength({
        min: 6
      }),
      check("role", "Admin can only be super-admin or admin").isIn([
        "super-admin",
        "admin"
      ])
    ]
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    const { firstName, lastName, email, password, role } = req.body;

    try {
      let admin = await AdminAccount.findOne({ email });
      if (admin)
        return res
          .status(400)
          .json({ errors: [{ msg: "Admin already exists" }] });

      admin = new AdminAccount({
        firstName,
        lastName,
        email,
        password,
        role
      });

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);

      await admin.save();
      res.send(admin);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

//@route POST /api/accounts/medrep
//@desc  Register medrep
//@access Private
router.post(
  "/medrep",
  [
    auth,
    [
      check("firstName", "First name is required").exists(),
      check("lastName", "Last Name is required").exists(),
      check("email", "Must be have a valid email").exists(),
      check("password", "Password must be atleast 6 characters long").isLength({
        min: 6
      }),
      check("area", "Please privide a valid area").isIn([
        "North Luzon",
        "North GMA",
        "SOUTH GMA",
        "SOUTH LUZON I",
        "SOUTH LUZON II"
      ])
    ]
  ],
  async (req, res) => {
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    const { firstName, lastName, email, password, area } = req.body;

    try {
      let medrep = await MedRepAccount.findOne({ email });
      if (medrep)
        return res
          .status(400)
          .json({ errors: [{ msg: "Medrep Account already exists" }] });

      medrep = new MedRepAccount({
        firstName,
        lastName,
        email,
        password,
        area
      });

      const salt = await bcrypt.genSalt(10);
      medrep.password = await bcrypt.hash(password, salt);

      await medrep.save();
      res.send(medrep);
    } catch (err) {
      console.error(err);
      res.send("Server Error");
    }
  }
);

//@route POST /api/accounts/doctor
//@desc  Register doctor
//@access Private
router.post(
  "/doctor",
  [
    auth,
    [
      check("lastName", "Lastname is required").exists(),
      check("firstName", "Firstname is required").exists(),
      check("email", "Must ba a valid email").isEmail(),
      check("specialityCode", "Speciality Code is required").exists(),
      check("classCode", "Class code is only A, B, or C").isIn(["A", "B", "C"])
    ]
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    const { lastName, firstName, email, specialityCode, classCode } = req.body;

    try {
      let doctor = await DoctorAccount.findOne({ email });
      if (doctor)
        return res
          .status(404)
          .json({ errors: [{ msg: "Account already exists" }] });

      doctor = new DoctorAccount({
        lastName,
        firstName,
        email,
        password: null,
        specialityCode,
        classCode
      });

      const salt = await bcrypt.genSalt(10);
      doctor.password = await bcrypt.hash(email, salt);

      await doctor.save();
      console.log("Doctor Account Created");
      res.send(doctor);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

//@route POST /api/accounts/customer
//@desc  add regular customer
//@access Private
router.post(
  "/customer",
  [
    auth,
    [
      check("firstName", "FirstName is required").exists(),
      check("lastName", "Last Name is required").exists(),
      check("contact", "Contact Number is required and must be valid")
        .exists()
        .isLength({ min: 7 }),
      check("email", "Must be a valid email")
        .if((value, { req }) => req.body.email)
        .isEmail()
    ]
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });

    const { lastName, firstName, contact } = req.body;

    try {
      let customer = await RegularCustomer.findOne({ contact });
      if (customer)
        return res
          .status(400)
          .json({ errors: [{ msg: "Customer already exists" }] });
      let email = null;

      if (req.body.email) {
        email = req.body.email;
      }

      customer = new RegularCustomer({
        lastName,
        firstName,
        contact,
        email
      });

      await customer.save();
      res.json(customer);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

module.exports = router;
