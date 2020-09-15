const express = require('express');
const CategoryController = require('../controller/CategoryController');

const router = express.Router();

router.get("/category", CategoryController.index);

router.get("/category/:id", CategoryController.show);


router.post("/category", CategoryController.store);

router.put("/category", CategoryController.update);

router.delete("/category", CategoryController.destroy);

module.exports = router;