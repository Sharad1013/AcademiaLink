import { Classroom } from "../models/classroomModel.js";
import { responseFunction } from "../utils/responseFunction.js";

export const createClassroom = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return responseFunction(
        res,
        400,
        "Classroom must have a name",
        null,
        false
      );
    }

    const newClassroom = new Classroom({
      name,
      description,
      owner: req.userId, // owner is obviously the current user
    });

    await newClassroom.save();
    return responseFunction(
      res,
      201,
      "Classroom Created Successfully",
      newClassroom,
      true
    );
  } catch (error) {
    return responseFunction(res, 500, "Internal Server Error", error, false);
  }
};

// get All Classrooms by user
export const classRoomsByUser = async (req, res) => {
  try {
    const classrooms = await Classroom.find({ owner: req.userId });
    if (!classrooms) {
      return responseFunction(res, 404, "No Classrooms Created", null, false);
    }
    return responseFunction(
      res,
      200,
      "Classrooms fetched successfully",
      classrooms,
      true
    );
  } catch (error) {
    return responseFunction(res, 500, "Internal Server Error", error, false);
  }
};
