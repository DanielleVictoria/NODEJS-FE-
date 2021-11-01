const {
    validatePropertyDataTypes,
    validateRequiredFields,
    validateIfIDExistsInDB, validateIfSearchCriteriaHasRequiredFields, validateIfSearchCriteriaHasCorrectStatus,
    validateIfBodyHasCorrectStatus,
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

// TODO : Validation Check - Return validation error if there is an event attendance
validateDELETEMember = [
    validateIfIDExistsInRequest,
    validateIfIDExistsInDB,
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