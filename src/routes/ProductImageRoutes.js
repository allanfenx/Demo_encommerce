const express = require('express');
const ProductImageController = require('../controller/ProductImageController');
const multer = require('multer');
const multerConfig = require('../config/multer');
const sign_in = require('../config/sign_in');

const router = express.Router();

router.use(sign_in);

router.post("/product/image", multer(multerConfig).single("file"), ProductImageController.store);

router.delete("/product/image", ProductImageController.destroy);


module.exports = router;