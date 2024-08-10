const express = require("express");
const Contact = require("../models/contact")

const app=express()

app.post('/', async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;
    const newContact = new Contact({ fullName, email, subject, message });
    await newContact.save();
    res.status(201).send('Contact information saved successfully.');
  } catch (error) {
    res.status(500).send('Error saving contact information.');
  }
});

module.exports = app;