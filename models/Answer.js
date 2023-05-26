const mongoose = require('mongoose')

//schema to have data models
const answerSchema = new mongoose.Schema({

    answer: {
        type: String,
        required: true
    },
    weight: {
        type: Number
        },
    qu: {
        type: Number
    }

})


module.exports = mongoose.model('Answer', answerSchema)