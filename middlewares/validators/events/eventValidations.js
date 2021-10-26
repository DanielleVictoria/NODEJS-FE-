const {validateIfEventObject, validateIfIDExistsInDB, validateSearchCriteria} = require("./eventChecks");
const {validateIfIDExistsInRequest} = require("../commons");
const {check} = require("express-validator");
const {staticValidationMessages, getDynamicValidationMessages} = require("../messages");
const EventModel = require("../../../models/EventModel");

validatePOSTEvent = [
    ...validateIfEventObject,
];

validatePUTEvent = [
    validateIfIDExistsInRequest,
    validateIfIDExistsInDB,
    ...validateIfEventObject,
];

// TODO : Validation Check - Return a validation error if there is an event attendance
validateDELETEEvent = [
    validateIfIDExistsInRequest,
    validateIfIDExistsInDB,
];

validateSearchEvent = [
    validateSearchCriteria,
];

// TODO : Find a way to reuse the copy pasted codes
validateExportEvent = [
    validateSearchCriteria,
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

