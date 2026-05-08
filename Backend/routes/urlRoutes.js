import express from "express";
import validateRequest from "../middleware/validateHelper.js";
import {
  createUrl,
  getUrls,
  redirect,
  deleteUrl,
} from "../controllers/urlController.js";
import { protect } from "../middleware/authMiddleware.js";
import { createUrlValidation } from "../middleware/validationMiddleware.js";

const urlRouter = express.Router();

urlRouter.post(
  "/shorten",
  protect,
  createUrlValidation,
  validateRequest,
  createUrl,
);
urlRouter.get("/my-urls", protect, getUrls);
urlRouter.delete("/my-urls/:shortCode", protect, deleteUrl);

export default urlRouter;
