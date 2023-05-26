//allow to use dotenv throughout the package
require('dotenv').config();

const express = require("express")
const app = express()
const path = require('path')
const errorHandler = require('./middleware/errorHandler')
const { logger } = require('./middleware/logger')
const cookieParser = require('cookie-parser') //3rd party middleware
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const { logEvents } = require('./middleware/logger')


console.log(process.env.NODE_ENV)
console.log(process.env.ACCESS_TOKEN_SECRET);
console.log(process.env.REFRESH_ACCESS_TOKEN_SECRET);


const PORT = process.env.PORT || 8888



connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

// q, a, r
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/notes', require('./routes/noteRoutes'))
app.use('/results', require('./routes/resultRoutes'))
app.use('/answers', require('./routes/answerRoutes'))



//404 page
app.all('*', (req, res) => {
    res.status(404)
    //look at the headers from the requests and determine what response type to send
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))//look down into the views folder and get 404.html
    } else if (req.accepts('json')) {
        res.json({ message: "404 Not Found" })
    } else {
        res.type('txt').send('404 Not Found')
    }

})

app.use(errorHandler)


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}:${err.code}\t${req.syscall}\t${req.hostname}`, 'mongoErrLog.log')
    console.log(err.stack)
})