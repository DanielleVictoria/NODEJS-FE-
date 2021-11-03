const express = require('express');
const controller = require('../controllers/attendanceController');
const {handleValidationErrors} = require("../services/validationServices/genericValidationService");
const {
    validatePOSTAttendance,
    validatePUTAttendance,
    validateDELETEAttendance
} = require("../middlewares/validators/attendanceValidations");

const router = express.Router();

router.route('/')
    .get(controller.getAllAttendance)
    .post(validatePOSTAttendance, handleValidationErrors, controller.createAttendance)
    .put(validatePUTAttendance, handleValidationErrors, controller.updateAttendance)
    .delete(validateDELETEAttendance, handleValidationErrors, controller.deleteAttendance);

module.exports = router;