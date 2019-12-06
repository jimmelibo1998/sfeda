const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Authentication Api");
});

module.exports = router;
