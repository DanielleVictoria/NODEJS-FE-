const {validationResult, check} = require("express-validator");
const {staticValidationMessages} = require("./messages");

handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({errors: errors.array()})
    }
    return next();
}

validateIfIDExistsInRequest =
    check(['id'])
        .exists()
        .withMessage(staticValidationMessages.REQUIRED);

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
    isSearchQueryNotEmpty,
    queryHasTheRequiredFields,
};