const express = require('express');
const controller = require('../controllers/attendanceController');
const {handleErrors} = require("../services/validationServices/genericValidationService");
const {
    validatePOSTAttendance,
    validatePUTAttendance,
    validateDELETEAttendance
} = require("../middlewares/validators/attendanceValidations");

const router = express.Router();

router.route('/')
    .get(controller.getAllAttendance)
    .post(validatePOSTAttendance, handleErrors, controller.createAttendance)
    .put(validatePUTAttendance, handleErrors, controller.updateAttendance)
    .delete(validateDELETEAttendance, handleErrors, controller.deleteAttendance);

module.exports = router;