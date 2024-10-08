const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailID, password } = req.body;
  console.log(req.body);

  if (!firstName || !lastName) {
    throw new Error("Please enter your first and last name");
  }

  if (!validator.isEmail(emailID)) {
    throw new Error("Please enter a valid email ID");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
  return req.body;
};

const validateProfileForEdit = (req) => {
  const allowedFieldsForEdit = [
    "firstName",
    "lastName",
    "emailID",
    "age",
    "photoURL",
    "skills",
    "about",
    "gender",
  ];

  const requestFields = Object.keys(req.body);
  const hasInvalidFields = requestFields.some(
    (key) => !allowedFieldsForEdit.includes(key)
  );

  if (hasInvalidFields) {
    throw new Error("Invalid data");
  }

  const { emailID, photoURL } = req.body;

  if (emailID && !validator.isEmail(emailID)) {
    throw new Error("Please enter a valid email ID");
  }

  if (photoURL && !validator.isURL(photoURL)) {
    throw new Error("Please enter a valid photo URL");
  }

  return true;
};

module.exports = {
  validateSignUp,
  validateProfileForEdit,
};
