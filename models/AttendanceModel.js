const {db} = require('../servers/server');
const {Schema} = require("mongoose");

const schema = new Schema({
    timeIn: {
        type: Date,
        required: true,
    },
    // OPTIONAL
    timeOut: {
        type: Date,
    },
    // OPTIONAL
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Member'
    }],
    event:  {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
}, {
    collection: 'attendances'
});

module.exports = db.model('Attendance', schema);