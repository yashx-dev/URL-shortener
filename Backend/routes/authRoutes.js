import express from "express";
import validateRequest from "../middleware/validateHelper.js";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);
router.post("/logout", protect, logout);
router.get("/profile", protect, getProfile);
router.put(
  "/profile",
  protect,
  updateProfileValidation,
  validateRequest,
  updateProfile,
);

export default router