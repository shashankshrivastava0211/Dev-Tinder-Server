const validator = require("validator");
const validateSignUp = (req) => {
  const { firstName, lastName, emailID, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please enter your first and last name");
  } else if (!validator.isEmail(emailID)) {
    throw new Error("Please enter  valid emailId");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};
module.exports = {
  validateSignUp,
};
