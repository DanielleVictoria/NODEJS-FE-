const mongoose = require('mongoose');

const username = "admin";
const password = "admin1234";
const cluster = "cluster-0";
const dbname = "nodejsmasters-finalproject";

mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.ikhnr.mongodb.net/${cluster}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

console.log('Connecting...');
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    console.log('Connected successfully');
});

module.exports = db;