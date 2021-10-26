const mongoose = require('mongoose');

// TODO : Store in a secured folder or encrypt this
const username = 'admin';
const password = 'admin1234';
const cluster = 'cluster-0';
const database = 'nodejsmasters-finalproject'

mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.ikhnr.mongodb.net/${database}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .catch(e => console.error(`Connection Error : ${e}`))

const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'Connection error: '));
mongoose.connection.once('open', () => console.log('Connected successfully'));

module.exports = {
    db
};