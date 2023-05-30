const express = require("express");
const router = express.Router();
const questionsController = require("../controllers/questionsController");

router
  .route("/")
  .get(questionsController.getAllQuestions)
  .post(questionsController.createNewQuestion)
  .patch(questionsController.updateQuestion)
  .delete(questionsController.deleteQuestion);

module.exports = router;
