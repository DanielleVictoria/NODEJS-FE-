const {db} = require('../servers/server');
const {Schema} = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    startDateTime: {
        type: Date
    },
    endDateTime: {
        type: Date
    },
    attendances: [{
        type: Schema.Types.ObjectId,
        ref: 'Attendance'
    }],
}, {
    collection: 'events'
});

module.exports = db.model('Event', schema);