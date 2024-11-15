// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// const ClassesDetails = () => {
//   const { classid } = useParams();
//   console.log(classid)
//   const [classroom, setClassroom] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [postTitle, setPostTitle] = useState("");
//   const [postDescription, setPostDescription] = useState("");

//   const [showJoinPopup, setShowJoinPopup] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [showOtpPopup, setShowOtpPopup] = useState(false);
//   const [otpError, setOtpError] = useState("");
//   const [attachment, setAttachment] = useState(null);
//   const navigate = useNavigate();

//   const fetchClassDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `${
//           import.meta.env.VITE_APP_API_BASE_URL
//         }/class/getclassbyid/${classid}`,
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setClassroom(data.data);
//       } else {
//         toast.error(data.message || "Failed to fetch class details");
//       }
//     } catch (error) {
//       toast.error("Error fetching class details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClassDetails();
//   }, [classid]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_APP_API_BASE_URL}/auth/getuser`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data = await response.json();

//         if (response.ok) {
//           setUser(data.data);
//         } else {
//           toast.error(data.message || "Failed to fetch user data");
//         }
//       } catch (error) {
//         toast.error("An error occurred while fetching user data");
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleAddPost = () => {
//     setShowPopup(true); // Show the popup
//   };

//   const handleSubmitPost = async () => {
//     try {
//       // Check if there is an attachment
//       let attachmentUrl = null;
//       if (attachment) {
//         const formData = new FormData();
//         formData.append("attachment", attachment);

//         const uploadResponse = await fetch(
//           `${import.meta.env.VITE_APP_API_BASE_URL}/class/addpost`,
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         const uploadData = await uploadResponse.json();
//         if (uploadResponse.ok) {
//           attachmentUrl = uploadData.secure_url; // Assuming this is returned by Cloudinary
//         } else {
//           throw new Error(uploadData.message || "Failed to upload attachment");
//         }
//       }

//       // Create the post
//       const response = await fetch(
//         `${import.meta.env.VITE_APP_API_BASE_URL}/class/addpost`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             title: postTitle,
//             description: postDescription,
//             attachment: attachmentUrl, // Add the attachment URL here
//             classId: classid,
//           }),
//           credentials: "include",
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Post created successfully");
//         setPostTitle(""); // Clear the input fields
//         setPostDescription("");
//         setAttachment(null); // Clear the attachment
//         setShowPopup(false); // Close the popup
//         fetchClassDetails(); // Optionally refresh posts here
//       } else {
//         toast.error(data.message || "Failed to create post");
//       }
//     } catch (error) {
//       toast.error(error.message || "An error occurred while creating the post");
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false); // Show the popup
//   };

//   const handleSubmitOtp = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_APP_API_BASE_URL}/class/verify-otp`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             classroomId: classid,
//             studentEmail: user?.email,
//             otp,
//           }),
//           credentials: "include",
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setOtp("");
//         setShowOtpPopup(false);
//         toast.success("Successfully joined the class");
//         fetchClassDetails(); // Refresh the classroom details
//       } else {
//         setOtpError(data.message || "Failed to verify OTP");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("An error occurred while verifying OTP");
//     }
//   };

//   const handleCloseOtpPopup = () => {
//     setShowOtpPopup(false);
//     setOtpError("");
//   };

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   const isStudent = classroom?.students?.includes(user?.email);
//   const isOwner = classroom?.owner == user?._id;

//   return (
//     <div className="class-details bg-gray-100 p-6 min-h-screen">
//       {/* Header Section */}
//       <motion.div
//         className="section1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg p-6 flex flex-col items-center"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <img
//           src="https://via.placeholder.com/150" // Dummy image
//           alt="Classroom"
//           className="class-image rounded-full w-40 h-40 object-cover shadow-lg"
//         />
//         <h1 className="class-name text-4xl font-bold mt-4">
//           {classroom?.name}
//         </h1>
//         <p className="class-description mt-2 text-lg">
//           {classroom?.description}
//         </p>

//         {isOwner && (
//           <motion.button
//             className="add-post-btn mt-4 bg-yellow-400 text-black px-6 py-2 rounded-lg shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 duration-0"
//             onClick={handleAddPost}
//             whileHover={{ scale: 1.1 }}
//           >
//             Add Post
//           </motion.button>
//         )}

//         {!isStudent && !isOwner && (
//           <motion.button
//             className="add-post-btn mt-4 bg-blue-400 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-500 transition-transform transform hover:scale-105"
//             onClick={() => setShowJoinPopup(true)}
//             whileHover={{ scale: 1.1 }}
//           >
//             Join Class
//           </motion.button>
//         )}
//       </motion.div>

//       {/* Posts Section */}
//       <div className="post-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//         {(isStudent || isOwner) && classroom?.posts?.length > 0 ? (
//           classroom.posts.map((post, index) => (
//             <motion.div
//               key={index}
//               className="post-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-2 transition-all"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {post.title}
//               </h3>
//               <p className="text-gray-600 mt-2">{post.description}</p>
//               <small className="text-gray-500 mt-4 block">
//                 {new Date(post.createdAt).toLocaleDateString()}
//               </small>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">
//             No posts available
//           </p>
//         )}
//       </div>

