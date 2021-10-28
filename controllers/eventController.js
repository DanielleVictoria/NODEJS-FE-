const EventModel = require('../models/EventModel');
const {getEventWorkbookToExport} = require("../services/excelService");
const {findFromModelAndSend, saveModelDataAndSend, updateModelAndSend, deleteModelAndSend} = require("../services/modelService");

getAllEvents = (req, res, next) => {
    findFromModelAndSend(req, res, next, EventModel);
}

// TODO : [Attendance First] Return the attendance too
getEvent = (req, res, next) => {
    const {id} = req.params;
    findFromModelAndSend(req, res, next, EventModel, {_id: id});
}

searchEvent = (req, res, next) => {
    const filterObj = getFilterForSearch(req.query);
    findFromModelAndSend(req, res, next, EventModel, filterObj);
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

// TODO : [Attendance and Members First] Get Members of the event and list those in the excel
// TODO : Title of the excel is weird
// TODO : Sort those results
exportEvent = (req, res, next) => {
    try {
        const {eventId} = req.query;
        EventModel.find({_id: eventId})
            .then(result => {
                const workbook = getEventWorkbookToExport(result[0]);
                res.set({
                    "Content-disposition": `attachment; filename=${workbook.title}.xlsx`,
                    "Content-Type":
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                return workbook.xlsx.write(res).then(() => {
                    res.status(200).send();
                });
            })
            .catch(err => res.status(404).send());
    } catch (e) {
        res.status(404).send();
    }
}

createEvent = (req, res, next) => {
    let modelData = new EventModel({
        ...req.body,
        attendances: [],
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
