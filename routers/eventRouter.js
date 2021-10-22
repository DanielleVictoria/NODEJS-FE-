const express = require('express');
const controller = require('../controllers/eventController');

const router = express.Router();

router.route('/')
    .get(controller.getAllEvents)
    .post(controller.createEvent)
    .put(controller.updateEvent)
    .delete(controller.deleteEvent);

router.route('/search')
    .get(controller.searchEvent);

router.route('/export')
    .get(controller.exportEvent);

router.route('/:id')
    .get(controller.getEvent);

module.exports = router;