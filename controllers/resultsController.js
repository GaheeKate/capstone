const Result = require("../models/Result");
const asyncHandler = require("express-async-handler");

// @desc Get all results
// @route GET /results
// @access Private
const getAllResults = asyncHandler(async (req, res) => {
  // Get all results from MongoDB
  const results = await Result.find().lean();

  // If no results
  if (!results?.length) {
    return res.status(400).json({ message: "No results found" });
  }

  res.json(results);
});

// @desc Create new result
// @route POST /results
// @access Private
const createNewResult = asyncHandler(async (req, res) => {
  const { imgId, name, desc, aniName, weight } = req.body;

  // Confirm data
  if (!imgId || !name || !desc || !aniName || !weight) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate name
  const duplicate = await Result.findOne({ name }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate result name" });
  }

  // Create and store the new result
  const result = await Result.create({ imgId, name, desc, aniName, weight });

  if (result) {
    // Created
    return res.status(201).json({ message: "New result created" });
  } else {
    return res.status(400).json({ message: "Invalid result data received" });
  }
});

// @desc Update a result
// @route PATCH /results
// @access Private
const updateResult = asyncHandler(async (req, res) => {
  const { id, imgId, name, desc, aniName, weight } = req.body;

  // Confirm data
  if (!id || !imgId || !name || !desc || !aniName || !weight) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm result exists to update
  const result = await Result.findById(id).exec();

  if (!result) {
    return res.status(400).json({ message: "Result not found" });
  }

  // Check for duplicate name
  const duplicate = await Result.findOne({ name }).lean().exec();

  // Allow renaming of the original result
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate result name" });
  }

  result.imgId = imgId;
  result.name = name;
  result.desc = desc;
  result.aniName = aniName;
  result.weight = weight;

  const updatedResult = await result.save();

  res.json(`'${updatedResult.name}' updated`);
});

// @desc Delete a result
// @route DELETE /results
// @access Private
const deleteResult = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Result ID required" });
  }

  // Confirm result exists to delete
  const result = await Result.findById(id).exec();

  if (!result) {
    return res.status(400).json({ message: "Result not found" });
  }

  const deletedResult = await result.deleteOne();

  const reply = `Result '${deletedResult.name}' with ID ${deletedResult._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllResults,
  createNewResult,
  updateResult,
  deleteResult,
};
