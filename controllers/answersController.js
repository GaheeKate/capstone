const User = require('../models/User')

const Answer = require('../models/Answer')

const asyncHandler = require('express-async-handler')

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllAnswers = asyncHandler(async (req, res) => {
    // Get all answers from MongoDB
    const answers = await Answer.find().lean()

    // If no answers 
    if (!answers?.length) {
        return res.status(400).json({ message: 'No answers found' })
    }

    // Add username to each answer before sending the response 
    const answersWithUser = await Promise.all(answers.map(async (answer) => {
        const user = await User.findById(answer.user).lean().exec()
        return { ...answer, username: user.username }
    }))

    res.json(answersWithUser)
})

// // @desc Create new answer
// // @route POST /answers
// // @access Private
// const createNewAnswer = asyncHandler(async (req, res) => {
//     const { user, title, text } = req.body

//     // Confirm data
//     if (!user || !title || !text) {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     // Check for duplicate title
//     const duplicate = await Answer.findOne({ title }).lean().exec()

//     if (duplicate) {
//         return res.status(409).json({ message: 'Duplicate note title' })
//     }

//     // Create and store the new user 
//     const note = await Answer.create({ user, title, text })

//     if (note) { // Created 
//         return res.status(201).json({ message: 'New note created' })
//     } else {
//         return res.status(400).json({ message: 'Invalid note data received' })
//     }

// })

// // @desc Update a note
// // @route PATCH /notes
// // @access Private
// const updateAnswer = asyncHandler(async (req, res) => {
//     const { id, user, title, text, completed } = req.body

//     // Confirm data
//     if (!id || !user || !title || !text || typeof completed !== 'boolean') {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     // Confirm note exists to update
//     const note = await Answer.findById(id).exec()

//     if (!note) {
//         return res.status(400).json({ message: 'Answer not found' })
//     }

//     // Check for duplicate title
//     const duplicate = await Answer.findOne({ title }).lean().exec()

//     // Allow renaming of the original note 
//     if (duplicate && duplicate?._id.toString() !== id) {
//         return res.status(409).json({ message: 'Duplicate note title' })
//     }

//     note.user = user
//     note.title = title
//     note.text = text
//     note.completed = completed

//     const updatedAnswer = await note.save()

//     res.json(`'${updatedAnswer.title}' updated`)
// })

// // @desc Delete a note
// // @route DELETE /notes
// // @access Private
// const deleteAnswer = asyncHandler(async (req, res) => {
//     const { id } = req.body

//     // Confirm data
//     if (!id) {
//         return res.status(400).json({ message: 'Answer ID required' })
//     }

//     // Confirm note exists to delete 
//     const note = await Answer.findById(id).exec()

//     if (!note) {
//         return res.status(400).json({ message: 'Answer not found' })
//     }

//     const answer = await note.deleteOne()

//     const reply = `Note '${answer.title}' with ID ${answer._id} deleted`

//     res.json(reply)
// })

 module.exports = {
    getAllAnswers,
//     createNewNote,
//     updateNote,
//     deleteNote
 }