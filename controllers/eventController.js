const EventModel = require('../models/EventModel');
const {getEventWorkbookToExport} = require("../services/excelService");

getAllEvents = (req, res, next) => {
    EventModel.find({})
        .then(events => {
            res.status(200).send(events);
        })
        .catch(err => {
            res.status(404).send();
        })
}

// TODO : [Attendance First] Return the attendance too
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

// TODO : Validation Check - Will return an error if no search criteria provided
searchEvent = (req, res, next) => {
    const {eventname, datestart, dataend} = req.query;

    // TODO : Make it so that when we provide the right name and the wrong startDateTime, it should return nothing
    EventModel.find({
        $or: [
            {'name': eventname},
            {'startDateTime': datestart},
            {'endDateTime': dataend}
        ]
    }).then(events => {
        res.status(200).send(events);
    }).catch(err => {
        res.status(404).send();
    })
}

// TODO : Validation Check - Check if the event id is existing
// TODO : [Attendance and Members First] Get Members of the event and list those in the excel
exportEvent = (req, res, next) => {
    try {
        const {eventId} = req.query;
        if (!eventId) throw new Error('No Event ID');

        EventModel.find({_id: eventId})
            .then(events => {
                if (!events[0]) throw new Error('No Event ID');
                const workbook = getEventWorkbookToExport(events[0]);
                res.set({
                    "Content-disposition": `attachment; filename=${workbook.title}.xlsx`,
                    "Content-Type":
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                return workbook.xlsx.write(res).then(() => {
                    res.status(200).send();
                });
            })
            .catch(err => res.status(404));

    } catch (e) {
        res.status(404).send();
    }
}

// TODO : Validation Check - Event start date should be < event end date - Required fields
createEvent = (req, res, next) => {
    let modelData = new EventModel({
        ...req.body,
        attendances: [],
    });
    modelData.save()
        .then(doc => {
            console.log(doc);
            res.status(200).send();
        })
        .catch(err => {
            res.status(404).send();
        })
}

// TODO : Validation Check - Event start date should be < event end date - Required fields
updateEvent = (req, res, next) => {
    const {id} = req.body;
    EventModel.updateOne({_id: id}, {...req.body})
        .then(() => res.status(200).send())
        .catch(err => res.status(404).send())
}

// TODO : Validation Check - Return a validation error if there is an event attendance
deleteEvent = (req, res, next) => {
    const {id} = req.body;
    EventModel.findOneAndRemove({_id: id})
        .then(() => res.status(200).send())
        .catch(err => res.status(404).send())
}

module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    searchEvent,
    exportEvent,
}