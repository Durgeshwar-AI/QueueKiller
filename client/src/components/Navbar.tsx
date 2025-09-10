import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Dummy auth state, replace with real auth logic
const isLoggedIn = false;

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const sidebarVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
};

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              QueueKiller
            </Link>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            {!isLoggedIn && (
              <Link
                to="/register"
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Register
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Open sidebar"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-6 md:hidden"
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="self-end mb-8 text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Close sidebar"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 text-lg hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {!isLoggedIn && (
                <Link
                  to="/register"
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => setSidebarOpen(false)}
                >
                  Register
                </Link>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
