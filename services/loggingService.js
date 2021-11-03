const winston = require("winston");
const url = require('url');
const fs = require("fs");
const path = require("path");

getLogger = () => {
    const logDirectory = 'logs'; // directory path where the logs will go
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }
    const filename = getLogFileName();
    return winston.createLogger({
        format: winston.format.simple(),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({filename: path.join(logDirectory, `/${filename}.log`), level: 'info'}),
            new winston.transports.File({filename: path.join(logDirectory, `/ERRORS-${filename}.log`), level: 'error'})
        ]
    });
}

getStringDate = () => {
    return new Date().toLocaleDateString('en-CA').toString();
}

getLogFileName = () => {
    return `AttendanceMonitoringLogs-${getStringDate()}`;
}

getEndpointMessage = (req) => {
    const endpointURL = getURL(req);
    const body = JSON.stringify(req.body);
    const params = JSON.stringify(req.params);
    const query = JSON.stringify(req.query);
    return `
        ${req.method} METHOD
        ENDPOINT URL ${endpointURL}
        BODY ${body}
        PARAMS ${params}
        QUERY ${query}
    `;
}

getURL = (req) => {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
}

logEndpoint = (req) => {
    const message = getEndpointMessage(req);
    const logger = getLogger();
    logger.log({
        level: 'info',
        message
    })
}

logError = (errorMessage) => {
    const logger = getLogger();
    logger.log({
        level: 'error',
        error: errorMessage
    });
}

module.exports = {
    logEndpoint,
    logError,
};