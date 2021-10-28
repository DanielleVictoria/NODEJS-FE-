const getDynamicValidationMessages = (value, payloadArr = []) => {
    return {
        REQUIRED: `${value} is required`,
        SHOULD_BE_STRING: `${value} should be a string`,
        SHOULD_BE_DATETIME: `${value} is not a proper date time`,
        SHOULD_BE_DATE: `${value} is not a proper date`,
        NOT_IN_DB: `${value} does not exist in the database`,
        INCORRECT_SEARCH_CRITERIA_ENUMERATION: `${value} should be coming from an enumeration of ${payloadArr[0]}`,
    }
};

const staticValidationMessages = {
    REQUIRED: `Please provide required fields`,
    NO_SEARCH_CRITERIA: `No search criteria provided`,
    INCOMPLETE_SEARCH_CRITERIA: `Incomplete search criteria`,
}

module.exports = {
    getDynamicValidationMessages,
    staticValidationMessages,
};