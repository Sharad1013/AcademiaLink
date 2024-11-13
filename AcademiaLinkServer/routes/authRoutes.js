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
import { sendOtp } from "../controllers/otpController.js";
import { singleUpload } from "../utils/cloudinaryConfig.js";
import authTokenHandler from "../middlewares/checkAuthToken.js";
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

router.post("/sendOtp", sendOtp);
// Authentication
router.post("/register", singleUpload, registerUser);
router.post("/login", loginUser);
router.get("/checklogin", authTokenHandler, checkLogin);

// fetch user details
router.get("/getUser", authTokenHandler, getUser);
router.get("/logout", authTokenHandler, logoutUser);
export default router;
