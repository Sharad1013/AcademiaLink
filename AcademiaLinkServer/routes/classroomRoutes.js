import express from "express";
const router = express.Router();
import authTokenHandler from "../middlewares/checkAuthToken.js";
import {
  addPost,
  classroomForStudent,
  classRoomsByUser,
  createClassroom,
  getClassroomById,
  searchClassrooms,
  verifyOtp,
} from "../controllers/classController.js";
import nodemailer from "nodemailer";
import { responseFunction } from "../utils/responseFunction.js";
import { uploadPostAttachment } from "../utils/cloudinaryConfig.js";
import { Classroom } from "../models/classroomModel.js";
import { ClassroomJoin } from "../models/classroomJoinModel.js";
import { User } from "../models/userModel.js";

//mailer function
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

router.post("/create", authTokenHandler, createClassroom);
router.get("/classroomscreatedbyme", authTokenHandler, classRoomsByUser);
router.get("/getclassbyid/:classid", getClassroomById);

// Adding Post routes for the classrooms media
router.post("/addpost", authTokenHandler, uploadPostAttachment, addPost);

router.get("/classrooms/search", searchClassrooms);

// //students request to join
router.post('/request-to-join', async (req, res) => {
  const { classroomId, studentEmail } = req.body;

  if (!classroomId || !studentEmail) {
      return responseFunction(res, 400, 'Classroom ID and student email are required', null, false);
  }

  try {
      const classroom = await Classroom.findById(classroomId);
      if (!classroom) {
          return responseFunction(res, 404, 'Classroom not found', null, false);
      }
      const classOwnerId = classroom.owner;

      const classOwner = await User.findById(classOwnerId);
      if (!classOwner) {
          return responseFunction(res, 404, 'Class owner not found', null, false);
      }

      const classOwnerEmail = classOwner.email;

      const code = Math.floor(100000 + Math.random() * 900000);
      const isSent = await mailer(classOwnerEmail, code);
      if (!isSent) {
          return responseFunction(res, 500, 'Failed to send OTP', null, false);
      }
      const newClassroomJoin = new ClassroomJoin({
          classroomId,  // Reference to the classroom
          studentEmail,  // Student email
          code,  // OTP code
          classOwnerEmail  // Email of the class owner
      });
      await newClassroomJoin.save();
      return responseFunction(res, 200, 'OTP sent to the class owner', null, true);


  }
  catch (err) {
      console.log(err)
      return responseFunction(res, 500, 'Internal server error', err, false);
  }
})

// OTP sent to teacher and then saved to DB collection - named as student join.
router.post("/verify-otp", authTokenHandler, verifyOtp);

router.get("/classroomsforstudent", authTokenHandler, classroomForStudent);
export default router;
