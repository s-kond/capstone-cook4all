const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/UserModel");

const router = express.Router();

router.get("/all", async (req, res) => {
  const userData = await User.find({});

  if (!userData) {
    return res.status(404).json({ error: "Cannot find any users." });
  }
  res.status(200).json(userData);
});

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const userData = await User.find({ name: username });
  if (!userData) {
    return res.status(404).json({ error: "No such user." });
  }
  res.status(200).json(userData);
});

router.post("/", async (req, res) => {
  const { name, guestList } = req.body;
  try {
    const user = await User.create({ name, guestList });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
