const ProductController = require('../controller/ProductController');
const express = require('express');
const adminsing_in = require('../config/midleware/adminsign_in');

const router = express.Router();

router.get("/product", ProductController.index);

router.get("product/:id", ProductController.show);

router.use(adminsing_in);

router.post("/product", ProductController.store);

router.put("/product", ProductController.update);

router.delete("/product", ProductController.destroy);

module.exports = router;