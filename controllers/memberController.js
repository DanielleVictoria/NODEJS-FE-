const MemberModel = require('../models/MemberModel');
const {saveModelDataAndSend, updateModelAndSend, deleteModelAndSend, sendStatusCode} = require("../services/modelService");

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

// TODO : When creating an attendance and supplying a member, add it to the array of attendances in members
createMember = (req, res, next) => {
    let modelData = new MemberModel({...req.body});
    saveModelDataAndSend(req, res, next, modelData);
}

// TODO : When creating an attendance and supplying a member, add it to the array of attendances in members
updateMember = (req, res, next) => {
    updateModelAndSend(req, res, next, MemberModel);
}

deleteMember = (req, res, next) => {
    const {id} = req.body;
    deleteModelAndSend(req, res, next, MemberModel, {_id: id});
}

module.exports = {
    getAllMembers,
    getMember,
    searchMember,
    createMember,
    updateMember,
    deleteMember,
}