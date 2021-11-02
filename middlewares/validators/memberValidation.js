const {
    validatePropertyDataTypes,
    validateRequiredFields,
    validateIfIDExistsInDB, validateIfSearchCriteriaHasRequiredFields, validateIfSearchCriteriaHasCorrectStatus,
    validateIfBodyHasCorrectStatus, validateIfNoAttendance,
} = require("../../services/validationServices/memberValidationService");
const {
    validateIfIDExistsInRequest,
    validateIfSearchCriteriaIsEmpty
} = require("../../services/validationServices/genericValidationService");

validatePOSTMember = [
    ...validateRequiredFields,
    ...validatePropertyDataTypes,
    validateIfBodyHasCorrectStatus,
];

validatePUTMember = [
    validateIfIDExistsInRequest,
    ...validateRequiredFields,
    ...validatePropertyDataTypes,
    validateIfBodyHasCorrectStatus,
    validateIfIDExistsInDB,
];

validateDELETEMember = [
    validateIfIDExistsInRequest,
    validateIfIDExistsInDB,
    validateIfNoAttendance,
];

validateSearchMember = [
    validateIfSearchCriteriaIsEmpty,
    validateIfSearchCriteriaHasRequiredFields,
    validateIfSearchCriteriaHasCorrectStatus,
];

module.exports = {
    validatePOSTMember,
    validatePUTMember,
    validateDELETEMember,
    validateSearchMember,
};