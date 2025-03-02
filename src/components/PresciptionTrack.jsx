import React, { useState, useEffect } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import PrescriptionEdit from "./PrescriptionEdit"; // Import the PrescriptionEdit component
import Navbar from "./shared/Navbar";

const PrescriptionTrack = () => {
  const [prescriptions, setPrescriptions] = useState(() => {
    const savedPrescriptions = localStorage.getItem("prescriptions");
    return savedPrescriptions ? JSON.parse(savedPrescriptions) : [];
  });
  const [newPrescription, setNewPrescription] = useState({
    medication: "",
    doctor: "",
    date: "",
    dosage: "",
    usage: "",
  });
  const [editing, setEditing] = useState(null); // Track the prescription being edited

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

    const updatedPrescriptions = [...prescriptions, newPrescriptionEntry];
    setPrescriptions(updatedPrescriptions);

    localStorage.setItem("prescriptions", JSON.stringify(updatedPrescriptions));

    setNewPrescription({
      medication: "",
      doctor: "",
      date: "",
      dosage: "",
      usage: "",
    });
  };

  const handleEditPrescription = (prescription) => {
    setEditing(prescription);
  };

  const handleUpdatePrescription = (updatedPrescription) => {
    const updatedPrescriptions = prescriptions.map((prescription) =>
      prescription.id === updatedPrescription.id
        ? updatedPrescription
        : prescription
    );

    setPrescriptions(updatedPrescriptions);
    localStorage.setItem("prescriptions", JSON.stringify(updatedPrescriptions));

    setEditing(null); // Stop editing
  };

  const handleDeletePrescription = (id) => {
    const updatedPrescriptions = prescriptions.filter(
      (prescription) => prescription.id !== id
    );
    setPrescriptions(updatedPrescriptions);
    localStorage.setItem("prescriptions", JSON.stringify(updatedPrescriptions));
  };


  return (
    <div>
      
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-teal-50">
        {/*  */}
        <div className="max-w-4xl w-full p-6">
          <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-xl text-center mb-6">
            Prescription Tracking
          </h1>
  
          {/* Add Prescription Form */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-3xl font-semibold text-teal-600 mb-4">
              Add Prescription
            </h2>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPrescription();
              }}
            >
              <div>
                <label className="block text-md text-left font-semibold text-gray-700">
                  Medication Name
                </label>
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
                <label className="block text-md text-left font-semibold text-gray-700">
                  Doctor's Name
                </label>
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
                <label className="block text-md text-left font-semibold text-gray-700">
                  Prescription Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={newPrescription.date}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-md text-left font-semibold text-gray-700">
                  Dosage
                </label>
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
                <label className="block text-md text-left font-semibold text-gray-700">
                  Usage Instructions
                </label>
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
                className="bg-teal-600 text-white p-3 rounded-xl hover:bg-teal-700"
              >
                Add Prescription
              </button>
            </form>
          </div>
  
          {/* Prescription List */}
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="font-semibold text-3xl text-teal-600 text-center mb-2">Prescriptions</div>
                  <h3 className="font-medium text-lg mt-3">
                    Medicine suggested: {prescription.medication}
                  </h3>
                  <p className="text-gray-500">Doctor: {prescription.doctor}</p>
                  <p className="text-gray-600">Dosage: {prescription.dosage}</p>
                  <p className="text-gray-500">Usage: {prescription.usage}</p>
                  <p className="text-teal-600">Date: {prescription.date}</p>
                </div>
  
                <div className="flex items-center">
                  <button
                    onClick={() => handleEditPrescription(prescription)}
                    className="text-teal-600 hover:text-teal-800 mr-4"
                  >
                    <FaPen className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeletePrescription(prescription.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
  
          {/* Edit Prescription Modal */}
          {editing && (
            <PrescriptionEdit
              prescription={editing}
              onSave={handleUpdatePrescription}
              onCancel={() => setEditing(null)}
            />
          )}
        </div>
      </div>
    </div>
    );
  };
  
  export default PrescriptionTrack;
