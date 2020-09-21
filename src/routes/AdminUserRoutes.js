const express = require('express');
const UserController = require('../controller/AdminUserController');
const adminsign_in = require('../config/midleware/adminsign_in');
const router = express.Router();


router.get("/user", adminsign_in, UserController.index);

router.post("/user", adminsign_in, UserController.store);

router.get("/user/:id", adminsign_in, UserController.show);

router.put("/user", adminsign_in, UserController.update);

router.delete("/user", adminsign_in, UserController.destroy);

module.exports = router;