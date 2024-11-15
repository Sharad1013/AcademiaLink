import { Classroom } from "../models/classroomModel.js";
import { responseFunction } from "../utils/responseFunction.js";
import { Post } from "../models/postModel.js";
import { ClassroomJoin } from "../models/classroomJoinModel.js";
import { User } from "../models/userModel.js";

// mailer function sending mail to the teacher

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

// creating classroom
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
    return responseFunction(
      res,
      500,
      "Internal Server Error while creating classroom",
      error,
      false
    );
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
    return responseFunction(
      res,
      500,
      "Internal Server Error from classroomsByUser",
      error,
      false
    );
  }
};

// getting classroom by classId
export const getClassroomById = async (req, res) => {
  try {
    const { classid } = req.params;
    // if (classroom.owner === req.userid || classroom.students.includes(req.userId)){populate('posts')};
    const classroom = await Classroom.findById(classid).populate("posts");
    if (!classroom) {
      return responseFunction(res, 404, "Classroom not found", null, false);
    }
    return responseFunction(
      res,
      200,
      "Classroom fetched successfully",
      classroom,
      true
    );
  } catch (error) {
    return responseFunction(
      res,
      500,
      "Server Error while fetching classroom",
      error,
      false
    );
  }
};

// addpost
export const addPost1 = async (req, res) => {
  const { title, description, classId } = req.body;

  // uploaded image or pdf url
  const attachmentUrl = req.file ? req.file.path : null;
  console.log(req.body); // This will show the form data excluding the file
  console.log(req.file);
  try {
    const classroom = await Classroom.findById(classId);
    if (!classroom) {
      return res.status(404).json({
        message: "Classroom not found",
      });
    }
    // if (classroom.owners !== req.userId -> not allowed to share posts)

    const newPost = new Post({
      title,
      description,
      classId,
      createdBy: req.userId,
      ...(attachmentUrl &&
        (req.file.mimetype === "application/pdf"
          ? { pdf: attachmentUrl }
          : { image: attachmentUrl })),
    });

    await newPost.save();

    // Add posts to the classroom post's array
    classroom.posts.push(newPost._id);
    await classroom.save();

    return res
      .status(201)
      .json({ message: "Post Created Successfully", post: newPost });
  } catch (error) {
    return responseFunction(
      res,
      500,
      "Server Error while creating posts",
      error,
      false
    );
  }
};

export const addPost = async (req, res) => {
  const { title, description, classId } = req.body;

  // Check if userId is available from the authentication middleware
  if (!req.userId) {
    return res.status(401).json({
      message: "User not authenticated. Please log in.",
      success: false,
    });
  }

  const attachmentUrl = req.file ? req.file.path : null;

  try {
  console.log("User ID from auth middleware:", req.userId);
  console.log("Request Body:", req.body);
  console.log("File Info:", req.file);

    const classroom = await Classroom.findById(classId);
    if (!classroom) {
      return res.status(404).json({
        message: "Classroom not found",
      });
    }

    const newPost = new Post({
      title,
      description,
      classId,
      createdBy: req.userId,
      ...(attachmentUrl && req.file.mimetype === "application/pdf"
        ? { pdf: attachmentUrl }
        : { image: attachmentUrl }), // Store the URL based on file type
    });

    await newPost.save();

    // Add post to the classroom's posts array
    classroom.posts.push(newPost._id);
    await classroom.save();

    return res.status(201).json({
      message: "Post Created Successfully",
      success: true,
      post: newPost,
    });
  } catch (error) {
    console.error("Error while creating post:", error); // Log the error
    return res.status(500).json({
      message: "Server Error while creating posts",
      error: error.message,
    });
  }
};

//search the classrooms
export const searchClassrooms = async (req, res) => {
  try {
    const term = req.query.term;
    if (!term) {
      return responseFunction(res, 400, "Search Term is Required", null, false);
    }

    const results = await Classroom.find({
      name: { $regex: new RegExp(term, "i") },
    });

    if (results.length === 0) {
      return responseFunction(res, 404, "Classroom not found", null, false);
    }

    return responseFunction(res, 200, "Search results", results, true);
  } catch (error) {
    return responseFunction(
      res,
      500,
      "Server Error while searching class",
      error,
      false
    );
  }
};

//students request to join
// export const requestToJoin = async (req, res) => {
//   try {
//     const { classroomId, studentEmail } = req.body;
//     if (!classroomId || !studentEmail) {
//       return responseFunction(
//         res,
//         400,
//         "Classroom ID and student email are required",
//         null,
//         false
//       );
//     }

//     const classroom = await Classroom.findById(classroomId);
//     if (!classroom) {
//       return responseFunction(res, 404, "Classroom not found", null, false);
//     }

//     const classOwnerId = classroom.owner;
//     const classOwner = await User.findById(classOwnerId);
//     if (!classOwner) {
//       return responseFunction(res, 404, "Class Owner not found", null, false);
//     }
//     const classOwnerEmail = classOwner.email;
//     const code = Math.floor(100000 + Math.random() * 900000);
//     const isSent = await mailer(classOwnerEmail, code);
//     if (!isSent) {
//       return responseFunction(res, 500, "Failed to send OTP", null, false);
//     }
//     const newClassroomJoin = new ClassroomJoin({
//       classroomId,
//       studentEmail,
//       code,
//       classOwnerEmail,
//     });

//     await newClassroomJoin.save();
//     return responseFunction(
//       res,
//       200,
//       "OTP sent to the class Owner",
//       null,
//       true
//     );
//   } catch (error) {
//     return responseFunction(
//       res,
//       500,
//       "Server Error while Joining Class",
//       error,
//       false
//     );
//   }
// };

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { classroomId, studentEmail, otp } = req.body;

    if (!classroomId || !studentEmail || !otp) {
      return responseFunction(
        res,
        400,
        "Classroom ID, student email, and OTP are required",
        null,
        false
      );
    }
    const joinRequest = await ClassroomJoin.findOne({
      classroomId,
      studentEmail,
      code: otp,
    });

    if (!joinRequest) {
      return responseFunction(
        res,
        400,
        "Invalid OTP or join request not found",
        null,
        false
      );
    }
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return responseFunction(res, 404, "Classroom not found", null, false);
    }

    if (!classroom.students.includes(studentEmail)) {
      classroom.students.push(studentEmail);
      await classroom.save();
    }

    await ClassroomJoin.deleteOne({ _id: joinRequest._id });

    return responseFunction(
      res,
      200,
      "Successfully joined the class",
      null,
      true
    );
  } catch (error) {
    return responseFunction(
      res,
      500,
      "Internal Server Error while verifying otp",
      error,
      false
    );
  }
};

//Classrooms for students
export const classroomForStudent = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return responseFunction(res, 404, "User not found", null, false);
    }
    const studentEmail = user.email;
    const classrooms = await Classroom.find({ students: studentEmail });
    if (classrooms.length === 0) {
      return responseFunction(
        res,
        404,
        "No classrooms found for this student",
        null,
        false
      );
    }
    return responseFunction(
      res,
      200,
      "Classrooms fetched successfully",
      classrooms,
      true
    );
  } catch (error) {
    return responseFunction(
      res,
      500,
      "Internal Server Error from classroomforstudents controller",
      error,
      false
    );
  }
};
