const MemberModel = require('../models/MemberModel');
const {findFromModelAndSend, saveModelDataAndSend, updateModelAndSend} = require("./commons");

getAllMembers = (req, res, next) => {
    findFromModelAndSend(req, res, next, MemberModel);
}

// TODO : Return attendance object
getMember = (req, res, next) => {
    const {id} = req.params;
    findFromModelAndSend(req, res, next, MemberModel, {_id: id});
}

searchMember = (req, res, next) => {

}

// TODO : Validation Check - Required fields
createMember = (req, res, next) => {
    let modelData = new MemberModel({
        ...req.body
    });
    saveModelDataAndSend(req, res, next, modelData);
}

// TODO : Validation Check - Required fields
updateMember = (req, res, next) => {
    updateModelAndSend(req, res, next, MemberModel);
}

deleteMember = (req, res, next) => {

}

module.exports = {
    getAllMembers,
    getMember,
    searchMember,
    createMember,
    updateMember,
    deleteMember,
}