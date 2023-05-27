const Answer = require("../models/Answer");
const asyncHandler = require("express-async-handler");

// @desc Get all answers
// @route GET /answers
// @access Private
const getAllAnswers = asyncHandler(async (req, res) => {
  // Get all answers from MongoDB
  const answers = await Answer.find().lean();

  // If no answers
  if (!answers?.length) {
    return res.status(400).json({ message: "No answers found" });
  }

  res.json(answers);
});

// @desc Create new answer
// @route POST /answers
// @access Private
const createNewAnswer = asyncHandler(async (req, res) => {
  const { answer, weight, qu } = req.body;

  // Confirm data
  if (!answer || !weight || !qu) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create and store the new answer
  const newAnswer = await Answer.create({ answer, weight, qu });

  if (newAnswer) {
    // Created
    return res.status(201).json({ message: "New answer created" });
  } else {
    return res.status(400).json({ message: "Invalid answer data received" });
  }
});

// @desc Update an answer
// @route PATCH /answers
// @access Private
const updateAnswer = asyncHandler(async (req, res) => {
  const { id, answer, weight, qu } = req.body;

  // Confirm data
  if (!id || !answer || !weight || !qu) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm answer exists to update
  const existingAnswer = await Answer.findById(id).exec();

  if (!existingAnswer) {
    return res.status(400).json({ message: "Answer not found" });
  }

  existingAnswer.answer = answer;
  existingAnswer.weight = weight;
  existingAnswer.qu = qu;

  const updatedAnswer = await existingAnswer.save();

  res.json(`'${updatedAnswer.answer}' updated`);
});

// @desc Delete an answer
// @route DELETE /answers
// @access Private
const deleteAnswer = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Answer ID required" });
  }

  // Confirm answer exists to delete
  const answer = await Answer.findById(id).exec();

  if (!answer) {
    return res.status(400).json({ message: "Answer not found" });
  }

  const deletedAnswer = await answer.deleteOne();

  const reply = `Answer '${deletedAnswer.answer}' with ID ${deletedAnswer._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllAnswers,
  createNewAnswer,
  updateAnswer,
  deleteAnswer,
};
