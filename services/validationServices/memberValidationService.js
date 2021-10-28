const MemberModel = require('../../models/MemberModel');
const {check, query, body} = require("express-validator");
const {staticValidationMessages, getDynamicValidationMessages} = require("../../middlewares/validators/messages");
const {queryHasTheRequiredFields} = require("./genericValidationService");
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

// TODO : 5 - Find a way to remove copy paste for this?
validateIfIDExistsInDB =
    check(['id']).custom(async (value, {req}) => {
        let dataRetrieved = await MemberModel.findOne({_id: req.body.id});
        if (dataRetrieved !== null) {
            return true;
        }
        return Promise.reject();
    }).withMessage(() => getDynamicValidationMessages('ID').NOT_IN_DB)

validateIfSearchCriteriaHasRequiredFields =
    query().custom((queryValues) => {
        return queryHasTheRequiredFields(['name', 'status'], queryValues) ? true : Promise.reject();
    }).withMessage(staticValidationMessages.INCOMPLETE_SEARCH_CRITERIA);

// TODO : 5 - Find a way to generalize this function with validateIfBodyHasCorrectStatus
validateIfSearchCriteriaHasCorrectStatus =
    query().custom((queryValues) => {
        return Object.values(STATUS).includes(queryValues.status) ? true : Promise.reject();
    }).withMessage(
        getDynamicValidationMessages('Event', ["'Active or In-active'"])
            .INCORRECT_SEARCH_CRITERIA_ENUMERATION
    );

validateIfBodyHasCorrectStatus =
    body().custom((queryValues) => {
        return Object.values(STATUS).includes(queryValues.status) ? true : Promise.reject();
    }).withMessage(
        getDynamicValidationMessages('Event', ["'Active or In-active'"])
            .INCORRECT_SEARCH_CRITERIA_ENUMERATION
    );

module.exports = {
    validateRequiredFields,
    validateIfMemberObject,
    validateIfIDExistsInDB,
    validateIfSearchCriteriaHasRequiredFields,
    validateIfSearchCriteriaHasCorrectStatus,
    validateIfBodyHasCorrectStatus,
};