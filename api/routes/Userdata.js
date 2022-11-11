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

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No user found under this id." });
  }

  const userData = await User.findById(id);

  if (!userData) {
    return res.status(404).json({ error: "Cannot find user." });
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
