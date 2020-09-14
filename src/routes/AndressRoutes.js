const express = require('express');
const AndressController = require('../controller/AndressController');
const sign_in = require('../config/midleware/sign_in');

const router = express.Router();

router.use(sign_in);

router.post("/andress/user", AndressController.store);

router.put("/andress/user", AndressController.update);

router.get("/andress/user/:id", AndressController.show);

router.delete("/andress/user", AndressController.destroy);

module.exports = router;