const User = require('../models/User')
const Result = require('../models/Result')

const asyncHandler = require('express-async-handler')

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllResults = asyncHandler(async (req, res) => {
    // Get all results from MongoDB
    const results = await Result.find().lean()

    // If no results 
    if (!results?.length) {
        return res.status(400).json({ message: 'No results found' })
    }

    // Add username to each result before sending the response 
    const resultsWithUser = await Promise.all(results.map(async (result) => {
        const user = await User.findById(result.user).lean().exec()
        return { ...result, username: user.username }
    }))

    res.json(resultsWithUser)
})

// // @desc Create new result
// // @route POST /results
// // @access Private
// const createNewResult = asyncHandler(async (req, res) => {
//     const { user, title, text } = req.body

//     // Confirm data
//     if (!user || !title || !text) {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     // Check for duplicate title
//     const duplicate = await Result.findOne({ title }).lean().exec()

//     if (duplicate) {
//         return res.status(409).json({ message: 'Duplicate note title' })
//     }

//     // Create and store the new user 
//     const note = await Result.create({ user, title, text })

//     if (note) { // Created 
//         return res.status(201).json({ message: 'New note created' })
//     } else {
//         return res.status(400).json({ message: 'Invalid note data received' })
//     }

// })

// // @desc Update a note
// // @route PATCH /notes
// // @access Private
// const updateResult = asyncHandler(async (req, res) => {
//     const { id, user, title, text, completed } = req.body

//     // Confirm data
//     if (!id || !user || !title || !text || typeof completed !== 'boolean') {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     // Confirm note exists to update
//     const note = await Result.findById(id).exec()

//     if (!note) {
//         return res.status(400).json({ message: 'Result not found' })
//     }

//     // Check for duplicate title
//     const duplicate = await Result.findOne({ title }).lean().exec()

//     // Allow renaming of the original note 
//     if (duplicate && duplicate?._id.toString() !== id) {
//         return res.status(409).json({ message: 'Duplicate note title' })
//     }

//     note.user = user
//     note.title = title
//     note.text = text
//     note.completed = completed

//     const updatedResult = await note.save()

//     res.json(`'${updatedResult.title}' updated`)
// })

// // @desc Delete a note
// // @route DELETE /notes
// // @access Private
// const deleteResult = asyncHandler(async (req, res) => {
//     const { id } = req.body

//     // Confirm data
//     if (!id) {
//         return res.status(400).json({ message: 'Result ID required' })
//     }

//     // Confirm note exists to delete 
//     const note = await Result.findById(id).exec()

//     if (!note) {
//         return res.status(400).json({ message: 'Result not found' })
//     }

//     const result = await note.deleteOne()

//     const reply = `Note '${result.title}' with ID ${result._id} deleted`

//     res.json(reply)
// })

 module.exports = {
    getAllResults,
//     createNewNote,
//     updateNote,
//     deleteNote
 }