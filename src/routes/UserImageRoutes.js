const express = require('express');
const UserImageController = require('../controller/UserImageController');
const multer = require('multer');
const multerConfig = require('../config/multer');
const sign_in = require('../config/sign_in');

const router = express.Router();

router.use(sign_in);

router.post("/user", multer(multerConfig).single('file') ,UserImageController.store);

router.delete("/user", UserImageController.destroy);

module.exports = router;