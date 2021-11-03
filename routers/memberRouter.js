const express = require('express');
const controller = require('../controllers/memberController');
const {handleValidationErrors} = require("../services/validationServices/genericValidationService");
const {
    validatePOSTMember,
    validatePUTMember,
    validateDELETEMember,
    validateSearchMember
} = require("../middlewares/validators/memberValidation");

const router = express.Router();

router.route('/')
    .get(controller.getAllMembers)
    .post(validatePOSTMember, handleValidationErrors, controller.createMember)
    .put(validatePUTMember, handleValidationErrors, controller.updateMember)
    .delete(validateDELETEMember, handleValidationErrors, controller.deleteMember);

router.route('/search')
    .get(validateSearchMember, handleValidationErrors, controller.searchMember);

router.route('/:id')
    .get(controller.getMember);

module.exports = router;