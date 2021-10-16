const express = require('express');
const controller = require('../controllers/eventController');

const router = express.Router();

// TODO: Put validations for POST, PUT, DELETE
router.route('/')
    .get(controller.getAllEvents)
    .post(controller.createEvent)
    .put(controller.updateEvent)
    .delete(controller.deleteEvent);

router.route('/:id')
    .get(controller.getEvent);

// TODO : Insert the routing for the export and advanced search here

module.exports = router;