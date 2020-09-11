const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

router.post("/user", UserController.store);

router.post("/auth", UserController.auth);

router.post("/forgot_password", UserController.forgotPassword);

router.post("/reset_password", UserController.resetPassword);


module.exports = router;