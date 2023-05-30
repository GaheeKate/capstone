const express = require("express");
const router = express.Router();
const answersController = require("../controllers/answersController");
//const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT)

router
  .route("/")
  .get(answersController.getAllAnswers)
  .post(answersController.createNewAnswer)
  .patch(answersController.updateAnswer)
  .delete(answersController.deleteAnswer);

module.exports = router;
