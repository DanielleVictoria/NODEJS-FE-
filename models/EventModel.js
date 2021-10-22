const mongoose = require('mongoose');
const {db} = require('../servers/server');

const schema = new mongoose.Schema({
    name: String,
    type: String,
    startDateTime: Date,
    endDateTime: Date,
    attendances: Array,
}, {
    collection: 'events'
});

module.exports = db.model('Event', schema);