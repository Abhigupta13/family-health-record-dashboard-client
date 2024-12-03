import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

const ViewProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [notifications, setNotifications] = useState({
    reminders: false,
    alerts: false,
  });

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

      {/* Content */}
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
    </div>
  );
};

export default ViewProfile;
