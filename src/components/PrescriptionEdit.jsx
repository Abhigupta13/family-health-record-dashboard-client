import React, { useState, useEffect } from 'react';

const PrescriptionEdit = ({ prescription, onSave, onCancel }) => {
  const [editedPrescription, setEditedPrescription] = useState(prescription);

  useEffect(() => {
    setEditedPrescription(prescription);
  }, [prescription]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPrescription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedPrescription); // Save the changes
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-teal-600 mb-4">Edit Prescription</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-md text-left font-semibold text-gray-700">Medication Name</label>
            <input
              type="text"
              name="medication"
              value={editedPrescription.medication}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-md text-left font-semibold text-gray-700">Doctor's Name</label>
            <input
              type="text"
              name="doctor"
              value={editedPrescription.doctor}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-md text-left font-semibold text-gray-700">Prescription Date</label>
            <input
              type="date"
              name="date"
              value={editedPrescription.date}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-md text-left font-semibold text-gray-700">Dosage</label>
            <input
              type="text"
              name="dosage"
              value={editedPrescription.dosage}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-md text-left font-semibold text-gray-700">Usage Instructions</label>
            <input
              type="text"
              name="usage"
              value={editedPrescription.usage}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 text-white p-3 rounded-md hover:bg-teal-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionEdit;
