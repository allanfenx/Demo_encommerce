const express = require('express');
const adminsign_in = require('../config/midleware/adminsign_in');
const CategoryController = require('../controller/CategoryController');

const router = express.Router();

router.get("/category", CategoryController.index);

router.get("/category/:id", CategoryController.show);

router.use(adminsign_in);

router.post("/category", CategoryController.store);

router.put("/category", CategoryController.update);

router.delete("/category", CategoryController.destroy);

module.exports = router;