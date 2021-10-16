const EventModel = require('../servers/models/EventModel');

getAllEvents = (req, res, next) => {
    EventModel.find({})
        .then(events => {
            res.status(200).send(events);
        })
        .catch(err => {
            res.status(404).send();
        })
}

// TODO : Return the attendance too
getEvent = (req, res, next) => {
    const {id} = req.params;
    EventModel.find({_id: id})
        .then(event => {
            res.status(200).send(event);
        })
        .catch(err => {
            res.status(404).send();
        })
}

// TODO : GET with search

// TODO : GET with export

// TODO : Validation Check
createEvent = (req, res, next) => {
    let modelData = new EventModel(req.body);
    modelData.save()
        .then(doc => {
            console.log(doc);
            res.status(200).send();
        })
        .catch(err => {
            res.status(404).send();
        })
}

// TODO : Validation Check
updateEvent = (req, res, next) => {
    const {id} = req.body;
    EventModel.updateOne({_id: id}, {...req.body})
        .then(() => res.status(200).send())
        .catch( err => res.status(404).send())
}

// TODO : Validation Check
deleteEvent = (req, res, next) => {
    const {id} = req.body;
    EventModel.findOneAndRemove({_id: id})
        .then(() => res.status(200).send())
        .catch( err => res.status(404).send())
}

module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
}