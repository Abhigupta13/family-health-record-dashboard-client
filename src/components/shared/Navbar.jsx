import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on mount
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  // Toggle functions
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleFeaturesDropdown = () => {
    setIsFeaturesDropdownOpen(!isFeaturesDropdownOpen);
    setIsProfileDropdownOpen(false);
    setIsContactDropdownOpen(false);
  };
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsFeaturesDropdownOpen(false);
    setIsContactDropdownOpen(false);
  };
  const toggleContactDropdown = () => {
    setIsContactDropdownOpen(!isContactDropdownOpen);
    setIsFeaturesDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLogoutPopupOpen(false);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="flex w-full items-center justify-between p-5 bg-gradient-to-r from-[#0b3558] to-[#1976d2] shadow-md relative">
      {/* Logo Section */}
      <div className="text-3xl text-white font-bold flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13.41V16h-2v-.59l-4.5-4.5V9h5V6h2v3h5v2l-4.5 4.5z"
            clipRule="evenodd"
          />
        </svg>
        <Link to="/" className="text-4xl font-bold text-white">
          HealthCare
        </Link>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <button className="block md:hidden text-white" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Navigation Links */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:flex items-center space-x-6`}>
        <Link to="/" className="text-lg text-white hover:text-yellow-300 transition duration-300">
          Home
        </Link>
        <Link to="/dashboard" className="text-lg text-white hover:text-yellow-300 transition duration-300">
          Dashboard
        </Link>

        {/* Features Dropdown */}
        <div className="relative group">
          <button className="text-lg text-white hover:text-yellow-300 transition duration-300" onClick={toggleFeaturesDropdown}>
            Features
          </button>
          <div className={`absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${isFeaturesDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"}`}>
            <Link to="/health-insight" className="block px-4 py-2 hover:bg-gray-300">
              Health Insights
            </Link>
            <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-300">
              Medical Records
            </Link>
            <Link to="/emergency-call" className="block px-4 py-2 hover:bg-gray-300">
              Emergency Contacts
            </Link>
          </div>
        </div>

        {/* Contact Dropdown */}
        <div className="relative group">
          <button className="text-lg text-white hover:text-yellow-300 transition duration-300" onClick={toggleContactDropdown}>
            Contact Us
          </button>
          <div className={`absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${isContactDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"}`}>
            <Link to="/emergency-call" className="block px-4 py-2 hover:bg-gray-300">
              Emergency Booking
            </Link>
            <Link to="/contact-us" className="block px-4 py-2 hover:bg-gray-300">
              Contact Us
            </Link>
            <Link to="/chat-with-us" className="block px-4 py-2 hover:bg-gray-300">
              Chat with us
            </Link>
          </div>
        </div>

        {/* Profile Dropdown (Only for logged-in users) */}
        {isLoggedIn && (
          <div className="relative group">
            <button className="flex items-center text-white" onClick={toggleProfileDropdown}>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
              </Avatar>
            </button>
            <div className={`absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${isProfileDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"}`}>
              <Link to="/profile/view-profile" className="block px-4 py-2 hover:bg-gray-300">
                View Profile
              </Link>
              <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-300" onClick={() => setIsLogoutPopupOpen(true)}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Popup */}
      {isLogoutPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Logging Out</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleLogout}>
                Yes, Log out
              </button>
              <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={() => setIsLogoutPopupOpen(false)}>
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
