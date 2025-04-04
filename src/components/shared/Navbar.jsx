import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { isAuthenticated,logOut } = useContext(StoreContext);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("navbar", token);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

  // Handle Logout
  const handleLogout = () => {
    logOut();
    setIsLogoutPopupOpen(false);
    navigate("/");
  };
  return (
    <nav className="flex w-full items-center justify-between p-5 bg-gradient-to-r from-[#0b3558] to-[#1976d2] shadow-md relative">
   
      <div className="text-3xl text-white font-bold flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2C5.58 2 2 10s3.58 8 8 8 8-3.58-8-8-3.58-8-8-8zm1 13.41V16h-2v-.59l-4.5-4.5V9h5V6h2v3h5v2l-4.5 4.5z"
            clipRule="evenodd"
          />
        </svg>
        <Link to="/" className="text-4xl font-bold text-white">
         FamilyCare+
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
      <div className={`${isMenuOpen ? "block" : "hidden"} md:flex items-center space-x-6`} ref={dropdownRef}>
        <Link to="/" className="text-lg text-white hover:text-yellow-300 transition duration-300">
          Home
        </Link>
        {isAuthenticated && (<Link to="/dashboard" className="text-lg text-white hover:text-yellow-300 transition duration-300">
          Dashboard
        </Link>)}

        {/* Features Dropdown */}
        <div className="relative">
          <button className="text-lg text-white hover:text-yellow-300 transition duration-300" onClick={() => toggleDropdown("features")}>
            Features
          </button>
          {openDropdown === "features" && (
            <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
              <Link to="/health-insight" className="block px-4 py-2 hover:bg-gray-100">
                Health Insights
              </Link>
              {isAuthenticated && (<Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                Medical Records
              </Link>)}
              <Link to="/emergency-call" className="block px-4 py-2 hover:bg-gray-100">
                Emergency Contacts
              </Link>
            </div>
          )}
        </div>

        {/* Contact Dropdown */}
        <div className="relative">
          <button className="text-lg text-white hover:text-yellow-300 transition duration-300" onClick={() => toggleDropdown("contact")}>
            Contact Us
          </button>
          {openDropdown === "contact" && (
            <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
              <Link to="/emergency-call" className="block px-4 py-2 hover:bg-gray-100">
                Emergency Booking
              </Link>
              <Link to="/contact-us" className="block px-4 py-2 hover:bg-gray-100">
                Contact Us
              </Link>
              <Link to="/chat-with-us" className="block px-4 py-2 hover:bg-gray-100">
                Chat with us
              </Link>
            </div>
          )}
        </div>

        {/* Profile Dropdown (Only for logged-in users) */}
        {isAuthenticated && (
          <div className="relative">
            <button className="flex items-center text-white" onClick={() => toggleDropdown("profile")}>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
              </Avatar>
            </button>
            {openDropdown === "profile" && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
                <Link to="/profile/view-profile" className="block px-4 py-2 hover:bg-gray-100">
                  View Profile
                </Link>
                <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100" onClick={() => setIsLogoutPopupOpen(true)}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Logout Confirmation Popup */}
      {isLogoutPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-[90%] max-w-md">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">Logging Out</h2>
            <p className="text-gray-600 text-center mt-3">Are you sure you want to log out?</p>
            
            <div className="flex justify-center mt-6 space-x-4">
              <button onClick={handleLogout} className="px-6 py-3 text-white bg-red-600 rounded-xl shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg active:scale-95">
                Yes, Log out
              </button>
              <button onClick={() => setIsLogoutPopupOpen(false)} className="px-6 py-3 text-gray-800 bg-gray-200 rounded-xl shadow-md transition-all duration-200 hover:bg-gray-300 hover:shadow-lg active:scale-95">
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
