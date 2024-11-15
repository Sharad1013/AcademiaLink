// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // creating storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "profile_pictures", // Folder in Cloudinary to store images
//     allowed_formats: ["jpg", "jpeg", "png"],
//   },
// });

// export const singleUpload = multer({ storage }).single("profilePicture");

// export { cloudinary, storage };
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Creating storage for profile pictures
const profilePictureStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_pictures", // Folder in Cloudinary to store profile pictures
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Creating storage for post attachments (images or PDFs)
const postAttachmentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const fileFormat = file.mimetype.split("/")[1];
    
    // Ensure only images or PDFs are uploaded
    if (!["jpg", "jpeg", "png", "pdf"].includes(fileFormat)) {
      throw new Error("Invalid file type. Only images and PDFs are allowed.");
    }

    return {
      folder: "post_attachments", // Folder in Cloudinary to store post attachments
      allowed_formats: ["jpg", "jpeg", "png", "pdf"],
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`, // Unique filename
    };
  },
});

// Middleware for uploading files
export const uploadProfilePicture = multer({ storage: profilePictureStorage }).single("profilePicture");
export const uploadPostAttachment = multer({ storage: postAttachmentStorage }).single("attachment"); // Use 'attachment' as the key for post files

export { cloudinary, profilePictureStorage, postAttachmentStorage };
