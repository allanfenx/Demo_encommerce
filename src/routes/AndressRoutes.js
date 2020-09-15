const express = require('express');
const AndressController = require('../controller/AndressController');

const router = express.Router();


router.post("/user", AndressController.store);

router.put("/user", AndressController.update);

router.get("/user/:id", AndressController.show);

router.delete("/user", AndressController.destroy);

module.exports = router;