import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authTokenHandler from "../middlewares/checkAuthToken.js";
import { cloudinary } from "../utils/cloudinaryConfig.js";
import { responseFunction } from "../utils/responseFunction.js";
import { Verification } from "../models/verificationModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, otp, role } = req.body;

    if (!name || !email || !password || !otp || !role) {
      return responseFunction(res, 400, "All Fields are required", null, false);
    }

    if (password.length < 6) {
      return responseFunction(
        res,
        400,
        "Password must contain atleast 6 characters",
        null,
        false
      );
    }

    //cloudinary
    const profilePicture = req.file ? req.file.path : " ";

    let user = await User.findOne({ email });
    let verificationQueue = await Verification.findOne({ email });

    if (user) {
      return responseFunction(res, 400, "User Already Exists", null, false);
    }
    if (!verificationQueue) {
      return responseFunction(res, 400, "Please send OTP first", null, false);
    }

    const isMatch = await bcrypt.compare(otp, verificationQueue.code);

    if (!isMatch) {
      return responseFunction(res, 400, "Invalid OTP", null, false);
    }

    user = await User({
      name,
      email,
      password,
      otp,
      role,
      profilePicture,
    });

    await user.save();
    await Verification.deleteOne({ email });

    const authToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "10d" }
    );

    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    user.password = undefined;

    return responseFunction(
      res,
      200,
      "User Registered Successfully",
      { user, authToken, refreshToken },
      true
    );
    // return res.status(201).json({
    //   message: `User Registered Successfully`,
    //   data: newUser,
    //   success: true,
    // });
  } catch (error) {
    console.log(error);
    return responseFunction(res, 500, "Internal Server Error", error, false);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return responseFunction(res, 400, "All Fields are required", null, false);
    }
    const user = await User.findOne({ email });
    if (!user) {
      return responseFunction(res, 400, `Invalid Credentials`, null, false);
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return responseFunction(res, 400, `Invalid Credentials`, null, false);
    }

    const authToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "10d" }
    );

    user.password = undefined;

    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  } catch (error) {
    console.log(error);
    return responseFunction(res, 500, "Internal Server Error", error, false);
  }
};

export const checkLogin = async (req, res, next) => {
  res.json({
    ok: req.ok,
    message: req.message,
    userId: req.userId,
  });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return responseFunction(res, 400, "User not Found", null, false);
    }

    return responseFunction(res, 200, "User Found", user, true);
  } catch (error) {
    return responseFunction(res, 500, "Internal Server Error", error, false);
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("authToken");
  res.clearCookie("refreshToken");
  res.json({
    ok: true,
    message: "Logged Out Successfully",
  });
};
