const mongoose = require('mongoose')

//schema to have data models
const resultSchema = new mongoose.Schema({
    imgId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    aniName: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }

})


module.exports = mongoose.model('Result', resultSchema)