import mongoose from "mongoose";
import bcrypt from "bcrypt";

const verificationSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

verificationSchema.pre("save", async function (next) {
  const verification = this;
  if (verification.isModified("code")) {
    verification.code = await bcrypt.hash(verification.code, 10);
  }
  next();
});

export const Verification = mongoose.model("Verification", verificationSchema);
