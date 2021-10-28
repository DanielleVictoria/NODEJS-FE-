const MemberModel = require('../models/MemberModel');
const {findFromModelAndSend, saveModelDataAndSend, updateModelAndSend, deleteModelAndSend} = require("../services/modelService");
const EventModel = require("../models/EventModel");

getAllMembers = (req, res, next) => {
    findFromModelAndSend(req, res, next, MemberModel);
}

// TODO : Return attendance object
getMember = (req, res, next) => {
    const {id} = req.params;
    findFromModelAndSend(req, res, next, MemberModel, {_id: id});
}

// TODO : Implement Search functionality
searchMember = (req, res, next) => {
    const filterObj = getFilterForSearch(req.query);
    findFromModelAndSend(req, res, next, EventModel, filterObj);
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