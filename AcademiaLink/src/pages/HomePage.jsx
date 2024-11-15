import React from "react";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomePage = () => {
  return (
    <div className="relative bg-gray-100 text-gray-800 font-sans overflow-x-hidden">
      
      {/* First Screen: Highlight About AcademiaLink */}
      <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 relative">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-50 animate-bounce"
          style={{ animationDuration: "2s" }}
        />
        <motion.div
          className="absolute top-1/4 right-10 w-40 h-40 bg-yellow-300 rounded-full opacity-30 animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          Welcome to AcademiaLink
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          The platform connecting educators across the world. Share ideas,
          resources, and grow together.
        </motion.p>
        {/* <motion.button
          className="px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Get Started
        </motion.button> */}
      </section>

      {/* Background Criss-Cross Pattern and Squares */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 bg-blue-500 opacity-30 transform rotate-45 -z-10"></div>
        <div className="absolute top-1/4 right-0 w-48 h-48 bg-purple-600 opacity-30 transform rotate-45 -z-10"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-green-400 opacity-30 transform rotate-45 -z-10"></div>
      </div>

      {/* Second Screen: Updated Carousel with Quotes */}
      <section className="flex items-center flex-col p-16 mt-10 h-screen text-center">
        <h2 className="text-3xl font-semibold mb-6 text-black">
          Inspiration for Educators
        </h2>
        <Carousel
          autoPlay
          infiniteLoop
          interval={4000}
          showThumbs={false}
          className="h-[90%] flex rounded-xl shadow-lg bg-gradient-to-b from-yellow-500 via-red-500 to-pink-500 p-4 "
        >
          <div className="relative h-screen rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1659301254614-8d6a9d46f26a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Teaching profession"
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
            />
            <div className="p-12 rounded-lg shadow-xl text-black h-[80%] w-[100%] z-10 border-none bg-transparent flex items-center justify-center">
              <div>
                <h3 className="text-2xl font-medium mb-4">
                  "Teaching is the one profession that creates all other
                  professions."
                </h3>
                <p className="text-lg">- Unknown</p>
              </div>
            </div>
          </div>
          <div className="relative h-screen rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1616330682546-2468b2d8dd17?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
              alt="Learning with heart"
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
            />
            <div className="p-12 rounded-lg shadow-xl text-black h-[80%] w-[100%] z-10 flex items-center justify-center">
              <div>
                <h3 className="text-2xl font-medium mb-4">
                  "Educating the mind without educating the heart is no
                  education at all."
                </h3>
                <p className="text-lg">- Aristotle</p>
              </div>
            </div>
          </div>
          <div className="relative h-screen rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Creating your future"
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
            />
            <div className="p-12 rounded-lg shadow-xl text-black h-[80%] w-[100%] z-10 flex items-center justify-center">
              <div>
                <h3 className="text-2xl font-medium mb-4">
                  "The best way to predict your future is to create it."
                </h3>
                <p className="text-lg">- Abraham Lincoln</p>
              </div>
            </div>
          </div>
        </Carousel>
      </section>

      {/* Third Screen: Updated Features */}
      <section className="p-16 bg-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Features of AcademiaLink
        </h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Networking</h3>
            <p className="text-gray-600">
              Connect with educators, share insights, and collaborate on
              projects.
            </p>
          </div>
          <div className="text-center p-8 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Learning Resources</h3>
            <p className="text-gray-600">
              Access a wide variety of teaching materials and study resources.
            </p>
          </div>
          <div className="text-center p-8 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Ask Questions</h3>
            <p className="text-gray-600">
              Got doubts? Ask questions to educators and get help in real time!
            </p>
          </div>
        </div>
      </section>

      {/* Fourth Screen: User Stats */}
      <section className="p-16 bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 text-center text-white">
        <h2 className="text-3xl font-semibold mb-6">AcademiaLink in Numbers</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white text-center p-8 rounded-lg shadow-xl">
            <h3 className="text-3xl font-bold text-gray-800">500+</h3>
            <p className="text-gray-600">Educators</p>
          </div>
          <div className="bg-white text-center p-8 rounded-lg shadow-xl">
            <h3 className="text-3xl font-bold text-gray-800">10,000+</h3>
            <p className="text-gray-600">Students</p>
          </div>
          <div className="bg-white text-center p-8 rounded-lg shadow-xl">
            <h3 className="text-3xl font-bold text-gray-800">100+</h3>
            <p className="text-gray-600">Interactive Courses</p>
          </div>
        </div>
      </section>

      {/* Fifth Screen: Topper Kid Section */}
      <section className="p-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Our Collaborative Tactics for Success
        </h2>
        <div className="flex justify-center mb-8">
          <img
            src="https://i.pinimg.com/originals/36/fe/bf/36febf3d211cd915ed42b9970a4569ae.gif"
            alt="Topper Kid"
            className="w-96 bg-none"
          />
        </div>
        <p className="text-lg font-semibold text-gray-800">
          "Studying together always makes learning more effective. AcademiaLink
          helps you to connect with others and grow as a team!"
        </p>
      </section>

      {/* Sixth Screen: Contact Form */}
      <section className="p-16 bg-gradient-to-r from-indigo-600 to-blue-500">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">
          Contact Us
        </h2>
        <form className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl">
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-semibold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-800 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 flex flex-col justify-evenly text-white py-8 text-center">
        <p>&copy; 2024 AcademiaLink. All rights reserved.</p>
        <div className="mt-4 flex flex-col items-center justify-center gap-2">
          <p>Created by Sharad Sinha</p>
          <p>
            Email:{" "}
            <a href="mailto:sharadsinha8789@gmail.com" className="underline">
              sharadsinha8789@gmail.com
            </a>
          </p>
          <p>Company: AcademiaLink Inc.</p>
          <p>Address: 1234 Education St, Knowledge City, EDU 5678</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