//       {/* Add Post Popup */}
//       {showPopup && (
//         <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <motion.div
//             className="popup-content bg-white rounded-lg shadow-lg p-6 w-96"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//           >
//             <h3 className="text-2xl font-semibold mb-4">Add Post</h3>
//             {/* Title Input */}
//             <input
//               type="text"
//               placeholder="Title"
//               value={postTitle}
//               onChange={(e) => setPostTitle(e.target.value)}
//               className="w-full p-3 border rounded-lg mb-4"
//             />
//             {/* Description Input */}
//             <textarea
//               placeholder="Description"
//               value={postDescription}
//               onChange={(e) => setPostDescription(e.target.value)}
//               className="w-full p-3 border rounded-lg mb-4"
//             />
//             {/* File Upload Input */}
//             <div className="mb-4">
//               <label
//                 htmlFor="attachment"
//                 className="block text-lg font-semibold mb-2"
//               >
//                 Upload Image or PDF
//               </label>
//               <div className="flex items-center">
//                 <input
//                   type="file"
//                   id="attachment"
//                   accept=".jpg, .jpeg, .png, .pdf"
//                   onChange={(e) => setAttachment(e.target.files[0])}
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="attachment"
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition duration-300"
//                 >
//                   Choose File
//                 </label>
//                 {attachment && (
//                   <span className="ml-4 text-gray-600 truncate max-w-[150px]">
//                     {attachment.name}
//                   </span>
//                 )}
//               </div>
//             </div>
//             {/* Popup Buttons */}
//             <div className="popup-buttons flex justify-end gap-4">
//               <button
//                 onClick={handleSubmitPost}
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600"
//               >
//                 Submit
//               </button>
//               <button
//                 onClick={handleClosePopup}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600"
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* Join Popup */}
//       {showJoinPopup && (
//         <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <motion.div
//             className="popup-content bg-white rounded-lg shadow-lg p-6 w-96"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//           >
//             <h3 className="text-2xl font-semibold mb-4">Join Request</h3>
//             <p className="text-gray-600 mb-6">
//               Do you want to join this class? An OTP will be sent to the class
//               owner for approval.
//             </p>
//             <div className="popup-buttons flex justify-end gap-4">
//               <button
//                 onClick={handleJoinRequest}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
//               >
//                 Send Join Request
//               </button>
//               <button
//                 onClick={() => setShowJoinPopup(false)}
//                 className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-500"
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* OTP Popup */}
//       {showOtpPopup && (
//         <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <motion.div
//             className="popup-content bg-white rounded-lg shadow-lg p-6 w-96"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//           >
//             <h3 className="text-2xl font-semibold mb-4">Enter OTP</h3>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full p-3 border rounded-lg mb-4"
//             />
//             {otpError && <p className="otp-error text-red-500">{otpError}</p>}
//             <div className="popup-buttons flex justify-end gap-4">
//               <button
//                 onClick={handleSubmitOtp}
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600"
//               >
//                 Submit
//               </button>
//               <button
//                 onClick={handleCloseOtpPopup}
//                 className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-500"
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClassesDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ClassesDetails = () => {
  const { classid } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");

  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [attachment, setAttachment] = useState(null);
  const navigate = useNavigate();

  const fetchClassDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_API_BASE_URL
        }/class/getclassbyid/${classid}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setClassroom(data.data);
      } else {
        toast.error(data.message || "Failed to fetch class details");
      }
    } catch (error) {
      toast.error("Error fetching class details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchClassDetails();
  }, [classid]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_BASE_URL}/auth/getuser`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUser(data.data);
        } else {
          toast.error(data.message || "Failed to fetch user data");
        }
      } catch (error) {
        toast.error("An error occurred while fetching user data");
      }
    };

    fetchUser();
  }, []);

  const handleAddPost = () => {
    setShowPopup(true); // Show the popup
  };

  const handleSubmitPost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("description", postDescription);
      formData.append("classId", classid);

      if (attachment) {
        formData.append("attachment", attachment); // Add the attachment file
      }

      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/class/addpost`,
        {
          method: "POST",
          body: formData, // Use FormData to send the file
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Post created successfully");
        setPostTitle(""); // Clear input fields
        setPostDescription("");
        setAttachment(null); // Clear the attachment
        setShowPopup(false); // Close the popup
        fetchClassDetails(); // Optionally refresh posts
      } else {
        toast.error(data.message || "Failed to create post");
      }
    } catch (error) {
      toast.error("An error occurred while creating the post");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Show the popup
  };

  const handleJoinRequest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/class/request-to-join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            classroomId: classid,
            studentEmail: user?.email,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setShowJoinPopup(false);
        setShowOtpPopup(true);
        toast.success("OTP sent to the class owner");
      } else {
        toast.error(data.message || "Failed to send join request");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while sending join request");
    }
  };

  const handleSubmitOtp = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/class/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            classroomId: classid,
            studentEmail: user?.email,
            otp,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOtp("");
        setShowOtpPopup(false);
        toast.success("Successfully joined the class");
        fetchClassDetails(); // Refresh the classroom details
      } else {
        setOtpError(data.message || "Failed to verify OTP");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while verifying OTP");
    }
  };
  const handleCloseOtpPopup = () => {
    setShowOtpPopup(false);
    setOtpError("");
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const isStudent = classroom?.students?.includes(user?.email);
  const isOwner = classroom?.owner == user?._id;

  return (
    <div className="class-details bg-gray-100 p-6 min-h-screen">
      {/* Header Section */}
      <motion.div
        className="section1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg p-6 flex flex-col items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://via.placeholder.com/150" // Dummy image
          alt="Classroom"
          className="class-image rounded-full w-40 h-40 object-cover shadow-lg"
        />
        <h1 className="class-name text-4xl font-bold mt-4">
          {classroom?.name}
        </h1>
        <p className="class-description mt-2 text-lg">
          {classroom?.description}
        </p>

        {isOwner && (
          <motion.button
            className="add-post-btn mt-4 bg-yellow-400 text-black px-6 py-2 rounded-lg shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 duration-0"
            onClick={handleAddPost}
            whileHover={{ scale: 1.1 }}
          >
            Add Post
          </motion.button>
        )}

        {!isStudent && !isOwner && (
          <motion.button
            className="add-post-btn mt-4 bg-blue-400 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-500 transition-transform transform hover:scale-105"
            onClick={() => setShowJoinPopup(true)}
            whileHover={{ scale: 1.1 }}
          >
            Join Class
          </motion.button>
        )}
      </motion.div>

      {/* Posts Section */}

      <div className="post-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {(isStudent || isOwner) && classroom?.posts?.length > 0 ? (
          classroom.posts.map((post, index) => (
            <motion.div
              key={index}
              className="post-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-2 transition-all cursor-pointer"
              // initial={{ opacity: 0, scale: 0.9 }}
              // animate={{ opacity: 1, scale: 1 }}
              // transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {post.title}
              </h3>
              <p className="text-gray-600 mt-2">{post.description}</p>
              <small className="text-gray-500 mt-4 block">
                {new Date(post.createdAt).toLocaleDateString()}
              </small>
              <p className="text-gray-700 mt-2 font-medium">
                Created By: {user?.name}
              </p>

              {/* Check for image or PDF attachment */}
              {post.image && post.image.match(/\.(jpg|jpeg|png|gif)$/i) && (
                <div className="attachment mt-4 flex items-center space-x-2">
                  {/* Image Attachment */}
                  <img
                    src={post.image}
                    alt="Post Attachment"
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  {/* View Image Button */}
                  <a
                    href={post.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    View Image
                  </a>
                </div>
              )}

              {post.pdf && (
                <div className="attachment mt-4 flex items-center space-x-2">
                  {/* PDF Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                    />
                  </svg>
                  {/* View PDF Button */}
                  <a
                    href={post.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    View PDF
                  </a>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No posts available
          </p>
        )}
      </div>

      {/* Add Post Popup */}
      {showPopup && (
        <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            className="popup-content bg-white rounded-lg shadow-lg p-6 w-96"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Add Post</h3>
            {/* Title Input */}
            <input
              type="text"
              placeholder="Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
            {/* Description Input */}
            <textarea
              placeholder="Description"
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
            {/* File Upload Input */}
            <div className="mb-4">
              <label
                htmlFor="attachment"
                className="block text-lg font-semibold mb-2"
              >
                Upload Image or PDF
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="attachment"
                  accept=".jpg, .jpeg, .png, .pdf"
                  onChange={(e) => setAttachment(e.target.files[0])}
                  className="hidden"
                />
                <label
                  htmlFor="attachment"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition duration-300"
                >
                  Choose File
                </label>
                {attachment && (
                  <span className="ml-4 text-gray-600 truncate max-w-[150px]">
                    {attachment.name}
                  </span>
                )}
              </div>
            </div>
            {/* Popup Buttons */}
            <div className="popup-buttons flex justify-end gap-4">
              <button
                onClick={handleSubmitPost}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600"
              >
                Submit
              </button>
              <button
                onClick={handleClosePopup}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Join Popup */}
      {showJoinPopup && (
        <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            className="popup-content bg-white rounded-lg shadow-lg p-6 w-96"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Join Request</h3>
            <p className="text-gray-600 mb-6">
              Do you want to join this class? An OTP will be sent to the class
              owner for approval.
            </p>
            <div className="popup-buttons flex justify-end gap-4">
              <button
                onClick={handleJoinRequest}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
              >
                Send Join Request
              </button>
              <button
                onClick={() => setShowJoinPopup(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            className="popup-content bg-white rounded-lg shadow-lg p-6 w-96"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Enter OTP</h3>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
            {otpError && <p className="otp-error text-red-500">{otpError}</p>}
            <div className="popup-buttons flex justify-end gap-4">
              <button
                onClick={handleSubmitOtp}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600"
              >
                Submit
              </button>
              <button
                onClick={handleCloseOtpPopup}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ClassesDetails;
