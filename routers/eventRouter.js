const express = require('express');
const controller = require('../controllers/eventController');
const {
    validatePOSTEvent,
    validatePUTEvent,
    validateDELETEEvent,
    validateExportEvent, validateSearchEvent,
} = require("../middlewares/validators/eventValidations");
const {handleErrors} = require("../services/validationServices/genericValidationService");

const router = express.Router();

router.route('/')
    .get(controller.getAllEvents)
    .post(validatePOSTEvent, handleErrors, controller.createEvent)
    .put(validatePUTEvent, handleErrors, controller.updateEvent)
    .delete(validateDELETEEvent, handleErrors, controller.deleteEvent);

router.route('/search')
    .get(validateSearchEvent, handleErrors, controller.searchEvent);

router.route('/export')
    .get(validateExportEvent, handleErrors, controller.exportEvent);

router.route('/:id')
    .get(controller.getEvent);

module.exports = router;