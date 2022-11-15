const {
  getUser,
  addUser,
  updateUser,
  updateUserGuestList,
  deleteUser,
} = require("../controllers/userDataController");

const express = require("express");
const router = express.Router();

router.get("/:username", getUser);

router.post("/addNew", addUser);

router.delete("/:username", deleteUser);

router.put("/:username", updateUser);

router.put("/addGuest/:username", updateUserGuestList);

module.exports = router;
