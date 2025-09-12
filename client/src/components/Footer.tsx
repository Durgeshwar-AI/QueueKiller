import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-white py-6 mt-12 w-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-lg">QueueKiller</span> &copy;{" "}
          2025
        </div>
        <div className="flex space-x-6">
          <a
            href="/about"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Contact
          </a>
          <a
            href="https://github.com/Durgeshwar-AI/QueueKiller"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
