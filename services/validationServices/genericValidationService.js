const {validationResult, check, query} = require("express-validator");
const {staticValidationMessages} = require("../../middlewares/validators/messages");

handleErrors = (req, res, next) => {
    const errors = validationResult(req).formatWith(
        ({location, msg, param, value, nestedErrors}) => {
            return `message : ${msg}`;
        }
    )
    if (!errors.isEmpty()) {
        return res.status(404).json({errors: errors.array({onlyFirstError: true})})
    }
    return next();
}

validateIfIDExistsInRequest =
    check(['id'])
        .exists()
        .withMessage(staticValidationMessages.REQUIRED);

validateIfSearchCriteriaIsEmpty =
    query().custom((queryValues) => {
        return isSearchQueryNotEmpty(queryValues) ? true : Promise.reject();
    }).withMessage(staticValidationMessages.NO_SEARCH_CRITERIA);

isSearchQueryNotEmpty = (queryValues) => {
    const values = Object.values(queryValues);
    return (values.length !== 0 && values.every(value => value !== undefined));
}

queryHasTheRequiredFields = (requiredFieldsArr, queryValues) => {
    return requiredFieldsArr.every((field) => Object.keys(queryValues).includes(field));
}

module.exports = {
    handleErrors,
    validateIfIDExistsInRequest,
    validateIfSearchCriteriaIsEmpty,
    queryHasTheRequiredFields,
};