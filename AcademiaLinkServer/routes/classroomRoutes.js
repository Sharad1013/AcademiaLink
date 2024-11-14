import express from "express";
const router = express.Router();
import authTokenHandler from "../middlewares/checkAuthToken.js";
import {
  classRoomsByUser,
  createClassroom,
} from "../controllers/classController.js";

router.post("/create", authTokenHandler, createClassroom);
router.get("/classroomscreatedbyme", authTokenHandler, classRoomsByUser);

export default router;
