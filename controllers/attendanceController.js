const AttendanceModel = require('../models/AttendanceModel');
const EventModel = require('../models/EventModel');
const MemberModel = require('../models/MemberModel');
const {
    deleteModelAndSend,
    findFromModelAndSend,
    sendStatusCode
} = require("../services/modelService");

getAllAttendance = (req, res, next) => {
    findFromModelAndSend(req, res, next, AttendanceModel);
}

createAttendance = (req, res, next) => {
    AttendanceModel
        .create(req.body)
        .then(async results => {

            const eventObject = await EventModel.findOne({_id: results.event.toString()});
            eventObject.attendances = [...eventObject.attendances, results._id];
            await eventObject.save();

            const membersObjectArr = await MemberModel.find({_id: {$in: results.members.map(member => member.toString())}});
            for (let memberObject of membersObjectArr) {
                memberObject.attendances = [...memberObject.attendances, results._id.toString()];
                memberObject.save();
            }

            sendStatusCode(res, 200, results);
        })
        .catch(e => {
            console.error(e)
            sendStatusCode(res, 404);
        })
}

updateAttendance = async (req, res, next) => {
    try {
        const originalAttendance = await AttendanceModel.findOne({_id: req.body.id}).lean();
        const {
            previousEventID,
            membersRemovedID,
            membersAddedID
        } = getModifiedValuesFromAttendance(req, originalAttendance);
        const results = await AttendanceModel.findOneAndUpdate({_id: req.body.id}, req.body);

        // If there is a change in event, transfer the attendance to the new event
        if (previousEventID) {
            await transferAttendanceBetweenEvents(req, previousEventID);
        }
        if (membersRemovedID.length !== 0 || membersAddedID.length !== 0) {
            await transferAttendanceBetweenMembers(req, membersRemovedID, membersAddedID)
        }

        sendStatusCode(res, 200, results);
    } catch
        (e) {
        sendStatusCode(res, 404);
    }
}

deleteAttendance = async (req, res, next) => {
    try {
        const {id} = req.body;
        const attendance = await AttendanceModel.findOne({_id: id}).lean();
        await removeAttendanceFromEvent(req, attendance.event.toString());
        await removeAttendanceFromRemovedMembers(req, attendance.members.map(member => member.toString()));
        await AttendanceModel.deleteOne({_id: id});
        sendStatusCode(res, 200);
    } catch (e) {
        console.log(e);
        sendStatusCode(res, 404);
    }
}

getModifiedValuesFromAttendance = (req, originalAttendance) => {
    originalAttendance.members = originalAttendance.members.map(member => member.toString());
    const previousEventID = originalAttendance.event.toString() === req.body.event ?
        null : originalAttendance.event.toString();
    const membersRemovedID = req.body.members ?
        originalAttendance.members.filter((member) => !req.body.members.includes(member.toString())) : [];
    const membersAddedID = req.body.members ?
        req.body.members.filter((member) => !originalAttendance.members.includes(member.toString())) : [];

    return {previousEventID, membersRemovedID, membersAddedID};
}

transferAttendanceBetweenEvents = async (req, previousEventID) => {
    await removeAttendanceFromEvent(req, previousEventID);
    await addAttendanceToEvent(req, req.body.event.toString());
}

removeAttendanceFromEvent = async (req, id) => {
    // delete the attendance from the old event
    const previousEventIDDoc = await EventModel.findOne({_id: id});
    let modifiedAttendance = previousEventIDDoc.attendances.map(attendance => attendance.toString());
    modifiedAttendance = modifiedAttendance.filter(attendance => attendance !== req.body.id);
    previousEventIDDoc.attendances = modifiedAttendance;
    await previousEventIDDoc.save();
}

addAttendanceToEvent = async (req, id) => {
    // add the attendance from the new event
    const newEventDoc = await EventModel.findOne({_id: id});
    newEventDoc.attendances = [...newEventDoc.attendances, req.body.id];
    await newEventDoc.save();
}

transferAttendanceBetweenMembers = async (req, membersRemovedID, membersAddedID) => {
    // If there is a change in members, delete the attendance ID from the removed members
    if (membersRemovedID.length !== 0) {
        await removeAttendanceFromRemovedMembers(req, membersRemovedID);
    }
    // If there is a change in members, add the attendance ID to the newly added members
    if (membersAddedID.length !== 0) {
        await removeAttendanceFromRemovedMembers(req, membersRemovedID);
    }
}

removeAttendanceFromRemovedMembers = async (req, membersRemovedID) => {
    const membersRemovedDocArr = await MemberModel.find({_id: {$in: membersRemovedID}});
    for (let memberDoc of membersRemovedDocArr) {
        let modifiedAttendance = memberDoc.attendances.map(attendance => attendance.toString());
        modifiedAttendance = modifiedAttendance.filter(attendance => attendance !== req.body.id);
        memberDoc.attendances = modifiedAttendance;
        await memberDoc.save();
    }
}

addAttendanceToAddedMembers = async (req, membersAddedID) => {
    const membersAddedDocArr = await MemberModel.find({_id: {$in: membersAddedID}});
    for (let memberDoc of membersAddedDocArr) {
        memberDoc.attendances = [...memberDoc.attendances, req.body.id.toString()];
        await memberDoc.save();
    }
}

module.exports = {
    getAllAttendance,
    createAttendance,
    updateAttendance,
    deleteAttendance,
}