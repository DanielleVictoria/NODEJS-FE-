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

module.exports = {
    handleErrors,
    validateIfIDExistsInRequest,
};