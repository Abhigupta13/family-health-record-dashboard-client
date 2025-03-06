import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session data (localStorage, cookies, or token)
    localStorage.removeItem("token"); // Or use another method to clear your session/cookie

    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99999]">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg relative z-[100000]">
        <h2 className="text-2xl font-bold text-center mb-6">Logging Out</h2>
        <p className="text-center text-lg mb-6">Are you sure you want to log out?</p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleLogout}
            className="w-32 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
          >
            Yes, Log out
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-32 bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
