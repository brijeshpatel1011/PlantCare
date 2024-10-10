require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const sendRoutes = require("./routes/contactSend");
const paymentRoutes = require('./routes/paymentRoutes');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", sendRoutes);
app.use('/api/razorpay', paymentRoutes);

// Root route for handling base URL
app.get('/', (req, res) => {
  res.send('Welcome to the PlantCare Backend!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));