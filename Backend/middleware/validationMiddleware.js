import { body } from "express-validator";

const registerValidation = [
  body("name")
    .isLength({ min: 2 })
    .withMessage("Name must be atleast 2 characters")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

const updateProfileValidation = [
  body("name")
    .optional({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters")
    .trim(),
  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .optional({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
const createUrlValidation = [
  body("longUrl")
    .notEmpty()
    .withMessage("URL is required")
    .isURL({
      protocols: ["http", "https"],
      require_protocol: true,
    })
    .withMessage("Please provide a valid URL"),
];

export {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  createUrlValidation,
};
