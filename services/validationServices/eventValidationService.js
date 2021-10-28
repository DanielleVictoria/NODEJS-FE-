/** These functions serve as the "building blocks" each validation will assemble */

const {check, query} = require("express-validator");
const {staticValidationMessages, getDynamicValidationMessages} = require("../../middlewares/validators/messages");
const EventModel = require("../../models/EventModel");
const {isSearchQueryNotEmpty} = require("../../middlewares/validators/commons");

// TODO : Event start date should be < event end date
validateIfEventObject = [
    check(['name', 'type'])
        .exists()
        .withMessage(staticValidationMessages.REQUIRED)
        .isString()
        .withMessage((value) => getDynamicValidationMessages(value).SHOULD_BE_STRING),
    check(['startDateTime', 'endDateTime'])
        .exists()
        .withMessage(staticValidationMessages.REQUIRED)
        .isISO8601() // check if datetime
        .withMessage((value) => getDynamicValidationMessages(value).SHOULD_BE_DATETIME),
];

validateIfIDExistsInDB =
    check(['id']).custom(async (value, {req}) => {
        let dataRetrieved = await EventModel.findOne({_id: req.body.id});
        if (dataRetrieved !== null) {
            return true;
        }
        return Promise.reject();
    }).withMessage(() => getDynamicValidationMessages('ID').NOT_IN_DB)


/** This will fail if no search criteria is provided */
validateSearchCriteria =
    query().custom((queryValues) => {
        return isSearchQueryNotEmpty(queryValues) ? true : Promise.reject();
    }).withMessage(staticValidationMessages.NO_SEARCH_CRITERIA);

module.exports = {
    validateIfEventObject,
    validateIfIDExistsInDB,
    validateSearchCriteria,
};