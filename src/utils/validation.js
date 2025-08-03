const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
  } else if (firstName.length > 20 || lastName.length > 20) {
    throw new Error("First name and last name must be less than 20 characters");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be strong");
  }
};

const validateLoginData = (req) => {
  const validLoginFields = ["email", "password"];
  const isValid = Object.keys(req.body).every((field) =>
    validLoginFields.includes(field)
  );
  if (!isValid) {
    throw new Error("Invalid fields for login");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "about",
    "photoUrl",
    "skills",
    "gender",
  ];

  const isEditValid = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditValid;
};

module.exports = {
  validateSignupData,
  validateLoginData,
  validateEditProfileData,
};
