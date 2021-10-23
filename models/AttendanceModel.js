const {db} = require('../servers/server');
const {Schema} = require("mongoose");

const schema = new Schema({
    timeIn: {
        type: Date,
    },
    timeOut: {
        type: Date,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Member'
    }],
}, {
    collection: 'attendances'
});

module.exports = db.model('Attendance', schema);