const express = require('express');
const router = express.Router();
const controller = require('../../controllers/TagController');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorization');
const bodyValidator = require('../../middlewares/bodyValidator');
const paramIdValidator = require('../../middlewares/paramsIdValidator');
const schemas = require('../../validations/tag');

router.route('/getAll').get(authenticate, controller.fetchAll);
router.route('/get/:id').get(authenticate, paramIdValidator, controller.fetchOneByParamsId);
router.route('/create').put(authenticate, authorize('Admin'), bodyValidator(schemas.createValidation), controller.create);
router.route('/update/:id').patch(authenticate, authorize('Admin'), paramIdValidator, bodyValidator(schemas.updateValidation), controller.updateByParamsId);
router.route('/delete/:id').delete(authenticate, authorize('Admin'), paramIdValidator, controller.deleteByParamsId);

module.exports = router;
