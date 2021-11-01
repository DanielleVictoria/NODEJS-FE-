const AttendanceModel = require('../models/AttendanceModel');
const {saveModelDataAndSend, updateModelAndSend, deleteModelAndSend, findFromModelAndSend} = require("../services/modelService");

// TODO : Delete this
getAllAttendance = (req, res, next) => {
    findFromModelAndSend(req, res, next, AttendanceModel);
}

// TODO : When creating an attendance and supplying an event ID, add it to the array of attendances in event
// TODO : When creating an attendance and supplying a member, add it to the array of attendances in members
createAttendance = (req, res, next) => {
    saveModelDataAndSend(req, res, next, new AttendanceModel(req.body));
}

updateAttendance = (req, res, next) => {
    updateModelAndSend(req, res, next, AttendanceModel);
}

deleteAttendance = (req, res, next) => {
    const {id} = req.body;
    deleteModelAndSend(req, res, next, AttendanceModel, {_id: id});
}

module.exports = {
    getAllAttendance,
    createAttendance,
    updateAttendance,
    deleteAttendance,
}