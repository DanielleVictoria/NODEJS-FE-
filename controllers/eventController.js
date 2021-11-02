const EventModel = require('../models/EventModel');
const {getEventWorkbookToExport} = require("../services/excelService");
const {
    saveModelDataAndSend, updateModelAndSend, deleteModelAndSend, sendStatusCode
} = require("../services/modelService");

findAndPopulateEventReferences = (req, res, next, filterObj = {}) => {
    EventModel
        .find(filterObj)
        .populate({
            path: 'attendances', select: {timeIn: 1, timeOut: 1, members: 1},
            populate: {
                path: 'members', select: {name: 1}
            }
        })
        .exec((err, results) => {
            if (err) {
                return sendStatusCode(res, 404);
            } else {
                sendStatusCode(res, 200, results)
            }
        });
}

getAllEvents = (req, res, next) => {
    findAndPopulateEventReferences(req, res, next);
}

getEvent = (req, res, next) => {
    const {id} = req.params;
    findAndPopulateEventReferences(req, res, next, {_id: id});
}

searchEvent = (req, res, next) => {
    const filterObj = getFilterForSearch(req.query);
    findAndPopulateEventReferences(req, res, next, filterObj);
}

getFilterForSearch = (queryObj) => {
    const filterObject = {};
    Object.keys(queryObj).forEach((key) => {
        switch (key) {
            case 'eventname' :
                filterObject['name'] = queryObj[key];
                break;
            case 'datestart' :
                filterObject['startDateTime'] = queryObj[key];
                break;
            case 'dataend' :
                filterObject['endDateTime'] = queryObj[key];
                break;
        }
    });
    return filterObject;
}

exportEvent = (req, res, next) => {
    try {
        const {eventId} = req.query;
        EventModel
            .findOne({_id: eventId})
            .populate({
                path: 'attendances',
                select: {timeIn: 1, timeOut: 1, members: 1},
                options: {sort: {'timeIn': 1}},
                populate: {
                    path: 'members', select: {name: 1}
                }
            })
            .then(result => {
                const workbook = getEventWorkbookToExport(result);
                const eventName = sanitizeFileName(result.name);
                const startDateTime = sanitizeFileName(result.startDateTime.toDateString());
                res.set({
                    "Content-disposition": `attachment; filename=${eventName}_${startDateTime}.xlsx`,
                    "Content-Type":
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                return workbook.xlsx.write(res).then(() => {
                    res.status(200).send();
                });
            })
            .catch(err => {
                console.error(err);
                res.status(404).send();
            });
    } catch (e) {
        res.status(404).send();
    }
}

sanitizeFileName = (str) => str.replace(/[^a-z0-9]/gi, '_').toLowerCase();

createEvent = (req, res, next) => {
    let modelData = new EventModel({
        ...req.body,
    });
    saveModelDataAndSend(req, res, next, modelData);
}

updateEvent = (req, res, next) => {
    updateModelAndSend(req, res, next, EventModel);
}

deleteEvent = (req, res, next) => {
    const {id} = req.body;
    deleteModelAndSend(req, res, next, EventModel, {_id: id});
}

module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    searchEvent,
    exportEvent
}
