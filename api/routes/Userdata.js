const {
  getUser,
  addUser,
  updateUser,
  updateUserGuestList,
} = require("../controllers/userDataController");

const express = require("express");
const router = express.Router();

router.get("/:username", getUser);

router.post("/addNew", addUser);

router.put("/:username", updateUser);

router.put("/addGuest/:username", updateUserGuestList);

module.exports = router;
