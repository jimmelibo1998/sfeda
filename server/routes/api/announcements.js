const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const nodemailer = require("nodemailer");
const moment = require("moment");
const mongoose = require("mongoose");

const Announcement = require("../../models/Announcement");
const MedRepAccount = require("../../models/MedRepAccount");

//@route GET/api/announcements/area/:area
//@desc  FETCH ANNOUNCEMENTS BY ID
//@access Private
router.get("/area/:area", async (req, res) => {
  try {
    let announcements = await Announcement.find({
      $or: [{ area: "All" }, { area: req.params.area }],
      postponed: false
    });
    res.json(announcements);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route PUT /api/announcements
//@desc  Postpone announcement
//@access Private
router.put("/:id", async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (validId === false)
    return res.status(400).json({ errors: [{ msg: "ObjectId Invalid" }] });
  try {
    let ann = await Announcement.findById(req.params.id);
    if (!ann)
      return res
        .status(404)
        .json({ errors: [{ msg: "Announcement not found" }] });

    let medreps;
    if (ann.area !== "All") {
      medreps = await MedRepAccount.find({ area: ann.area });
    } else {
      medreps = await MedRepAccount.find();
    }

    if (!medreps)
      return res.status(404).json({ errors: [{ msg: "No Medreps Found" }] });

    let emails = medreps.map(medrep => medrep.email);

    const output = `
        <h3 style="color: "red""> ANNOUNCEMENT POSTPONED</h3>
        <h3>${ann.title}</h3>
        <p>${ann.desc}</p>
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
    emails.map(async email => {
      let emailDetails = {
        from: '"SFE.web 👻" <kmc.jimmel@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `Announcement`, // Subject line
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
    });

    ann.postponed = true;
    await ann.save();
    res.json(ann);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route GET /api/announcements
//@desc  Fetch all announcements
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    let announcements = await Announcement.find({ postponed: false });
    res.json(announcements);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route POST /api/announcements
//@desc  Add announcement
//@access Private
router.post(
  "/:area",
  [
    auth,
    [
      check("title", "title is required").exists(),
      check("start", "start is required").exists(),
      check("end", "end is required").exists(),
      check("desc", "desc is required").exists()
    ]
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      let announcement = new Announcement({
        area: req.params.area,
        start: req.body.start,
        end: req.body.end,
        title: req.body.title,
        desc: req.body.desc
      });

      await announcement.save();
      let medreps;
      if (req.params.area !== "All") {
        medreps = await MedRepAccount.find({ area: req.params.area });
      } else {
        medreps = await MedRepAccount.find();
      }

      if (!medreps)
        return res.status(404).json({ errors: [{ msg: "No Medreps Found" }] });

      let emails = medreps.map(medrep => medrep.email);

      const output = `
      <h3 style="color: "green""> NEW ANNOUNCEMENT </h3>
      <ul>
          <li>Area: ${req.params.area}</li>
          <li>Start: ${req.body.start}</li>
          <li>End: ${req.body.end}</li>
      </ul>
      <h3>${req.body.title}</h3>
      <p>${req.body.desc}</p>
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
      emails.map(async email => {
        let emailDetails = {
          from: '"SFE.web 👻" <kmc.jimmel@gmail.com>', // sender address
          to: email, // list of receivers
          subject: `Announcement`, // Subject line
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
      });

      res.json(announcement);
    } catch (err) {
      console.log(err.message);
      res.send("Server Error");
    }
  }
);

module.exports = router;
