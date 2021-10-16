const express = require('express');
const eventRouter = require('./routers/eventRouter');
const attendanceRouter = require('./routers/attendanceRouter');
const memberRouter = require('./routers/memberRouter');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/events', eventRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/members', memberRouter);

app.listen(port, () => console.log(`🔊 Listening to port : ${port}`));