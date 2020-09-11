const express = require('express');
const ProductController = require('../controller/ProductController');
const sign_in = require('../config/sign_in');

const router = express.Router();

router.get("/product", ProductController.index);

router.get("/product/:id", ProductController.show);

router.use(sign_in);

router.post("/product", ProductController.store);

router.put("/product", ProductController.update);

router.delete("/product", ProductController.destroy);

module.exports = router;