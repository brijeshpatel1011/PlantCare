const mongoose = require("mongoose");
const Joi = require("joi");



const contactSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	email: { type: String, required: true },
	subject: { type: String, required: true },
	message: { type: String, required: true },
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = {Contact };