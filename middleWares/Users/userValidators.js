const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const path = require("path");
const People = require("../../models/People");
const {unlink} = require('fs'); 

const addUserValidator = [
  check("name")
    .isLength({ min: 1})
    .withMessage("Name length should be between 1-120")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabets")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Proper email is required")
    .trim()
    .custom(async (value) => {
      try {
        const user = await People.findOne({ email: value });
        if (user) {
          throw createHttpError("Email already exists!!!");
        }
      } catch (err) {
        throw createHttpError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number. ")
    .custom(async (value) => {
      try {
        const user = await People.findOne({ mobile: value });
        if (user) {
          throw createHttpError("Mobile Number already exists!!!");
        }
      } catch (err) {
        throw createHttpError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage("Password must be of at least 8 characters, lowercase,uppercase,number and symbol. "),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(500).json({errors:mappedErrors}); 

  }
};

module.exports = { addUserValidator,addUserValidationHandler };
