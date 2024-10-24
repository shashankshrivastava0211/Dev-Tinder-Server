// src/services/emailService.js
const transporter = require("../config/mailConfig");
const { signUp } = require("../utils/emailContent");

// Create mail options function
const createMailOptions = (to, userName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to, // Add recipient email
    subject: signUp.subject,
    text: signUp.text(userName), // Generate text using the userName
  };

  return mailOptions;
};

// Function to send an email
const sendEmail = async (to, userName) => {
  const mailOptions = createMailOptions(to, userName);

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log("Email sent:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
