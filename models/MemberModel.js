const mongoose = require('mongoose');
const {db} = require('../servers/server');
const {Schema} = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    status: {
        type: String,
    },
    joinedDate: {
        type: Date,
    },
    attendanceSigned: {
        type: Schema.Types.ObjectId,
        ref: 'Attendance'
    },
}, {
    collection: 'members'
});

module.exports = db.model('Member', schema);