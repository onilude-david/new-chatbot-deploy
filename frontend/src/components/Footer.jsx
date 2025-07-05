import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-white text-sm font-medium">
            Copyright © {currentYear} Lantern Books, All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white hover:text-pink-100 transition-colors duration-300 font-medium">
              Home
            </a>
            <a href="#" className="text-white hover:text-pink-100 transition-colors duration-300 font-medium">
              About Us
            </a>
            <a href="#" className="text-white hover:text-pink-100 transition-colors duration-300 font-medium">
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 