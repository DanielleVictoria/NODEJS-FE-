const EventModel = require('../servers/models/EventModel');

getAllEvents = (req, res, next) => {
    EventModel.find({})
        .then(events => {
            res.status(200).send(events)
        })
        .catch(err => {
            console.error(err);
        })
}

getEvent = (req, res, next) => {

}

createEvent = (req, res, next) => {

    let modelData = new EventModel(req.body);

    modelData.save()
        .then(doc => {
            console.log(doc);
            res.status(200).send();
        })
        .catch(err => {
            console.error(err);
        })
}

updateEvent = (req, res, next) => {

}

deleteEvent = (req, res, next) => {

}

module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
}