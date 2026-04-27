import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import response from "../utils/responseHandler.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return response(res, 400, false, "User already exist");
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httponly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    response(res, 201, true, "User created successfully", { user, token });
  } catch (error) {
    response(res, 500, false, "Server Error", {
      ...(process.env.NODE_ENV === "development"
        ? { error: error.message }
        : {}),
    });
  }
};
