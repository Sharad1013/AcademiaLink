import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const { auth, logout } = useAuth();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
    >
      {/* Left Side: Logo and Search */}
      <div className="navbar-left flex items-center space-x-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <NavLink
            to="/"
            className="logo text-2xl font-bold hover:text-yellow-300"
          >
            <motion.div className="flex items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
              <div className="head">
                Academia<span className="text-yellow-300">Link</span>
              </div>
            </motion.div>
          </NavLink>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Search Classrooms"
            className="search-input pl-10 pr-4 py-2 rounded-full bg-white text-gray-800 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 w-5 h-5 text-gray-400 absolute top-2.5 left-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </motion.div>
      </div>

      {/* Right Side: Profile / Login */}
      <div className="navbar-right flex items-center space-x-4">
        {auth?.user ? (
          <>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <NavLink
                to="/profile"
                className="profile-icon flex items-center space-x-2 hover:text-yellow-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="hidden md:inline-block font-semibold">
                  Profile
                </span>
              </NavLink>
            </motion.div>
            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="logout-btn px-4 py-2 bg-red-500 text-white rounded-full 
              hover:bg-red-600 transition ease-in-out duration-200 font-semibold"
            >
              Logout
            </motion.button>
          </>
        ) : (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <NavLink
              to="/login"
              className="login-btn px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-full 
              hover:bg-yellow-500 transition ease-in-out duration-200"
            >
              Login
            </NavLink>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
