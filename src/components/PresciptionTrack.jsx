import React, { useState } from 'react';
import { FaPen, FaCalendarAlt } from 'react-icons/fa'; // Import FontAwesome pen and calendar icon

const PrescriptionTrack = () => {
  // Load prescriptions from local storage, or initialize with an empty array
  const [prescriptions, setPrescriptions] = useState(() => {
    const savedPrescriptions = localStorage.getItem('prescriptions');
    return savedPrescriptions ? JSON.parse(savedPrescriptions) : [];
  });

  const [newPrescription, setNewPrescription] = useState({
    medication: '',
    doctor: '',
    date: '',
    dosage: '',
    usage: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPrescription = () => {
    const newPrescriptionEntry = {
      ...newPrescription,
      id: prescriptions.length + 1,
    };

    // Update state and local storage with the new prescription
    const updatedPrescriptions = [...prescriptions, newPrescriptionEntry];
    setPrescriptions(updatedPrescriptions);

    // Save updated prescriptions to local storage
    localStorage.setItem('prescriptions', JSON.stringify(updatedPrescriptions));

    // Clear the form fields
    setNewPrescription({
      medication: '',
      doctor: '',
      date: '',
      dosage: '',
      usage: ''
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-teal-50">
      <div className="max-w-4xl w-full p-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-md text-center mb-6">
          Prescription Tracking
        </h1>

        {/* Prescription Add Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-semibold text-teal-600 mb-4">Add Prescription</h2>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleAddPrescription(); }}>
            <div>
              <label className="block text-md text-left font-semibold text-gray-700">Medication Name</label>
              <input
                type="text"
                name="medication"
                value={newPrescription.medication}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter medication name"
                required
              />
            </div>
            <div>
              <label className="block text-md text-left font-semibold text-gray-700">Doctor's Name</label>
              <input
                type="text"
                name="doctor"
                value={newPrescription.doctor}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter doctor's name"
                required
              />
            </div>
            <div>
              <label className="block text-md text-left font-semibold text-gray-700">Prescription Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={newPrescription.date}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500">
                  <FaCalendarAlt size={20} /> {/* Adding calendar icon from react-icons */}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-md text-left font-semibold text-gray-700">Dosage</label>
              <input
                type="text"
                name="dosage"
                value={newPrescription.dosage}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter dosage"
                required
              />
            </div>
            <div>
              <label className="block text-md text-left font-semibold text-gray-700">Usage Instructions</label>
              <input
                type="text"
                name="usage"
                value={newPrescription.usage}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="How often to take (e.g., 3 times a day)"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white p-3 rounded-md mt-4 hover:bg-teal-700 transition duration-300"
            >
              Add Prescription
            </button>
          </form>
        </div>

        {/* Prescription List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Prescriptions</h2>
          <div className="space-y-6">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="border-b py-6 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg text-teal-800">{prescription.medication}</h3>
                  <p className="text-sm text-gray-600">Doctor: {prescription.doctor}</p>
                  <p className="text-sm text-gray-600">Date: {prescription.date}</p>
                  <p className="text-sm text-gray-600">Dosage: {prescription.dosage}</p>
                  <p className="text-sm text-gray-600">Usage: {prescription.usage}</p>
                </div>
                <button className="text-teal-600 hover:text-teal-800">
                  <FaPen /> {/* Pen icon for editing */}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionTrack;
