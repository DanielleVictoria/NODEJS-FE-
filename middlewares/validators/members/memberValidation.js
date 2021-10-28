const {
    validateIfMemberObject,
    validateRequiredFields,
    validateIfIDExistsInDB,
    validateRequiredSearchCriteria
} = require("../../../services/validationServices/memberValidationService");
const {validateIfIDExistsInRequest} = require("../commons");

// TODO : Only allow status to be 'Active' or 'In-active'
validatePOSTMember = [
    ...validateRequiredFields,
    ...validateIfMemberObject,
];

// TODO : Only allow status to be 'Active' or 'In-active'
validatePUTMember = [
    validateIfIDExistsInRequest,
    ...validateRequiredFields,
    ...validateIfMemberObject,
    validateIfIDExistsInDB
];

// TODO : Validation Check - Return validation error if there is an event attendance
validateDELETEMember = [
    validateIfIDExistsInRequest,
    validateIfIDExistsInDB,
];

// TODO : Search member by name and status
// TODO : Status are enumerations of Active and In-active
validateSearchMember = [
    validateRequiredSearchCriteria,
];

module.exports = {
    validatePOSTMember,
    validatePUTMember,
    validateDELETEMember,
    validateSearchMember,
};