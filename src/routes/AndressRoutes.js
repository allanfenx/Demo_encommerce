const express = require('express');
const AndressController = require('../controller/AndressController');
const sign_in = require('../config/sign_in');

const router = express.Router();

router.use(sign_in);

router.post("/user", AndressController.store);

router.put("/user", AndressController.update);

router.get("/user/:id", AndressController.show);

router.delete("/user", AndressController.destroy);

module.exports = router;