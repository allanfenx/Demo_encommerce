const express = require('express');
const OrderBuyController = require('../controller/OrderBuyControler');
const sign_in = require('../config/midleware/sign_in');

const router = express.Router();


router.get("/order", sign_in, OrderBuyController.index);

router.post("/order", sign_in, OrderBuyController.store);

module.exports = router;