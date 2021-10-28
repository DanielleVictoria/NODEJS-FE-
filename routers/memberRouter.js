const express = require('express');
const controller = require('../controllers/memberController');
const {handleErrors} = require("../services/validationServices/genericValidationService");
const {
    validatePOSTMember,
    validatePUTMember,
    validateDELETEMember,
    validateSearchMember
} = require("../middlewares/validators/members/memberValidation");

const router = express.Router();

router.route('/')
    .get(controller.getAllMembers)
    .post(validatePOSTMember, handleErrors, controller.createMember)
    .put(validatePUTMember, handleErrors, controller.updateMember)
    .delete(validateDELETEMember, handleErrors, controller.deleteMember);

router.route('/search')
    .get(validateSearchMember, handleErrors, controller.searchMember);

router.route('/:id')
    .get(controller.getMember);

module.exports = router;