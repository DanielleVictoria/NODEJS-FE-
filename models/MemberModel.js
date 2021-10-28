const {db} = require('../servers/server');
const {Schema} = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    // Values : Active or In-active
    status: {
        type: String,
        required: true,
    },
    // OPTIONAL
    joinedDate: {
        type: Date,
    },
    attendanceSigned: [{
        type: Schema.Types.ObjectId,
        ref: 'Attendance'
    }],
}, {
    collection: 'members'
});

module.exports = db.model('Member', schema);