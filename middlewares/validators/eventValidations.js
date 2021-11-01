const {
    validateIfIDExistsInDB, validateRequiredProperties, validatePropertyDataTypes, validateIfNoAttendance,
    validateIfAttendanceIsInvalid, validateDates
} = require("../../services/validationServices/eventValidationService");
const {
    validateIfIDExistsInRequest,
    validateIfSearchCriteriaIsEmpty
} = require("../../services/validationServices/genericValidationService");
const {check} = require("express-validator");
const {getDynamicValidationMessages} = require("../../services/messagingService");
const EventModel = require("../../models/EventModel");

validatePOSTEvent = [
    ...validateRequiredProperties,
    ...validatePropertyDataTypes,
    ...validateDates,
    ...validateIfAttendanceIsInvalid,
];

validatePUTEvent = [
    validateIfIDExistsInRequest,
    validateIfIDExistsInDB,
    ...validateRequiredProperties,
    ...validatePropertyDataTypes,
    ...validateDates,
    ...validateIfAttendanceIsInvalid,
];

validateDELETEEvent = [
    validateIfIDExistsInRequest,
    validateIfIDExistsInDB,
    ...validateIfNoAttendance,
];

// TODO : Add more validation to this
validateSearchEvent = [
    validateIfSearchCriteriaIsEmpty,
];

validateExportEvent = [
    validateIfSearchCriteriaIsEmpty,
    check(['eventId']).custom(async (value, {req}) => {
        let dataRetrieved = await EventModel.findOne({_id: req.query.eventId});
        if (dataRetrieved !== null) {
            return true;
        }
        return Promise.reject();
    }).withMessage(() => getDynamicValidationMessages('Event ID').NOT_IN_DB)
];

module.exports = {
    validatePOSTEvent,
    validatePUTEvent,
    validateDELETEEvent,
    validateSearchEvent,
    validateExportEvent,
}

