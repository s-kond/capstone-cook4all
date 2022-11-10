const express = require("express");

const router = express.Router();

router.get("/:username", async (req, res) => {
  res.json({ msg: "GET the guestList from a user" });
});

module.exports = router;
