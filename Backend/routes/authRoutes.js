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

const authRouter = express.Router();

authRouter.post("/register", registerValidation, validateRequest, register);
authRouter.post("/login", loginValidation, validateRequest, login);
authRouter.post("/logout", protect, logout);
authRouter.get("/profile", protect, getProfile);
authRouter.put(
  "/profile",
  protect,
  updateProfileValidation,
  validateRequest,
  updateProfile,
);

export default authRouter