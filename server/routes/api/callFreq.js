const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Call Frequency Api");
});

module.exports = router;
