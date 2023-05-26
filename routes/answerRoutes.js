const express = require('express')
const router = express.Router()
const resultsController = require('../controllers/resultsController')
const answersController = require('../controllers/answersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(answersController.getAllAnswers)



module.exports = router
