//allow to use dotenv throughout the package
require('dotenv').config()

const express = require("express")
const app = express()
const path = require('path')
const errorHandler = require('./middleware/errorHandler')
const { logger } = require('./middleware/logger')
const cookieParser = require('cookie-parser') //3rd party middleware
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 8888

const dbUrl = process.env.ClientID
const client = new MongoClient(dbUrl);

app.use(logger)

app.use(cors(corsOptions))

app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

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



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))