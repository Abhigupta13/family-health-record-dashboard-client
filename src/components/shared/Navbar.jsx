import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { StoreContext } from "../../context/StoreContext";
import { AlertTriangle } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { isAuthenticated, logOut } = useContext(StoreContext);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("navbar", !!token);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    const handleRouteChange = () => {
      setOpenDropdown(null);
      setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  // Toggle functions
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const handleLinkClick = () => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
  };

  // Handle Logout
  const handleLogout = () => {
    logOut();
    setIsLogoutPopupOpen(false);
    navigate("/");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-[#0b3558] to-[#1976d2] shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2C5.58 2 2 10s3.58 8 8 8 8-3.58-8-8-3.58-8-8-8zm1 13.41V16h-2v-.59l-4.5-4.5V9h5V6h2v3h5v2l-4.5 4.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-2xl font-bold">FamilyCare+</span>
          </Link>
        </div>

        {/* Hamburger */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg
              className="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6" ref={dropdownRef}>
          <Link to="/" className="text-lg text-white hover:text-yellow-300" onClick={handleLinkClick}>
            Home
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-lg text-white hover:text-yellow-300" onClick={handleLinkClick}>
              Dashboard
            </Link>
          )}
          {/* Features */}
          <div className="relative">
            <button
              className="text-lg text-white hover:text-yellow-300"
              onClick={() => toggleDropdown("features")}
            >
              Features
            </button>
            {openDropdown === "features" && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10">
                <Link to="/health-insight" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
                  Health Insights
                </Link>
                {isAuthenticated && (
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
                    Medical Records
                  </Link>
                )}
                <Link to="/emergency-contact" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
                  Emergency Contacts
                </Link>
              </div>
            )}
          </div>
          {/* Contact */}
          <div className="relative">
            <button
              className="text-lg text-white hover:text-yellow-300"
              onClick={() => toggleDropdown("contact")}
            >
              Contact Us
            </button>
            {openDropdown === "contact" && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10">
                <Link to="/emergency-contact" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
                  Emergency Booking
                </Link>
                <Link to="/contact-us" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
                  Contact Us
                </Link>
                <Link to="/chat-with-us" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
                  Chat with Us
                </Link>
              </div>
            )}
          </div>

          {/* Emergency */}
          <Link
            to="/emergency-contact"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-2xl hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
            onClick={handleLinkClick}
          >
            <AlertTriangle className="w-5 h-5 text-white/90" />
            <span className="font-medium">Emergency</span>
          </Link>

          {/* Profile */}
          {isAuthenticated && (
            <div className="relative">
              <button className="flex items-center text-white" onClick={() => toggleDropdown("profile")}>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                </Avatar>
              </button>
              {openDropdown === "profile" && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10">
                  <Link to="/profile/view-profile" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
                    View Profile
                  </Link>
                  <button
                    onClick={() => setIsLogoutPopupOpen(true)}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pb-4 space-y-2" ref={dropdownRef}>
          <Link
            to="/"
            onClick={handleLinkClick}
            className="block text-lg text-white hover:text-yellow-300"
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              onClick={handleLinkClick}
              className="block text-lg text-white hover:text-yellow-300"
            >
              Dashboard
            </Link>
          )}
          <div>
            <button
              onClick={() => toggleDropdown("features")}
              className="w-full text-left text-lg text-white hover:text-yellow-300"
            >
              Features
            </button>
            {openDropdown === "features" && (
              <div className="ml-4 mt-1 space-y-1">
                <Link to="/health-insight" onClick={handleLinkClick} className="block text-white hover:text-yellow-300">
                  Health Insights
                </Link>
                {isAuthenticated && (
                  <Link to="/dashboard" onClick={handleLinkClick} className="block text-white hover:text-yellow-300">
                    Medical Records
                  </Link>
                )}
                <Link to="/emergency-contact" onClick={handleLinkClick} className="block text-white hover:text-yellow-300">
                  Emergency Contacts
                </Link>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => toggleDropdown("contact")}
              className="w-full text-left text-lg text-white hover:text-yellow-300"
            >
              Contact Us
            </button>
            {openDropdown === "contact" && (
              <div className="ml-4 mt-1 space-y-1">
                <Link to="/emergency-contact" onClick={handleLinkClick} className="block text-white hover:text-yellow-300">
                  Emergency Booking
                </Link>
                <Link to="/contact-us" onClick={handleLinkClick} className="block text-white hover:text-yellow-300">
                  Contact Us
                </Link>
                <Link to="/chat-with-us" onClick={handleLinkClick} className="block text-white hover:text-yellow-300">
                  Chat with Us
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/emergency-contact"
            onClick={handleLinkClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-2xl hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
          >
            <AlertTriangle className="w-5 h-5 text-white/90" />
            Emergency
          </Link>
          {isAuthenticated && (
            <div className="mt-2">
              <Link
                to="/profile/view-profile"
                onClick={handleLinkClick}
                className="block text-lg text-white hover:text-yellow-300"
              >
                View Profile
              </Link>
              <button
                onClick={() => {
                  setIsLogoutPopupOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-lg text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Logout Confirmation Popup */}
      {isLogoutPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-[90%] max-w-md">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">Logging Out</h2>
            <p className="text-gray-600 text-center mt-3">Are you sure you want to log out?</p>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={handleLogout}
                className="px-6 py-3 text-white bg-red-600 rounded-xl shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg active:scale-95"
              >
                Yes, Log out
              </button>
              <button
                onClick={() => setIsLogoutPopupOpen(false)}
                className="px-6 py-3 text-gray-800 bg-gray-200 rounded-xl shadow-md transition-all duration-200 hover:bg-gray-300 hover:shadow-lg active:scale-95"
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
