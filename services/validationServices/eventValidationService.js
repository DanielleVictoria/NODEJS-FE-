/** These functions serve as the "building blocks" each validation will assemble */

const EventModel = require("../../models/EventModel");
const AttendanceModel = require('../../models/AttendanceModel');
const {check, body} = require("express-validator");
const {staticValidationMessages, getDynamicValidationMessages} = require("../messagingService");

validatePropertyDataTypes = [
    check(['name', 'type'])
        .isString()
        .withMessage((value) => getDynamicValidationMessages(value).SHOULD_BE_STRING),
    check(['startDateTime', 'endDateTime'])
        .isISO8601() // check if datetime
        .withMessage((value) => getDynamicValidationMessages(value).SHOULD_BE_DATETIME),
];

validateRequiredProperties = [
    check('name')
        .exists()
        .withMessage(getDynamicValidationMessages('Name').REQUIRED),
    check('type')
        .exists()
        .withMessage(getDynamicValidationMessages('Type').REQUIRED),
    check('startDateTime')
        .exists()
        .withMessage(getDynamicValidationMessages('Start DateTime').REQUIRED),
    check('endDateTime')
        .exists()
        .withMessage(getDynamicValidationMessages('End DateTime').REQUIRED),
];

validateIfNoAttendance = [
    check('id')
        .custom(async (value) => {
            const eventRetrieved = await EventModel.findOne({_id: value});
            try {
                if (eventRetrieved.attendances.length === 0) {
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

validateIfAttendanceIsInvalid = [
    check('id')
        .custom(async (value, {req}) => {
            try {
                const {attendances} = req.body;
                if (!attendances) return true;
                const results = await AttendanceModel.find().where('_id').in(attendances);
                return results.length === attendances.length ? true : Promise.reject();
            } catch (e) {
                throw new Error();
            }
        })
        .withMessage(staticValidationMessages.CANNOT_PUT_ATTENDANCE_ID_NOT_EXISTING)
]

validateIfIDExistsInDB =
    check(['id']).custom(async (value, {req}) => {
        let dataRetrieved = await EventModel.findOne({_id: req.body.id});
        if (dataRetrieved !== null) {
            return true;
        }
        return Promise.reject();
    }).withMessage(() => getDynamicValidationMessages('ID').NOT_IN_DB)

validateDates = [
    body('id')
        .custom(async (value, {req}) => {
            const {startDateTime, endDateTime} = req.body;
            if (new Date(startDateTime) < new Date(endDateTime)) return true;
            return Promise.reject();
        })
        .withMessage(getDynamicValidationMessages('End Date', ['Start Date']).SHOULD_BE_LATER)
]

module.exports = {
    validateIfIDExistsInDB,
    validateRequiredProperties,
    validatePropertyDataTypes,
    validateIfNoAttendance,
    validateIfAttendanceIsInvalid,
    validateDates,
};