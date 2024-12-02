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
          <h1 className="text-5xl mt-12 font-bold mb-4 text-white drop-shadow-lg">
            Family Health Management Simplified
          </h1>
          <p className="text-lg mb-6 text-teal-500 drop-shadow-md">
            Store and monitor your family's health records, prescriptions, and
            treatments in one place.
          </p>
          <Button
            onClick={() => navigate("/login")}
            variant="primary"
            size="2xl"
            className="px-6 py-3 mt-4 bg-teal-600 text-white hover:bg-teal-700 transition-colors rounded-xl"
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
          <h2 className="text-4xl font-bold mt-10 text-center mb-10">
            Our Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-10 justify-items-center">
            {/* Health Records Card */}
            <Link
              to="/dashboard"
              className="bg-teal-50 p-10 rounded-3xl h-[300px] w-[450px] shadow-lg hover:shadow-2xl transition-all text-center"
            >
              <h3 className="text-3xl font-semibold text-teal-600 mb-4">
                Health Records
              </h3>
              <p className="text-gray-700 text-md">
                Health records are digital files that contain important medical
                information such as diagnoses, treatments, medications, and test
                results. They provide easy access to essential health data,
                helping individuals and healthcare providers manage care
                efficiently.
              </p>
            </Link>

            {/* Prescription Tracking Card */}
            <Link
              to="/prescription-tracking"
              className="bg-teal-50 p-10 rounded-3xl h-[300px] w-[450px] shadow-lg hover:shadow-2xl transition-all text-center"
            >
              <h3 className="text-3xl font-semibold text-teal-600 mb-4">
                Prescription Tracking
              </h3>
              <p className="text-gray-700 text-md">
                Prescription tracking helps users monitor medications, track
                dosage, and manage refills. It ensures timely adherence and
                provides a clear history for better healthcare management.
              </p>
            </Link>

            {/* Doctor Access Card */}
            <Link
              to="/doctor-access"
              className="bg-teal-50 p-10 rounded-3xl h-[300px] w-[450px] shadow-lg hover:shadow-2xl transition-all text-center"
            >
              <h3 className="text-3xl font-semibold text-teal-600 mb-4">
                Doctor Access
              </h3>
              <p className="text-gray-700 text-md">
                Doctor access allows users to easily share health records with
                healthcare providers, enabling timely consultations and informed
                decision-making. It streamlines communication for better care
                coordination.
              </p>
            </Link>

            {/* Health Support Card */}
            <Link
              to="/health-support"
              className="bg-teal-50 p-10 h-[300px] w-[450px] rounded-3xl shadow-lg hover:shadow-2xl transition-all text-center"
            >
              <h3 className="text-3xl font-semibold text-teal-600 mb-4">
                Health Support
              </h3>
              <p className="text-gray-700 text-md">
                Health support offers assistance through personalized care
                plans, wellness tips, and expert advice. It ensures continuous
                guidance for maintaining and improving overall health.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
