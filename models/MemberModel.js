const mongoose = require('mongoose');
const {db} = require('../servers/server');

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
}, {
    collection: 'members'
});

module.exports = db.model('Member', schema);