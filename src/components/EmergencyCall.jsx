import { useState } from "react";
import { FaPhoneAlt, FaUpload } from "react-icons/fa"; // Phone and Upload icons from React Icons
import { Button } from "./ui/button";
import EmergencyQR from "./EmergencyQR";

const EmergencyContact = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    condition: "",
    image: "",
  });
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPatientDetails({ ...patientDetails, image: URL.createObjectURL(file) });
      setIsImageUploaded(true);
    }
  };

  // Handle form submission for emergency call
  const handleSubmit = (e) => {
    e.preventDefault();
    // Proceed with emergency call logic after form submission
    alert("Emergency call is being initiated...");
    setIsFormVisible(false);
    // Add further API integration for emergency verification
  };

  // Handle emergency call visibility toggle
  const handleFormToggle = () => setIsFormVisible(!isFormVisible);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-[#4499E8] mb-8">Emergency Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Emergency Call Section */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-red-600 mb-4">Emergency Call</h3>
          {!isFormVisible ? (
            <Button
              className="w-64 h-16 bg-red-600 text-white text-lg rounded-2xl hover:bg-red-700"
              onClick={handleFormToggle}
            >
              <FaPhoneAlt className="mr-2" /> Emergency Call
            </Button>
          ) : (
            <div>
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-red-600">Emergency Verification</h3>

                {/* Patient Details Form */}
                <div className="mb-4">
                  <label className="block text-sm text-left font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={patientDetails.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-left font-semibold text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={patientDetails.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-left font-semibold text-gray-700 mb-2">Condition</label>
                  <input
                    type="text"
                    name="condition"
                    value={patientDetails.condition}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                {/* Image Upload for Verification */}
                <div className="mb-4">
                  <label className="block text-sm text-left font-semibold text-gray-700 mb-2">Upload Patient Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                  {isImageUploaded && (
                    <div className="mt-2">
                      <img src={patientDetails.image} alt="Patient" className="w-32 h-32 object-cover rounded-md" />
                    </div>
                  )}
                </div>

                {/* Confirmation and Call Button */}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="text-sm bg-gray-500 hover:bg-gray-700 text-white rounded-xl"
                    onClick={handleFormToggle}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="text-sm bg-red-500 hover:bg-red-700 text-white rounded-xl"
                  >
                    Confirm & Call
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Emergency QR Section */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Emergency QR Code</h3>
          <EmergencyQR 
            memberId="123" // Replace with actual member ID
            memberName={patientDetails.name || "Patient Name"}
          />
          <p className="text-sm text-gray-600 mt-4">
            Scan this QR code to access emergency health information
          </p>
        </div>
      </div>

      {/* Additional instructions */}
      <p className="text-gray-500 mt-8 text-center">
        Please fill out the details for the emergency verification before calling. If the patient is unconscious or unable to provide details, the call can still be made directly.
      </p>
    </div>
  );
};

export default EmergencyContact;
