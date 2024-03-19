const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    googleId: { type: String },

    name: { type: String, default: "Ananymos" },
    email: { type: String, require: true },
    password: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports = { userModel };
