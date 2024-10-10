// models/subscription.js
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  plan: { type: String, required: true }, // e.g., 'Basic', 'Standard', 'Premium'
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
