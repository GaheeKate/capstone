const mongoose = require("mongoose");

//schema to have data models
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      default: "User",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  result: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
