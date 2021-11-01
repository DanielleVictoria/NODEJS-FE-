const AttendanceModel = require('../../models/AttendanceModel');
const EventModel = require("../../models/EventModel");
const {check, body} = require("express-validator");
const {getDynamicValidationMessages} = require("../messagingService")

validatePropertyDataTypes = [
    body('timeIn')
        .isISO8601() // check if datetime
        .withMessage((value) => getDynamicValidationMessages('Time In').SHOULD_BE_DATETIME),
    body('timeOut')
        .optional()
        .isISO8601() // check if datetime
        .withMessage((value) => getDynamicValidationMessages('Time Out').SHOULD_BE_DATETIME),
    body('event')
        .custom(async (value, {req}) => {
            let dataRetrieved = await EventModel.findOne({_id: req.body.event});
            if (dataRetrieved !== null) return true;
            return Promise.reject();
        })
        .withMessage(() => getDynamicValidationMessages('Event ID').NOT_IN_DB),
    body('members')
        .optional()
        .isArray()
        .withMessage((value) => getDynamicValidationMessages('Members').SHOULD_BE_ARRAY),
];

validateRequiredProperties = [
    body('timeIn')
        .exists()
        .withMessage(getDynamicValidationMessages('Time In ').REQUIRED),
    body('event')
        .exists()
        .withMessage(getDynamicValidationMessages('Event').REQUIRED),
];

validateTime =
    body('id')
        .custom(async (value, {req}) => {
            const {timeIn, timeOut} = req.body;
            if (!timeOut || new Date(timeIn) < new Date(timeOut)) return true;
            return Promise.reject();
        })
        .withMessage(getDynamicValidationMessages('Time Out', ['Time In']).SHOULD_BE_LATER);

validateIfIDExistsInDB =
    check(['id'])
        .custom(async (value, {req}) => {
            let dataRetrieved = await AttendanceModel.findOne({_id: req.body.id});
            if (dataRetrieved !== null) {
                return true;
            }
            return Promise.reject();
        })
        .withMessage(() => getDynamicValidationMessages('ID').NOT_IN_DB);

module.exports = {
    validateIfIDExistsInDB,
    validatePropertyDataTypes,
    validateRequiredProperties,
    validateTime,
};