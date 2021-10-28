const getDynamicValidationMessages = (value) => {
    return {
        REQUIRED: `${value} is required`,
        SHOULD_BE_STRING: `${value} should be a string`,
        SHOULD_BE_DATETIME: `${value} is not a proper date time`,
        SHOULD_BE_DATE: `${value} is not a proper date`,
        NOT_IN_DB: `${value} does not exist in the database`
    }
};

const staticValidationMessages = {
    REQUIRED: `Please provide required fields`,
    NO_SEARCH_CRITERIA: `No search criteria provided`,
    INCORRECT_SEARCH_CRITERIA: `Incorrect search criteria`,
}

module.exports = {
    getDynamicValidationMessages,
    staticValidationMessages,
};