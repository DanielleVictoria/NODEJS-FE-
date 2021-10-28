const MemberModel = require('../models/MemberModel');
const {findFromModelAndSend, saveModelDataAndSend, updateModelAndSend, deleteModelAndSend} = require("../services/modelService");

getAllMembers = (req, res, next) => {
    findFromModelAndSend(req, res, next, MemberModel);
}

// TODO : Return attendance object
getMember = (req, res, next) => {
    const {id} = req.params;
    findFromModelAndSend(req, res, next, MemberModel, {_id: id});
}

searchMember = (req, res, next) => {
    const {name, status} = req.query;
    findFromModelAndSend(req, res, next, MemberModel, {name, status});
}

createMember = (req, res, next) => {
    let modelData = new MemberModel({...req.body});
    saveModelDataAndSend(req, res, next, modelData);
}

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