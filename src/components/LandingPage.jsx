import React from "react";
import { Button } from "./ui/button";
import { useNavigate, Link } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

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
          <h1 className="text-4xl mt-20 font-bold mb-4 text-white drop-shadow-lg">
            Family Health Management Simplified
          </h1>
          <p className="text-lg mb-6 text-teal-500 drop-shadow-md">
            Store and monitor your family's health records, prescriptions, and
            treatments in one place.
          </p>
          <Button
            onClick={() => navigate("/login")}
            variant="primary"
            size="lg"
            className="px-6 py-3 mt-5 bg-teal-600 text-white hover:bg-teal-700 transition-colors rounded-xl"
          >
            Get Started
          </Button>
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
          <h2 className="text-3xl font-bold mt-10 text-center mb-10">
            Our Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-10 justify-items-center">
            {/* Health Records Card */}
            <Link
              to="/dashboard"
              className="bg-teal-50 p-10 rounded-3xl h-[250px] w-[250px] shadow-lg hover:shadow-2xl transition-all text-center"
            >
              <h3 className="text-2xl font-semibold text-teal-600 mb-4">
                Health Records
              </h3>
              <p className="text-gray-700">
                Easily manage and access your family's health records and
                treatment history.
              </p>
            </Link>

            {/* Prescription Tracking Card */}
            <Link
              to="/prescription-tracking"
              className="bg-teal-50 p-10 rounded-3xl h-[250px] w-[250px] shadow-lg hover:shadow-2xl transition-all text-center"
            >
              <h3 className="text-2xl font-semibold text-teal-600 mb-4">
                Prescription Tracking
              </h3>
              <p className="text-gray-700">
                Upload prescriptions, get reminders, and track medication
                schedules.
              </p>
            </Link>

            {/* Doctor Access Card */}
            <Link
              to="/doctor-access"
              className="bg-teal-50 p-10 rounded-3xl h-[250px] w-[250px] shadow-lg hover:shadow-2xl transition-all text-center"
            >
              <h3 className="text-2xl font-semibold text-teal-600 mb-4">
                Doctor Access
              </h3>
              <p className="text-gray-700">
                Provide doctors with easy access to medical history during
                emergencies.
              </p>
            </Link>

            {/* Health Support Card */}
            <Link
              to="/health-support"
              className="bg-teal-50 p-10 h-[250px] w-[250px] rounded-3xl shadow-lg hover:shadow-2xl transition-all text-center"
            >
              <h3 className="text-2xl font-semibold text-teal-600 mb-4">
                Health Support
              </h3>
              <p className="text-gray-700">
                It helps manage and improve well-being through medical care and
                advice.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
