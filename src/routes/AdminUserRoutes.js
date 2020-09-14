const express = require('express');
const adminsign_in = require('../config/midleware/adminsign_in');
const UserController = require('../controller/AdminUserController');

const router = express.Router();

router.use(adminsign_in);

router.get("/user", UserController.index);

router.post("/user", UserController.store);

router.get("/user/:id", UserController.show);

router.put("/user", UserController.update);

router.delete("/user", UserController.destroy);

module.exports = router;