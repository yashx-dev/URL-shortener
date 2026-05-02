import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "/routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config({ quiet: true });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.use("/auth", router);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    Promise.on("unhandledRejection", (err) => {
      console.error("Unhandled rejection:", err.message);
      server.close(() => process.exit(1));
    });

    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err.message);
      process.exit(1);
    });
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
};

startServer()

export default app