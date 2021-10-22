const mongoose = require('mongoose');
const {db} = require('../servers/server');

const schema = new mongoose.Schema({
    timeIn: {
        type: Date,
    },
    timeOut: {
        type: Date,
    },
}, {
    collection: 'attendances'
});

module.exports = db.model('Attendance', schema);