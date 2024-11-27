import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the main menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Function to toggle the dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="flex w-full max-w-7xl items-center justify-between p-4 bg-teal-600 text-white shadow-lg">
      {/* Logo Section */}
      <div className="text-3xl font-bold flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13.41V16h-2v-.59l-4.5-4.5V9h5V6h2v3h5v2l-4.5 4.5z" clipRule="evenodd" />
        </svg>
        <Link to="/" className="text-3xl font-semibold">HealthApp</Link>
      </div>

      {/* Hamburger Menu Icon for Small Screens */}
      <button
        className="block md:hidden text-white"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6`}
      >
        <Link to="/" className="block md:inline text-lg hover:text-teal-200">Home</Link>
        <Link to="/dashboard" className="block md:inline text-lg hover:text-teal-200">Dashboard</Link>

        {/* Features Dropdown */}
        <div className="relative">
          <button 
            className="text-lg hover:text-teal-200"
            onClick={toggleDropdown}
          >
            Features
          </button>
          <div 
            className={`absolute left-0 mt-2 space-y-2 bg-teal-700 text-white p-4 rounded-md shadow-lg ${
              isDropdownOpen ? 'block' : 'hidden'
            }`}
          >
            <Link to="/feature/1" className="block">Health Insights</Link>
            <Link to="/feature/2" className="block">Medical Records</Link>
            <Link to="/feature/3" className="block">Emergency Contacts</Link>
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button className="text-lg hover:text-teal-200">Profile</button>
          <div className="absolute left-0 hidden mt-2 space-y-2 bg-teal-700 text-white p-4 rounded-md shadow-lg">
            <Link to="/profile" className="block">View Profile</Link>
            <Link to="/settings" className="block">Settings</Link>
            <button className="block text-red-500" onClick={() => console.log("Logout")}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
