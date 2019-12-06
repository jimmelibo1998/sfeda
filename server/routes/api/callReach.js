const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Call Reach Api");
});

module.exports = router;
