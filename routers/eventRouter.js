const express = require('express');
const controller = require('../controllers/eventController');
const {
    validatePOSTEvent,
    validatePUTEvent,
    validateDELETEEvent,
    validateExportEvent,
} = require("../middlewares/validators/events/eventValidations");
const {handleErrors} = require("../services/validationServices/genericValidationService");
const {validateSearchCriteria} = require("../services/validationServices/eventValidationService");

const router = express.Router();

router.route('/')
    .get(controller.getAllEvents)
    .post(validatePOSTEvent, handleErrors, controller.createEvent)
    .put(validatePUTEvent, handleErrors, controller.updateEvent)
    .delete(validateDELETEEvent, handleErrors, controller.deleteEvent);

router.route('/search')
    .get(validateSearchCriteria, handleErrors, controller.searchEvent);

router.route('/export')
    .get(validateExportEvent, handleErrors, controller.exportEvent);

router.route('/:id')
    .get(controller.getEvent);

module.exports = router;