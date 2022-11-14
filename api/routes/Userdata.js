const {
  getUser,
  addUser,
  updateUser,
} = require("../controllers/userDataController");

const express = require("express");
const router = express.Router();

router.get("/:username", getUser);

router.post("/addNew", addUser);

router.put("/:username", updateUser);

module.exports = router;
