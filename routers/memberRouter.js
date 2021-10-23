const express = require('express');
const controller = require('../controllers/memberController');

const router = express.Router();

router.route('/')
    .get(controller.getAllMembers)
    .post(controller.createMember)
    .put(controller.updateMember)
    .delete(controller.deleteMember);

router.route('/:id')
    .get(controller.getMember);

router.route('/search')
    .get(controller.searchMember);

module.exports = router;