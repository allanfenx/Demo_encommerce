const ProductController = require('../controller/ProductController');
const express = require('express');
const adminsing_in = require('../config/midleware/adminsign_in');

const router = express.Router();

router.get("/product", ProductController.index);

router.get("/product/:id", ProductController.show);

router.post("/product", adminsing_in, ProductController.store);

router.put("/product", adminsing_in, ProductController.update);

router.delete("/product", adminsing_in, ProductController.destroy);

module.exports = router;