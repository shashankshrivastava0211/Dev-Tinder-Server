const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Log environment variables (be careful with sensitive information)
console.log("Using Email User:", process.env.EMAIL_USER);

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or other service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;
