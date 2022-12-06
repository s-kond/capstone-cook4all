const User = require("../models/UserModel");

//get a single user
const getUser = async (req, res) => {
  const { username } = req.params;
  const userData = await User.find({ name: username });
  if (userData.length === 0) {
    return res.status(404).json({ error: "No such user." });
  }
  res.status(200).json(...userData);
};

//add a new user
const addUser = async (req, res) => {
  const { name, guestList, favoriteRecipes } = req.body;
  const existingUser = await User.find({ name });
  if (existingUser.length > 0) {
    return res.status(400).json({ error: "This user already exists." });
  }

  try {
    const user = await User.create({ name, guestList, favoriteRecipes });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a user
const deleteUser = async (req, res) => {
  const { username } = req.params;
  try {
    await User.deleteOne({ name: username });
    res.status(200).json({ msg: `${username} was deleted successfully.` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update user data
const updateUser = async (req, res) => {
  const { guestList, favoriteRecipes } = req.body;
  const { username } = req.params;
  try {
    const user = await User.findOneAndUpdate(
      { name: username },
      { guestList, favoriteRecipes }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//add guest to list
const updateUserGuestList = async (req, res) => {
  const { guestList } = req.body;
  const { username } = req.params;
  try {
    const user = await User.findOneAndUpdate({ name: username }, { guestList });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  addUser,
  deleteUser,
  updateUser,
  updateUserGuestList,
};
