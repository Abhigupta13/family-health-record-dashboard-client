import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const [activeTab, setActiveTab] = useState("signup"); // Tab state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [notifications, setNotifications] = useState({
    reminders: false,
    alerts: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    // If no errors, navigate to /login
    if (Object.keys(newErrors).length === 0) {
      alert("Sign-Up Successful!");
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.id]: "",
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.id]: e.target.checked,
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">
        Profile Management
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8 space-x-6">
        <button
          onClick={() => setActiveTab("signup")}
          className={`px-4 py-2 font-medium text-lg rounded-xl ${
            activeTab === "signup" ? "bg-teal-600 text-white" : "bg-gray-200"
          }`}
        >
          Sign-Up
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`px-4 py-2 font-medium text-lg rounded-xl ${
            activeTab === "details" ? "bg-teal-600 text-white" : "bg-gray-200"
          }`}
        >
          Details
        </button>
      </div>

      {/* Content */}
      {activeTab === "signup" && (
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Create Your Account
          </h2>
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="text-left">
              <Label
                htmlFor="name"
                className="block text-md font-medium text-gray-600"
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="text-left">
              <Label
                htmlFor="email"
                className="block text-md font-medium text-gray-600"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="text-left">
              <Label
                htmlFor="password"
                className="block text-md font-medium text-gray-600"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full bg-teal-600 text-white py-2">
              Sign Up
            </Button>
          </form>
        </section>
      )}

      {activeTab === "details" && (
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Profile & Settings
          </h2>

          {/* User Settings */}
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="text-left">
              <Label
                htmlFor="name"
                className="block text-md font-medium text-gray-600"
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="mt-1 w-full"
              />
            </div>
            <div className="text-left">
              <Label
                htmlFor="email"
                className="block text-md font-medium text-gray-600"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="mt-1 w-full"
              />
            </div>
            <Button type="submit" className="bg-teal-600 text-white px-3 py-4 h-12 rounded-xl">
              Update Settings
            </Button>
          </form>

          {/* Health Notifications */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Health Notifications
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Checkbox
                  id="reminders"
                  checked={notifications.reminders}
                  onChange={handleNotificationChange}
                />
                <Label htmlFor="reminders" className="ml-3 text-gray-600">
                  Enable Medication Reminders
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="alerts"
                  checked={notifications.alerts}
                  onChange={handleNotificationChange}
                />
                <Label htmlFor="alerts" className="ml-3 text-gray-600">
                  Receive Health Alerts
                </Label>
              </div>
            </div>
          </section>
        </section>
      )}
    </div>
  );
};

export default ViewProfile;
