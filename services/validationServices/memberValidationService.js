const MemberModel = require('../../models/MemberModel');
const {check, query} = require("express-validator");
const {staticValidationMessages, getDynamicValidationMessages} = require("../../middlewares/validators/messages");
const {isSearchQueryNotEmpty, queryHasTheRequiredFields} = require("../../middlewares/validators/commons");
const {STATUS} = require("../../enums/enums");

validateRequiredFields = [
    check(['name', 'status'])
        .exists()
        .withMessage(staticValidationMessages.REQUIRED),
];

validateIfMemberObject = [
    check(['name', 'status'])
        .isString()
        .withMessage((value) => getDynamicValidationMessages(value).SHOULD_BE_STRING),
    check(['joinedDate'])
        .optional()
        .isDate()
        .withMessage((value) => getDynamicValidationMessages(value).SHOULD_BE_DATE),
];

// TODO : Find a way to remove copy paste for this?
validateIfIDExistsInDB =
    check(['id']).custom(async (value, {req}) => {
        let dataRetrieved = await MemberModel.findOne({_id: req.body.id});
        if (dataRetrieved !== null) {
            return true;
        }
        return Promise.reject();
    }).withMessage(() => getDynamicValidationMessages('ID').NOT_IN_DB)

/* This will check if all the required search criteria is there */
validateRequiredSearchCriteria =
    query().custom(async (value) => {
        const notEmpty = isSearchQueryNotEmpty(value);
        const hasRequiredFields = queryHasTheRequiredFields(['name', 'status'], value);
        const hasCorrectStatus = Object.values(STATUS).includes(value.status);
        return notEmpty && hasRequiredFields && hasCorrectStatus ? true : Promise.reject();
    }).withMessage(() => staticValidationMessages.INCORRECT_SEARCH_CRITERIA);

module.exports = {
    validateRequiredFields,
    validateIfMemberObject,
    validateIfIDExistsInDB,
    validateRequiredSearchCriteria,
};