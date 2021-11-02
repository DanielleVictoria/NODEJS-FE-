const MemberModel = require('../../models/MemberModel');
const {check, query, body} = require("express-validator");
const {staticValidationMessages, getDynamicValidationMessages} = require("../messagingService");
const {queryHasTheRequiredFields} = require("./genericValidationService");
const {STATUS} = require("../../enums/enums");

validateRequiredFields = [
    check('name')
        .exists()
        .withMessage(getDynamicValidationMessages('Name').REQUIRED),
    check('status')
        .exists()
        .withMessage(getDynamicValidationMessages('Status').REQUIRED),
];

validatePropertyDataTypes = [
    check(['name', 'status'])
        .isString()
        .withMessage((value) => getDynamicValidationMessages(value).SHOULD_BE_STRING),
    check(['joinedDate'])
        .optional()
        .isDate()
        .withMessage((value) => getDynamicValidationMessages(value).SHOULD_BE_DATE),
];

validateIfIDExistsInDB =
    check(['id']).custom(async (value, {req}) => {
        let dataRetrieved = await MemberModel.findOne({_id: req.body.id});
        if (dataRetrieved !== null) {
            return true;
        }
        return Promise.reject();
    }).withMessage(() => getDynamicValidationMessages('ID').NOT_IN_DB)

validateIfNoAttendance = [
    check('id')
        .custom(async (value) => {
            const memberRetrieved = await MemberModel.findOne({_id: value});
            try {
                if (memberRetrieved.attendances.length === 0) {
                    return true;
                } else {
                    throw new Error();
                }
            } catch (e) {
                return Promise.reject();
            }
        })
        .withMessage(staticValidationMessages.CANNOT_DELETE_WITH_ATTENDANCE)
]

validateIfSearchCriteriaHasRequiredFields =
    query().custom((queryValues) => {
        return queryHasTheRequiredFields(['name', 'status'], queryValues) ? true : Promise.reject();
    }).withMessage(staticValidationMessages.INCOMPLETE_SEARCH_CRITERIA);

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
    validatePropertyDataTypes,
    validateIfIDExistsInDB,
    validateIfSearchCriteriaHasRequiredFields,
    validateIfSearchCriteriaHasCorrectStatus,
    validateIfBodyHasCorrectStatus,
    validateIfNoAttendance,
};