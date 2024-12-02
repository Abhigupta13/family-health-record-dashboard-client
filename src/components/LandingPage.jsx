import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useNavigate, Link } from "react-router-dom";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in (use your actual login check here)
    const user = localStorage.getItem("user"); // Example check
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section with Background Image */}
      <section
        className="text-white items-center justify-center py-20 h-[630px]"
        style={{
          backgroundImage:
            'url("https://cdn.pixabay.com/photo/2022/03/27/08/46/medicine-7094412_1280.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-5xl mt-12 font-bold mb-4 text-white drop-shadow-lg">
            Family Health Management Simplified
          </h1>
          <p className="text-lg mb-6 text-teal-500 drop-shadow-md">
            Store and monitor your family's health records, prescriptions, and
            treatments in one place.
          </p>

          {!isLoggedIn ? (
            <Button
              onClick={() => navigate("/login")}
              variant="primary"
              size="2xl"
              className="px-6 py-3 mt-4 bg-teal-600 text-white hover:bg-teal-700 transition-colors rounded-xl"
            >
              Get Started
            </Button>
          ) : (
            <p className="text-lg text-teal-500 mt-4">
              Welcome to your Family Health Dashboard. Track and manage health
              information seamlessly.
            </p>
          )}
        </div>
      </section>

      {/* Features Section */}
      <div className="flex justify-center">
        <section
          className="w-full"
          style={{
            backgroundImage:
              'url("https://cdn.pixabay.com/photo/2022/12/19/06/57/stethoscope-7664838_1280.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center 45%",
          }}
        >
          <h2 className="text-4xl font-bold mt-10 text-center mb-10">
            Our Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-10 justify-items-center">
            {/* Feature Cards */}
            <Link to="/dashboard" className="feature-card">
              <h3 className="feature-card-title">Health Records</h3>
              <p className="feature-card-description">
                Manage important medical information, diagnoses, treatments,
                and test results all in one place.
              </p>
            </Link>
            {/* Additional Cards... */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
