const express = require('express');
const router = express.Router();
const schemas = require('../validations/user');
const controller = require('../controllers/UserController');
const bodyValidator = require('../middlewares/bodyValidator');
const authenticate = require('../middlewares/authenticate');

router.route("/login").post(bodyValidator(schemas.loginValidation), controller.login);
router.route("/register").post(bodyValidator(schemas.registerValidation), controller.register);
router.route("/get-password-reset-token").post(bodyValidator(schemas.createPasswordResetTokenValidation), controller.getPasswordResetToken);
router.route("/get-email-verify-token").post(bodyValidator(schemas.createEmailVerifyTokenValidation), controller.getEmailVerifyToken);
router.route("/password-reset").post(bodyValidator(schemas.passwordResetValidation), controller.resetPassword);
router.route("/change-password").post(authenticate, bodyValidator(schemas.changePasswordValidation), controller.changePassword);
router.route("/email-confirm").post(bodyValidator(schemas.emailVerify), controller.confirmEmail);

module.exports = router;