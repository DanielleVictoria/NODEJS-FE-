const getDynamicValidationMessages = (value) => {
    return {
        REQUIRED: `${value} is required`,
        SHOULD_BE_STRING: `${value} should be a string`,
        SHOULD_BE_DATETIME: `${value} is not a proper date time`,
        NOT_IN_DB: `${value} does not exist in the database`
    }
};

const staticValidationMessages = {
    REQUIRED: `Please provide required fields`,
    NO_SEARCH_CRITERIA: `No search criteria provided`,
}

module.exports = {
    getDynamicValidationMessages,
    staticValidationMessages,
};