const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const router = express.Router();

// Create order route
router.post('/create-order', createOrder);

// Payment verification route
router.post('/verify-payment', verifyPayment);

module.exports = router;
