import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, role: "student" };
    login(userData);
    navigate("/");
  };

  return (
    <div
      className="login-page h-[calc(100vh-4.5rem)] relative flex justify-center items-center 
      bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden"
    >
      {/* Floating SVG Background */}
      <motion.div
        className="absolute -top-20 -left-20 bg-yellow-400 rounded-full w-56 h-56 opacity-50"
        animate={{ x: 800, y: 600 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-10 right-10 bg-pink-400 rounded-full w-40 h-40 opacity-50"
        animate={{ x: -500, y: -500 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <motion.input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-400"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-400"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-full transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        {/* Sign-Up Link */}
        <div className="signup-link mt-4">
          <p className="text-gray-600">
            Don't have an Account?{" "}
            <NavLink
              to="/signup"
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
