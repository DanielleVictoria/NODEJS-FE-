const {validateIfEventObject, validateIfIDExistsInDB} = require("../../../services/validationServices/eventValidationService");
const {validateIfIDExistsInRequest, validateIfSearchCriteriaIsEmpty} = require("../../../services/validationServices/genericValidationService");
const {check} = require("express-validator");
const {getDynamicValidationMessages} = require("../messages");
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

// TODO : Add more validation to this
validateSearchEvent = [
    validateIfSearchCriteriaIsEmpty,
];

// TODO 5 - Find a way to reuse the copy pasted codes
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

