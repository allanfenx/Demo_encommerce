const express = require('express');
const ProductImageController = require('../controller/ProductImageController');
const multer = require('multer');
const multerConfig = require('../config/multer');

const router = express.Router();


router.post("/product/image", multer(multerConfig).single("file"), ProductImageController.store);

router.delete("/product/image", ProductImageController.destroy);


module.exports = router;