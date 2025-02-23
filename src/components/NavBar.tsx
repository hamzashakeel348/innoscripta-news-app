import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Import hamburger and close icons

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 bg-white">
      {/* Logo */}
      <h1 className="text-2xl font-bold">News Aggregator</h1>

      {/* Hamburger Button - Visible on Mobile */}
      <button
        className="lg:hidden block text-3xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX /> : <HiMenu />}{" "}
        {/* Toggle between menu and close icon */}
      </button>

      {/* Navigation Links */}
      <nav
        className={`lg:flex gap-5 absolute lg:static top-16 left-0 w-full bg-white lg:w-auto p-5 lg:p-0 shadow-md lg:shadow-none transition-transform ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link
          to="/"
          className="block lg:inline-block p-2 text-blue-600 hover:underline"
        >
          Home
        </Link>
        <Link
          to="/feed"
          className="block lg:inline-block p-2 text-blue-600 hover:underline"
        >
          Personalized Feed
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
