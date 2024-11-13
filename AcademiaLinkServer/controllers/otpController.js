import { Verification } from "../models/verificationModel.js";
import mailer from "../utils/mailerFunction.js";
import { responseFunction } from "../utils/responseFunction.js";

export const sendOtp = async (req, res, next) => {
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
      return responseFunction(res, 500, "Internal Server Error", null, false);
    }
    return responseFunction(res, 200, "OTP sent successfully", null, true);
  } catch (error) {
    return responseFunction(res, 500, "Internal Server Error", error, false);
  }
};
