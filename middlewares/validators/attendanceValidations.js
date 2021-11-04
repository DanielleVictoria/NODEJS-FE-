const {validateIfIDExistsInRequest} = require("../../services/validationServices/genericValidationService");
const {
    validateIfIDExistsInDB,
    validateRequiredProperties,
    validatePropertyDataTypes, validateTime
} = require("../../services/validationServices/attendanceValidationService");

validatePOSTAttendance = [
    ...validateRequiredProperties,
    ...validatePropertyDataTypes,
    validateTime,
];

validatePUTAttendance = [
    ...validateRequiredProperties,
    validateIfIDExistsInRequest,
    ...validatePropertyDataTypes,
    validateIfIDExistsInDB,
    validateTime,
];

validateDELETEAttendance = [
    validateIfIDExistsInRequest,
    validateIfIDExistsInDB,
];

module.exports = {
    validatePOSTAttendance,
    validatePUTAttendance,
    validateDELETEAttendance,
};