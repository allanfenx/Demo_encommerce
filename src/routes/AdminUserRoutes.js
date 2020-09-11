const express = require('express');
const UserController = require('../controller/AdminUserController');
const sign_in = require('../config/sign_in');

const router = express.Router();

router.use(sign_in);

router.get("/user", UserController.index);

router.post("/user", UserController.store);

router.get("/user/:id", UserController.show);

router.put("/user", UserController.update);

router.delete("/user/", UserController.destroy);

module.exports = router;