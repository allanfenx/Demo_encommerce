const express = require('express');
const adminsign_in = require('../config/midleware/adminsign_in');
const UserController = require('../controller/AdminUserController');

const router = express.Router();

router.use(adminsign_in);

router.get("/admin/user", UserController.index);

router.post("/admin/user", UserController.store);

router.get("/admin/user/:id", UserController.show);

router.put("/admin/user", UserController.update);

router.delete("/admin/user", UserController.destroy);

module.exports = router;