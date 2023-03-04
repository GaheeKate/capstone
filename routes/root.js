const express = require('express')
const router = express.Router()
const path = require('path')

//use regex to match only a slash or /index or /index.html
router.get('^/$ | /index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'index.html'))
})

module.exports = router