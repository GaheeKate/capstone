//destructure
const { format } = require('date-fns')
const { v4: uuid } = require('uuid')//getting v4 and rename it uuid, id for each log item
const fs = require('fs')//fs module for the file system. 
const fsPromises = require('fs').promises
const path = require('path')

//helper function
//date FNS package from npmjs.com
const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {//if the dir exists append log file, if not save error to logs
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger }