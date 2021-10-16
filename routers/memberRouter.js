const express = require('express');
const controller = require('../controllers/memberController');

const router = express.Router();

// TODO: Put validations for POST, PUT, DELETE
router.route('/')
    .get(controller.getAllMembers)
    .post(controller.createMember)
    .put(controller.updateMember)
    .delete(controller.deleteMember);

router.route('/:id')
    .get(controller.getMember);

// TODO : Insert the routing for advanced search here

module.exports = router;