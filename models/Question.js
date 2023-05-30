const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    qu: {
      type: String,
      required: true,
    },
    num: {
      type: String,
      required: true,
    },
  },
  {
    collection: "question",
  }
);

module.exports = mongoose.model("Question", questionSchema);
