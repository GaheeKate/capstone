const mongoose = require("mongoose");

//schema to have data models
const answerSchema = new mongoose.Schema(
  {
    answer: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    qu: {
      type: String,
      required: true,
    },
  },
  {
    collection: "ans",
  }
);

module.exports = mongoose.model("Answer", answerSchema);
