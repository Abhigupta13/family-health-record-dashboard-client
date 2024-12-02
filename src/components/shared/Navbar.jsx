import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false); // State for Contact Us dropdown
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken); // Set isLoggedIn to true if authToken exists
  }, []);

  // Function to toggle the main menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Function to toggle the Features dropdown
  const toggleFeaturesDropdown = () => {
    setIsFeaturesDropdownOpen(!isFeaturesDropdownOpen);
    setIsProfileDropdownOpen(false); // Close the Profile dropdown when Features is opened
  };

  // Function to toggle the Profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsFeaturesDropdownOpen(false); // Close the Features dropdown when Profile is opened
  };

  // Function to toggle the Contact Us dropdown
  const toggleContactDropdown = () => {
    setIsContactDropdownOpen(!isContactDropdownOpen);
    setIsFeaturesDropdownOpen(false); // Close other dropdowns when Contact Us is opened
    setIsProfileDropdownOpen(false);
  };

  // Function to handle logout action
  const handleLogout = () => {
    // Clear session data (localStorage, cookies, or token)
    localStorage.removeItem("authToken");
    setIsLogoutPopupOpen(false); // Close the popup
    setIsLoggedIn(false); // Update login state
    navigate("/"); // Redirect to home page
  };

  return (
    <nav className="flex w-full items-center justify-between p-6 bg-white text-white shadow-lg relative">
      {/* Logo Section */}
      <div className="text-3xl ml-4 text-[#1569B8] font-bold flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13.41V16h-2v-.59l-4.5-4.5V9h5V6h2v3h5v2l-4.5 4.5z"
            clipRule="evenodd"
          />
        </svg>
        <Link to="/" className="text-4xl font-bold text-[#1569B8]">
          HealthCare
        </Link>
      </div>

      {/* Hamburger Menu Icon for Small Screens */}
      <button
        className="block md:hidden text-white"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:items-center space-y-4 space-x-8 md:space-y-0 mr-8 md:space-x-10`}
      >
        <Link
          to="/"
          className="block md:inline text-xl text-gray-700 hover:text-[#4B6708]"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="block md:inline text-xl text-gray-700 hover:text-[#4B6708]"
        >
          Dashboard
        </Link>

        {/* Features Dropdown */}
        <div className="relative z-40 navbar-dropdown">
          <button
            className="text-xl text-gray-700 hover:text-[#4B6708]"
            onClick={toggleFeaturesDropdown}
          >
            Features
          </button>
          <div
            className={`absolute left-0 mt-2 space-y-2 bg-teal-700 text-white p-4 rounded-md shadow-lg ${
              isFeaturesDropdownOpen ? "block" : "hidden"
            }`}
          >
            <Link
              to="/health-insight"
              className="block text-white hover:text-teal-500"
            >
              Health Insights
            </Link>
            <Link
              to="/dashboard"
              className="block text-white hover:text-teal-500"
            >
              Medical Records
            </Link>
            <Link
              to="/emergency-call"
              className="block text-white hover:text-teal-500"
            >
              Emergency Contacts
            </Link>
          </div>
        </div>

        {/* Contact Us Dropdown */}
        <div className="relative z-40 navbar-dropdown">
          <button
            className="text-xl text-gray-700 hover:text-[#4B6708]"
            onClick={toggleContactDropdown}
          >
            Contact Us
          </button>
          <div
            className={`absolute left-0 mt-2 space-y-2 bg-teal-700 text-white p-4 rounded-md shadow-lg ${
              isContactDropdownOpen ? "block" : "hidden"
            }`}
          >
            <Link
              to="/emergency-call"
              className="block text-white hover:text-teal-500"
            >
              Emergency Booking
            </Link>
            <Link
              to="/contact-us"
              className="block text-white hover:text-teal-500"
            >
              Contact Us
            </Link>
            <Link
              to="/chat-with-us"
              className="block text-white hover:text-teal-500"
            >
              Chat with us
            </Link>
          </div>
        </div>

        {/* Profile Dropdown (Only visible when logged in) */}
        {isLoggedIn && (
          <div className="relative z-40 navbar-dropdown">
            <button
              className="text-xl text-gray-700 hover:text-[#4B6708]"
              onClick={toggleProfileDropdown}
            >
              Profile
            </button>
            <div
              className={`absolute left-0 mt-2 space-y-2 bg-teal-700 text-white p-4 rounded-md shadow-lg ${
                isProfileDropdownOpen ? "block" : "hidden"
              }`}
            >
              <Link
                to="/view-profile"
                className="block text-teal-300 hover:text-[#4B6708]"
              >
                View Profile
              </Link>
              <button
                className="block text-red-500"
                onClick={() => setIsLogoutPopupOpen(true)} // Open the logout confirmation popup
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Popup */}
      {isLogoutPopupOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 popup-container">
          <div className="w-full max-w-md bg-[#D16F6F] p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Logging Out</h2>
            <p className="text-center text-lg mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="w-32 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
              >
                Yes, Log out
              </button>
              <button
                onClick={() => setIsLogoutPopupOpen(false)}
                className="w-32 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
