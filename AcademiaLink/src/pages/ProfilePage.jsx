import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [classroomName, setClassroomName] = useState("");
  const [description, setDescription] = useState("");
  const [classroomsCreatedByMe, setClassroomsCreatedByMe] = useState([]);
  const [classroomsJoinedByMe, setClassroomsJoinedByMe] = useState([]);

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
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/class/classroomscreatedbyme`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setClassroomsCreatedByMe(data.data);
      } else {
        toast.error(data.message || "Failed to fetch classrooms");
      }
    } catch (error) {
      toast.error("An error occurred while fetching classrooms");
    }
  };
  const fetchClassroomsJoinedByMe = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/class/classroomsforstudent`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setClassroomsJoinedByMe(data.data);
      }
    } catch (error) {
      toast.error("An error occurred while fetching joined classrooms");
    }
  };

  useEffect(() => {
    if (user) {
      fetchClassrooms();
      //   fetchClassroomsJoinedByMe();
    }
  }, [user]);

  const handleCreateClassroom = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/class/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: classroomName,
            description,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Classroom created successfully");
        setClassroomName("");
        setDescription("");
        setShowPopup(false);
        fetchClassrooms();
      } else {
        toast.error(data.message || "Failed to create classroom");
      }
    } catch (error) {
      toast.error("An error occurred while creating classroom");
    }
  };

  const navigate = useNavigate();
  const handleRowClick = (classroomId) => {
    navigate(`/classes/${classroomId}`); // Navigate to the class details page
  };

  return (
    <div className="profile-page bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 min-h-screen p-8">
      {loading ? (
        <div className="loading flex items-center justify-center text-lg text-gray-700 font-semibold">
          Loading...
        </div>
      ) : user ? (
        <>
          <motion.h1
            className="text-4xl font-extrabold text-center mb-8 text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Your Profile
          </motion.h1>

          <motion.div
            className="profile-info bg-white rounded-xl shadow-xl p-8 flex items-center space-x-6 max-w-4xl mx-auto mb-8 gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={user.profilePicture || "default-profile.png"}
              alt="Profile"
              className="profile-picture w-32 h-32 rounded-full object-cover border-4 border-gradient-to-r from-blue-500 to-purple-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="profile-details">
              <motion.h2
                className="text-3xl font-bold text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {user.name}
              </motion.h2>
              <p className="text-gray-600 text-lg ">Email: {user.email}</p>
              <p className="text-gray-600 text-lg">Role: {user.role.toUpperCase()}</p>
              {user.role === "teacher" && (
                <motion.button
                  className="create-classroom-btn mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg rounded-lg shadow-lg hover:scale-105 transform transition"
                  onClick={() => setShowPopup(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Classroom
                </motion.button>
              )}
            </div>
          </motion.div>

          {showPopup && (
            <div className="popup-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <motion.div
                className="popup-content bg-white p-8 rounded-xl shadow-2xl w-96 space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-gray-800">
                  Create Classroom
                </h3>
                <input
                  type="text"
                  placeholder="Classroom Name"
                  value={classroomName}
                  onChange={(e) => setClassroomName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg"
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg"
                />
                <div className="popup-buttons flex justify-between space-x-4">
                  <button
                    onClick={handleCreateClassroom}
                    className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {user.role === "teacher" && (
            <motion.div
              className="classroom-list bg-white p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Classrooms created by me
              </h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-4 px-6 font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="py-4 px-6 font-semibold text-gray-700">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classroomsCreatedByMe.map((classroom) => (
                    <motion.tr
                      key={classroom._id}
                      onClick={() => handleRowClick(classroom._id)}
                      className="hover:bg-gray-100 cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="py-4 px-6 border-b">{classroom.name}</td>
                      <td className="py-4 px-6 border-b">
                        {classroom.description}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
          {user.role === "student" && (
            <motion.div
              className="classroom-list bg-white p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Classrooms joined by me
              </h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-4 px-6 font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="py-4 px-6 font-semibold text-gray-700">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classroomsJoinedByMe.map((classroom) => (
                    <motion.tr
                      key={classroom._id}
                      onClick={() => handleRowClick(classroom._id)}
                      className="hover:bg-gray-100 cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="py-4 px-6 border-b">{classroom.name}</td>
                      <td className="py-4 px-6 border-b">
                        {classroom.description}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-6">
          No user data found.
        </p>
      )}
    </div>
  );
};

export default ProfilePage;
