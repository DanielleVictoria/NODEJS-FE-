const MemberModel = require('../models/MemberModel');
const AttendanceModel = require('../models/AttendanceModel');
const {
    saveModelDataAndSend,
    updateModelAndSend,
    deleteModelAndSend,
    sendStatusCode
} = require("../services/modelService");

findAndPopulateMemberReferences = (req, res, next, filterObj = {}) => {
    MemberModel
        .find(filterObj)
        .populate({
            path: 'attendances', select: {timeIn: 1, timeOut: 1, event: 1},
            populate: {
                path: 'event', select: {name: 1}
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

getAllMembers = (req, res, next) => {
    findAndPopulateMemberReferences(req, res, next);
}

getMember = (req, res, next) => {
    const {id} = req.params;
    findAndPopulateMemberReferences(req, res, next, {_id: id});
}

searchMember = (req, res, next) => {
    const {name, status} = req.query;
    findAndPopulateMemberReferences(req, res, next, {name, status});
}

createMember = async (req, res, next) => {
    try {
        const results = await MemberModel.create(req.body);
        if (req.body.attendances) {
            await addMemberToAttendances(req.body.attendances, results._id);
        }
        sendStatusCode(res, 201, results);
    } catch (e) {
        sendStatusCode(res, 404);
    }
}

updateMember = async (req, res, next) => {
    try {
        const oldMember = await MemberModel.findOne({_id: req.body.id});
        if (req.body.attendances) {
            const oldAttendances = oldMember.attendances.map(attendance => attendance.toString());
            const {
                attendanceRemovedID,
                attendanceAddedID
            } = getModifiedAttendances(oldAttendances, req.body.attendances);
            await addMemberToAttendances(attendanceAddedID, req.body.id);
            await removeMemberFromAttendances(attendanceRemovedID, req.body.id);
        }
        const results = await MemberModel.findOneAndUpdate({_id: req.body.id}, req.body);
        sendStatusCode(res, 200, results);
    } catch (e) {
        sendStatusCode(res, 404);
    }
}

deleteMember = async (req, res, next) => {
    const {id} = req.body;
    deleteModelAndSend(req, res, next, MemberModel, {_id: id});
}

getModifiedAttendances = (oldAttendanceArr = [], newAttendanceArr = []) => {
    const attendanceRemovedID =
        oldAttendanceArr.filter((attendance) => !newAttendanceArr.includes(attendance));
    const attendanceAddedID =
        newAttendanceArr.filter((attendance) => !oldAttendanceArr.includes(attendance));
    return {attendanceRemovedID, attendanceAddedID};
}

/** When creating/updating a member with attendance, this will update that attendance into adding this member */
addMemberToAttendances = async (attendancesIDArr, memberID) => {
    const attendancesDoc = await AttendanceModel.find({_id: {$in: attendancesIDArr}});
    for (let attendanceDoc of attendancesDoc) {
        attendanceDoc.members = [...attendanceDoc.members, memberID];
        await attendanceDoc.save();
    }
}

removeMemberFromAttendances = async (attendancesIDArr, memberID) => {
    const attendancesDoc = await AttendanceModel.find({_id: {$in: attendancesIDArr}});
    for (let attendanceDoc of attendancesDoc) {
        let modifiedMembers = attendanceDoc.members.map(member => member.toString());
        modifiedMembers = modifiedMembers.filter(member => member !== memberID);
        attendanceDoc.members = modifiedMembers;
        await attendanceDoc.save();
    }
}

module.exports = {
    getAllMembers,
    getMember,
    searchMember,
    createMember,
    updateMember,
    deleteMember,
}