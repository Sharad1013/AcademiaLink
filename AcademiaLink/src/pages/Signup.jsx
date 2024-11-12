import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("student");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, role };
    login(userData);
    navigate("/");
  };

  const handleSendOtp = () => {
    console.log(`OTP sent to: ${email}`);
  };

  return (
    <div className="signup-page h-[calc(100vh-4.5rem)] relative flex justify-center items-center bg-gradient-to-br from-purple-600 to-pink-600 overflow-hidden">
      {/* Floating SVG Backgrounds */}
      <motion.svg
        className="absolute top-10 left-12 w-16 h-16 text-yellow-300"
        animate={{ x: 120, y: 100 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {/* Graduation Cap */}
        <path d="M12 2L1 9l11 7 8-5.4V16h2V9l-9-7z" />
        <path d="M12 12.3L5.2 8 12 4l6.8 4-6.8 4.3zM4.5 10v4.5c0 .8.5 1.4 1.2 1.7L12 19l6.3-2.8c.7-.3 1.2-.9 1.2-1.7V10l-8 4.7-8-4.7z" />
      </motion.svg>

      <motion.svg
        className="absolute bottom-16 right-12 w-12 h-12 text-blue-400"
        animate={{ x: -100, y: 80 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {/* Pencil */}
        <path d="M20.5 3.5a1.5 1.5 0 010 2.12L7.12 19H3v-4.12L15.88 3.5a1.5 1.5 0 012.12 0l2.5 2.5zM8 18H5v3h3v-3z" />
      </motion.svg>

      <motion.svg
        className="absolute top-1/3 left-1/3 w-16 h-16 text-green-400"
        animate={{ x: 150, y: -80 }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {/* Clipboard */}
        <path d="M16 4h3a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h3" />
        <path d="M9 2h6a1 1 0 011 1v1H8V3a1 1 0 011-1zM6 8h12v2H6V8zm0 4h12v2H6v-2zm0 4h8v2H6v-2z" />
      </motion.svg>

      {/* Signup Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Signup</h1>
        <form onSubmit={handleSubmit}>
          <motion.input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-400"
            whileFocus={{ scale: 1.02 }}
          />
          <div className="email-otp-container flex space-x-2">
            <motion.input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-400"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              type="button"
              onClick={handleSendOtp}
              className="send-otp-btn px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-200 text-xs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send OTP
            </motion.button>
          </div>
          <motion.input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full my-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-400"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-400"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-400"
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </motion.select>
          <motion.button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-full transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Signup
          </motion.button>
        </form>

        {/* Login Link */}
        <div className="login-link mt-4">
          <p className="text-gray-600">
            Already have an Account?{" "}
            <NavLink
              to="/login"
              className="text-purple-500 hover:text-purple-600 font-semibold"
            >
              Login
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
