const Question = require("../models/Question");
const asyncHandler = require("express-async-handler");

// @desc Get all questions
// @route GET /questions
// @access Private
const getAllQuestions = asyncHandler(async (req, res) => {
  // Get all questions from MongoDB
  const questions = await Question.find().lean();

  // If no questions
  if (!questions?.length) {
    return res.status(400).json({ message: "No questions found" });
  }

  res.json(questions);
});

// @desc Create new question
// @route POST /questions
// @access Private
const createNewQuestion = asyncHandler(async (req, res) => {
  const { qu, num } = req.body;

  // Confirm data
  if (!qu || !num) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate question
  const duplicate = await Question.findOne({ qu }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate question" });
  }

  // Create and store the new question
  const question = await Question.create({ qu, num });

  if (question) {
    // Created
    return res.status(201).json({ message: "New question created" });
  } else {
    return res.status(400).json({ message: "Invalid question data received" });
  }
});

// @desc Update a question
// @route PATCH /questions
// @access Private
const updateQuestion = asyncHandler(async (req, res) => {
  const { id, qu, num } = req.body;

  // Confirm data
  if (!id || !qu || !num) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm question exists to update
  const question = await Question.findById(id).exec();

  if (!question) {
    return res.status(400).json({ message: "Question not found" });
  }

  // Check for duplicate question
  const duplicate = await Question.findOne({ qu }).lean().exec();

  // Allow renaming of the original question
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate question" });
  }

  question.qu = qu;
  question.num = num;

  const updatedQuestion = await question.save();

  res.json(`'${updatedQuestion.qu}' updated`);
});

// @desc Delete a question
// @route DELETE /questions
// @access Private
const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Question ID required" });
  }

  // Confirm question exists to delete
  const question = await Question.findById(id).exec();

  if (!question) {
    return res.status(400).json({ message: "Question not found" });
  }

  const resultin = await question.deleteOne();

  const reply = `Question '${resultin.qu}' with ID ${resultin._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllQuestions,
  createNewQuestion,
  updateQuestion,
  deleteQuestion,
};
