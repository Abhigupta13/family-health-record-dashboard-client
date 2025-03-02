import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import Navbar from "./shared/Navbar";

// Custom Toggle Switch Component
const ToggleSwitch = ({ id, checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-12 h-7 bg-gray-300 peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
    </label>
  );
};

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [notifications, setNotifications] = useState({
    reminders: false,
    alerts: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: "Abhishek Gupta",
        email: "abhishek.akg13@gmail.com",
        phone: "8107843028",
        address: "IIIT Ranchi, Jharkhand",
        profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ48JWGkSOWJegd_jiLj6C5cz-Ityd6OMLR-w&s",
      });
      setUpdatedUser({
        name: "Abhishek Gupta",
        email: "abhishek.akg13@gmail.com",
        phone: "8107843028",
        address: "IIIT Ranchi, Jharkhand",
      });
    }, 1000);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    setUser(updatedUser);
    setEditMode(false);
  };

  const handleNotificationChange = (id) => {
    setNotifications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-left text-teal-600 mb-6">
          Profile
        </h1>

        {!user ? (
          <Skeleton className="h-40 w-full mb-6" />
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center w-full ms-24 gap-36">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-teal-500"
              />
              <div className="text-left">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>
                <p className="text-gray-600">{user.address}</p>
                <Button
                  onClick={() => setEditMode(true)}
                  className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-all"
                >
                  Update Profile
                </Button>
              </div>
            </div>

            {editMode && (
              <form onSubmit={handleUpdate} className="mt-6 w-full">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-md font-medium text-gray-600">Name</Label>
                  <Input
                    type="text"
                    value={updatedUser.name}
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, name: e.target.value })
                    }
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <Label className="block text-md font-medium text-gray-600">Email</Label>
                  <Input
                    type="email"
                    value={updatedUser.email}
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, email: e.target.value })
                    }
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <Label className="block text-md font-medium text-gray-600">Phone</Label>
                  <Input
                    type="tel"
                    value={updatedUser.phone}
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, phone: e.target.value })
                    }
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <Label className="block text-md font-medium text-gray-600">Address</Label>
                  <Input
                    type="text"
                    value={updatedUser.address}
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, address: e.target.value })
                    }
                    className="mt-1 w-full"
                  />
                </div>
              </div>
            
              <div className="flex justify-end gap-4 mt-4">
                <Button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all"
                >
                  Save Changes
                </Button>
              </div>
            </form>
            
            )}
          </div>
        )}

        {user && (
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Health Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <Label htmlFor="reminders" className="text-gray-600">
                  Enable Medication Reminders
                </Label>
                <ToggleSwitch
                  id="reminders"
                  checked={notifications.reminders}
                  onChange={() => handleNotificationChange("reminders")}
                />
              </div>
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <Label htmlFor="alerts" className="text-gray-600">
                  Receive Health Alerts
                </Label>
                <ToggleSwitch
                  id="alerts"
                  checked={notifications.alerts}
                  onChange={() => handleNotificationChange("alerts")}
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ViewProfile;
