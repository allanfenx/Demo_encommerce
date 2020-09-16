const express = require('express');
const CategoryController = require('../controller/CategoryController');
const adminsign_in = require('../config/midleware/adminsign_in');

const router = express.Router();

router.get("/category", CategoryController.index);

router.get("/category/:id", CategoryController.show);

router.post("/category", adminsign_in, CategoryController.store);

router.put("/category", adminsign_in, CategoryController.update);

router.delete("/category", adminsign_in, CategoryController.destroy);

module.exports = router;