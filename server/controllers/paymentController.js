// controllers/paymentController.js
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { User } = require('../models/user');
const Subscription = require('../models/subscription');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in paise (INR)
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).send('Error creating order');
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, plan } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Determine plan duration
    let durationInMonths;
    if (plan === 'Basic Plan') durationInMonths = 3;
    if (plan === 'Standard Plan') durationInMonths = 6;
    if (plan === 'Premium Plan') durationInMonths = 12;

    // Create new subscription
    let startDate = new Date();
    let endDate = new Date();
    endDate.setMonth(startDate.getMonth() + durationInMonths);

    const newSubscription = new Subscription({
      plan: plan,
      startDate: startDate,
      endDate: endDate,
    });

    await newSubscription.save();

    // Update user with new subscription
    user.subscription = newSubscription._id;
    await user.save();

    res.json({ success: true, message: 'Subscription updated successfully' });
  } catch (error) {
    res.status(500).send('Error updating subscription');
  }
};
