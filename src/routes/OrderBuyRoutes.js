const express = require('express');
const OrderBuyController = require('../controller/OrderBuyControler');
const sign_in = require('../config/midleware/sign_in');

const router = express.Router();


router.post("/order", sign_in, OrderBuyController.oderBuy);

module.exports = router;