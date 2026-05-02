import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import response from "../utils/responseHandler.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return response(res, 400, false, "User already exist");
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    response(res, 201, true, "User created successfully", { user, token });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return response(res, 401, false, "Invalid credentials");
    }
    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      return response(res, 401, false, "Invalid credentials");
    }

    const token = generateToken(existingUser._id);
    response(res, 200, true, "Login successfully", {
      user: existingUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });

    response(res, 200, true, "Logout successfully");
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return response(res, 404, false, "User not found");
    }
    response(res, 200, true, "User profile fetched successfully", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return response(res, 404, false, "User not found");
    }

    if (name) {
      user.name = name;
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({
        email,
        _id: { $ne: user._id },
      });

      if (existingUser) {
        return response(res, 400, false, "Email already in use");
      }

      user.email = email;
    }

    if (password) {
      user.password = password;
    }
    await user.save();
    const token = generateToken(user._id);

    response(res, 200, true, "Profile updated successfully", {
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, logout, getProfile, updateProfile };
