const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Accounts API");
});

module.exports = router;
