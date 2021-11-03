const express = require('express');
const controller = require('../controllers/eventController');
const {
    validatePOSTEvent,
    validatePUTEvent,
    validateDELETEEvent,
    validateExportEvent, validateSearchEvent,
} = require("../middlewares/validators/eventValidations");
const {handleValidationErrors} = require("../services/validationServices/genericValidationService");

const router = express.Router();

router.route('/')
    .get(controller.getAllEvents)
    .post(validatePOSTEvent, handleValidationErrors, controller.createEvent)
    .put(validatePUTEvent, handleValidationErrors, controller.updateEvent)
    .delete(validateDELETEEvent, handleValidationErrors, controller.deleteEvent);

router.route('/search')
    .get(validateSearchEvent, handleValidationErrors, controller.searchEvent);

router.route('/export')
    .get(validateExportEvent, handleValidationErrors, controller.exportEvent);

router.route('/:id')
    .get(controller.getEvent);

module.exports = router;