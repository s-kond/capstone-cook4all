const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    guestList: [
      {
        id: String,
        intolerances: [{ id: Number, name: String }],
        name: String,
        notes: String,
        selected: Boolean,
      },
    ],
    favoriteRecipes: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
