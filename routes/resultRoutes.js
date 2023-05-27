const express = require("express");
const router = express.Router();
const resultsController = require("../controllers/resultsController");
//const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT)

router
  .route("/")
  .get(resultsController.getAllResults)
  .post(resultsController.createNewResult)
  .patch(resultsController.updateResult)
  .delete(resultsController.deleteResult);

module.exports = router;
