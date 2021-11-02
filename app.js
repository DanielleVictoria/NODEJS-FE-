const express = require('express');
const eventRouter = require('./routers/eventRouter');
const attendanceRouter = require('./routers/attendanceRouter');
const memberRouter = require('./routers/memberRouter');
const {logEndpoint} = require("./services/loggingService");
const EventEmitter = require('events');
const emitter = new EventEmitter();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

emitter.on('logEndpoint', logEndpoint);
app.use('/api', (req, res, next) => {
    emitter.emit('logEndpoint', req);
    return next();
});
app.use('/api/events', eventRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/members', memberRouter);

// TODO : Verify if this is correct.
app.get('*', (req, res) => {
   res.status(404).json({
       message: 'Requested URL does not exist'
   });
});

app.listen(port, () => console.log(`🔊 Listening to port : ${port}`));

// TODO : Implement dotenv
// TODO : Add logging
// TODO : Add testing in Postman