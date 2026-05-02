import User from "../models/User.js";
import jwt from "jsonwebtoken";
import response from "../utils/responseHandler.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token found in header");
    } catch (error) {
      console.error("Error retrieving token from header:", error);
    }
  }

  if (!token && req.cookies && req.cookies.token) {
    try {
      token = req.cookies.token;
      console.log("Token found in cookies");
    } catch (error) {
      console.error("Error retrieving token from cookies:", error);
    }
  }

  if (!token) {
    return response(res, 401, false, "Not authorized, no token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token is verified for user ID:", decoded.userId);
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return response(res, 404, false, "User not found");
    }

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return response(res, 401, false, "Invalid token");
    }
    if (error.name === "TokenExpiredError") {
      return response(res, 401, false, "Token expired, please login again");
    }

    next(error);
  }
};

export { protect };
