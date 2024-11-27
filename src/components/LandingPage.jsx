import React from "react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader } from "./ui/card";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Family Health Management Simplified
          </h1>
          <p className="text-lg mb-6">
            Store and monitor your family's health records, prescriptions, and
            treatments in one place.
          </p>
          <Button onClick={() => navigate("/login")} variant="primary" size="lg" className="px-6 py-3">
            Get Started
          </Button>
        </div>
      </section>

      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Health Records</h3>
            </CardHeader>
            <CardDescription>
              <p>
                Easily manage and access your family's health records and
                treatment history.
              </p>
            </CardDescription>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Prescription Tracking</h3>
            </CardHeader>
            <CardDescription>
              <p>
                Upload prescriptions, get reminders, and track medication
                schedules.
              </p>
            </CardDescription>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Doctor Access</h3>
            </CardHeader>
            <CardDescription>
              <p>
                Provide doctors with easy access to medical history during
                emergencies.
              </p>
            </CardDescription>
          </Card>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-100 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Thousands of Families</h2>
        <p className="mb-6">
          Start managing your family's health with ease today.
        </p>
        <Button variant="secondary" size="lg">
          Sign Up Now
        </Button>
      </section>
    </div>
  );
};

export default LandingPage;
