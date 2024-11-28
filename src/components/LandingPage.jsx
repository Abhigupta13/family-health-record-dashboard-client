import React from "react";
import { Button } from "./ui/button";
import { useNavigate, Link } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section with Background Image */}
      <section
        className="text-white py-20"
        style={{
          backgroundImage: 'url("https://cdn.pixabay.com/photo/2022/03/27/08/46/medicine-7094412_1280.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
            Family Health Management Simplified
          </h1>
          <p className="text-lg mb-6 text-teal-500 drop-shadow-md">
            Store and monitor your family's health records, prescriptions, and treatments in one place.
          </p>
          <Button
            onClick={() => navigate("/login")}
            variant="primary"
            size="lg"
            className="px-6 py-3 bg-teal-600 text-white hover:bg-teal-700 transition-colors"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16"
        style={{
          backgroundImage: 'url("https://cdn.pixabay.com/photo/2022/12/19/06/57/stethoscope-7664838_1280.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-10">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Health Records Card */}
          <Link to="/dashboard" className="bg-teal-50 ml-2 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">Health Records</h3>
            <p className="text-gray-700">
              Easily manage and access your family's health records and treatment history.
            </p>
          </Link>

          {/* Prescription Tracking Card */}
          <Link to="/prescription-tracking" className="bg-teal-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">Prescription Tracking</h3>
            <p className="text-gray-700">
              Upload prescriptions, get reminders, and track medication schedules.
            </p>
          </Link>

          {/* Doctor Access Card */}
          <Link to="/doctor-access" className="bg-teal-50 mr-2 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">Doctor Access</h3>
            <p className="text-gray-700">
              Provide doctors with easy access to medical history during emergencies.
            </p>
          </Link>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-100 py-10 text-center"
        style={{
          backgroundImage: 'url("https://cdn.pixabay.com/photo/2016/01/31/15/22/mother-1171569_1280.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center 30%", // Move the image down
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Join Thousands of Families</h2>
        <p className="mb-6">
          Start managing your family's health with ease today.
        </p>
        <Button
          onClick={() => navigate("/signup")}
          variant="outline"
          size="lg"
          className="text-teal-600 border-teal-600 hover:bg-teal-600 hover:text-white transition-colors"
        >
          Sign Up Now
        </Button>
      </section>
    </div>
  );
};

export default LandingPage;
