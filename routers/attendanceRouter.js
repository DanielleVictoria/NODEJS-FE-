const express = require('express');
const controller = require('../controllers/attendanceController');

const router = express.Router();

// TODO: Put validations for POST, PUT
router.route('/')
    .post(controller.createAttendance)
    .put(controller.updateAttendance)
    .delete(controller.deleteAttendance);

module.exports = router;