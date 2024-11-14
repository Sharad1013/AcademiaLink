import express from "express";
const router = express.Router();
import { Verification } from "../models/verificationModel.js";
import nodemailer from "nodemailer";
import { responseFunction } from "../utils/responseFunction.js";
import dotenv from "dotenv";
import {
  registerUser,
  loginUser,
  checkLogin,
  getUser,
  logoutUser,
} from "../controllers/userController.js";
import sendOtp from "../controllers/otpController.js";
import { singleUpload } from "../utils/cloudinaryConfig.js";
import authTokenHandler from "../middlewares/checkAuthToken.js";
import { User } from "../models/userModel.js";
// nodemailer function
const mailer = async (receiverMail, code) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.COMPANY_EMAIL,
      pass: process.env.ACADEMIALINK_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: "AcademiaLink",
    to: receiverMail,
    subject: `OTP for classroom`,
    text: `Your OTP is ${code}`,
    html: `<b>Your OTP is ${code} </b>`,
  });

  console.log(`Message Sent : ${info.messageId}`);

  if (info.messageId) {
    return true;
  }
  return false;
};

router.get("/", (req, res) => {
  res.json({
    message: "Auth route Home",
  });
});

// Handle OTP
router.post("/sendotp", async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return responseFunction(res, 400, "Email is required", null, false);
  }

  try {
    await Verification.deleteMany({ email: email });
    const code = Math.floor(100000 + Math.random() * 900000);
    const isSent = await mailer(email, code);

    const newVerification = new Verification({
      email: email,
      code: code,
    });

    await newVerification.save();
    if (!isSent) {
      return responseFunction(res, 500, "Internal server error", null, false);
    }

    return responseFunction(res, 200, "OTP sent successfully", null, true);
  } catch (err) {
    return responseFunction(res, 500, "Internal server error", err, false);
  }
});

// Authentication
router.post("/register", singleUpload, registerUser);
router.post("/login", loginUser);
router.get("/checklogin", authTokenHandler, checkLogin);

// fetch user details
router.get("/getuser", authTokenHandler, getUser);
router.get("/logout", authTokenHandler, logoutUser);
export default router;
