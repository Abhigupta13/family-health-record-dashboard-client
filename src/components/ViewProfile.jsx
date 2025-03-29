import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "@/utils/constant";

// Custom Toggle Switch Component
const ToggleSwitch = ({ id, checked, onChange, disabled }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only peer"
      />
      <div className={`w-12 h-7 ${disabled ? 'bg-gray-200' : 'bg-gray-300'} peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600`}></div>
    </label>
  );
};

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [notifications, setNotifications] = useState({
    medication_reminders: false,
    health_alerts: false,
    email_notifications: false,
    sms_notifications: false,
    app_notifications: false
  });
  const [previewPic, setPreviewPic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingNotification, setUpdatingNotification] = useState(false);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        if (data.success) {
          setUser(data.data);
          setUpdatedUser(data.data);
          // Set all notification preferences from the response
          setNotifications({
            medication_reminders: data.data.notificationPreferences?.medication_reminders || false,
            health_alerts: data.data.notificationPreferences?.health_alerts || false,
            email_notifications: data.data.notificationPreferences?.email_notifications || false,
            sms_notifications: data.data.notificationPreferences?.sms_notifications || false,
            app_notifications: data.data.notificationPreferences?.app_notifications || false
          });
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Append user data to FormData
      Object.keys(updatedUser).forEach(key => {
        if (updatedUser[key]) {
          formData.append(key, updatedUser[key]);
        }
      });

      // Append file if there's a new profile picture
      if (previewPic && previewPic.startsWith('data:')) {
        // Convert base64 to file
        const response = await fetch(previewPic);
        const blob = await response.blob();
        formData.append('image', blob, 'profile.jpg');
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      if (data.success) {
        setUser(data.data);
        setEditMode(false);
        toast.success('Profile updated successfully!');
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile: ' + err.message);
    }
  };

  const handleNotificationChange = async (id) => {
    try {
      setUpdatingNotification(true);
      const token = localStorage.getItem('token');
      const newNotifications = {
        ...notifications,
        [id]: !notifications[id]
      };

      const response = await fetch(`${API_BASE_URL}/api/notifications/update-preferences`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          notifications: newNotifications
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update notifications');
      }

      const data = await response.json();
      if (data.success) {
        setNotifications(newNotifications);
        toast.success('Notification preferences updated');
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error('Error updating notifications:', err);
      setNotifications(notifications); // Revert changes
      toast.error('Failed to update notification preferences');
    } finally {
      setUpdatingNotification(false);
    }
  };


  if (loading) {
    return <Skeleton className="h-40 w-full mb-6" />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-left text-teal-600 mb-6">
          Profile
        </h1>

        {user && (
          <div className="flex flex-col items-center">
            <div className="flex items-center w-full ms-24 gap-36">
              <img
                src={previewPic || user.image}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-teal-500"
              />
              <div className="text-left">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">Role: {user.role}</p>
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
                <div className="flex flex-col items-left mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPreviewPic(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="right-96"
                  />
                </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-md font-medium text-gray-600">Name</Label>
                  <Input
                    type="text"
                    value={updatedUser.name || ''}
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
                    value={updatedUser.email || ''}
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, email: e.target.value })
                    }
                    className="mt-1 w-full"
                  />
                </div>
              </div>
            
              <div className="flex justify-end gap-4 mt-4">
                <Button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setPreviewPic(null);
                    setUpdatedUser(user);
                  }}
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
              Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <Label htmlFor="medication_reminders" className="text-gray-600">
                  Enable Medication Reminders
                </Label>
                <ToggleSwitch
                  id="medication_reminders"
                  checked={notifications.medication_reminders}
                  onChange={() => handleNotificationChange("medication_reminders")}
                  disabled={updatingNotification}
                />
              </div>
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <Label htmlFor="health_alerts" className="text-gray-600">
                  Receive Health Alerts
                </Label>
                <ToggleSwitch
                  id="health_alerts"
                  checked={notifications.health_alerts}
                  onChange={() => handleNotificationChange("health_alerts")}
                  disabled={updatingNotification}
                />
              </div>
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <Label htmlFor="email_notifications" className="text-gray-600">
                  Email Notifications
                </Label>
                <ToggleSwitch
                  id="email_notifications"
                  checked={notifications.email_notifications}
                  onChange={() => handleNotificationChange("email_notifications")}
                  disabled={updatingNotification}
                />
              </div>
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <Label htmlFor="sms_notifications" className="text-gray-600">
                  SMS Notifications
                </Label>
                <ToggleSwitch
                  id="sms_notifications"
                  checked={notifications.sms_notifications}
                  onChange={() => handleNotificationChange("sms_notifications")}
                  disabled={updatingNotification}
                />
              </div>
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <Label htmlFor="app_notifications" className="text-gray-600">
                  In-App Notifications
                </Label>
                <ToggleSwitch
                  id="app_notifications"
                  checked={notifications.app_notifications}
                  onChange={() => handleNotificationChange("app_notifications")}
                  disabled={updatingNotification}
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
