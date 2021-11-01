const {db} = require('../servers/server');
const {Schema} = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    attendances: [{
        type: Schema.Types.ObjectId,
        ref: 'Attendance',
    }],
}, {
    collection: 'events'
});

module.exports = db.model('Event', schema);