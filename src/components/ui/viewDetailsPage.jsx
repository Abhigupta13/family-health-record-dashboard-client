import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useState } from "react";

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = JSON.parse(localStorage.getItem("familyMembers")).find(
    (member) => member.id === parseInt(id)
  );

  const [currentHealthRecord, setCurrentHealthRecord] = useState({
    illness: "Hypertension",
    doctor_name: "Dr. Smith",
    doctor_notes: "Monitor blood pressure daily.",
    medications: [{ name: "Amlodipine", dosage: "10mg", frequency: "Once a day" }],
    visit_date: "2024-11-25",
    follow_up_date: "2024-12-25",
  });

  const [pastRecords, setPastRecords] = useState([
    {
      _id: "1",
      illness: "Diabetes",
      doctor_name: "Dr. Brown",
      doctor_notes: "Maintain a low-sugar diet.",
      medications: [{ name: "Metformin", dosage: "500mg", frequency: "Twice a day" }],
      visit_date: "2024-11-10",
      follow_up_date: "2024-12-10",
    },
    {
      _id: "2",
      illness: "Diabetes",
      doctor_name: "Dr. Brown",
      doctor_notes: "Maintain a low-sugar diet.",
      medications: [{ name: "Metformin", dosage: "500mg", frequency: "Twice a day" }],
      visit_date: "2024-11-10",
      follow_up_date: "2024-12-10",
    },
  ]);

  const [modalType, setModalType] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleAddRecord = () => {
    setSelectedRecord({
      illness: "",
      doctor_name: "",
      doctor_notes: "",
      medications: [{ name: "", dosage: "", frequency: "" }],
      visit_date: "",
      follow_up_date: "",
    });
    setModalType("addRecord");
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedRecord(null);
  };

  if (!member) return <p className="text-center text-red-500 text-lg">Member not found!</p>;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center bg-blue-600 rounded text-white py-2 px-4 hover:bg-gray-700 transition-all mb-6"
      >
        <FaArrowLeft className="mr-2 " /> Back to Dashboard
      </button>

      {/* Member Details Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex justify-center items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-48 h-48 object-cover rounded-full border-4 border-teal-500"
            />
          </div>
          <div className="text-left space-y-3 col-span-2">
            <h1 className="text-3xl font-bold text-teal-600">{member.name}</h1>
            <p className="text-gray-700"><strong>Email:</strong> example@email.com</p>
            <p className="text-gray-700"><strong>Phone:</strong> +1234567890</p>
            <p className="text-gray-700"><strong>Address:</strong> 123 Main Street, City, Country</p>
          </div>
        </div>
      </div>

      {/* Current Health Record */}
      <div className="bg-teal-50 shadow-md rounded-lg p-6 mb-8 border border-teal-200">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Current Health Record</h2>
        <div className="text-gray-700">
          <p><strong>Illness:</strong> {currentHealthRecord.illness}</p>
          <p><strong>Doctor Name:</strong> {currentHealthRecord.doctor_name}</p>
          <p><strong>Doctor Notes:</strong> {currentHealthRecord.doctor_notes}</p>
          <p><strong>Medications:</strong></p>
          <ul className="list-disc list-inside ml-4">
            {currentHealthRecord.medications.map((med, index) => (
              <li key={index}>{med.name} - {med.dosage} ({med.frequency})</li>
            ))}
          </ul>
          <p><strong>Visit Date:</strong> {new Date(currentHealthRecord.visit_date).toLocaleDateString()}</p>
          <p><strong>Follow-Up Date:</strong> {new Date(currentHealthRecord.follow_up_date).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Past Health Records */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Past Health Records</h2>
        <button
          onClick={handleAddRecord}
          className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition-all mb-4"
        >
          + Add New Record
        </button>
        <div className="space-y-4">
          {pastRecords.map((record) => (
            <div key={record._id} className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p><strong>Illness:</strong> {record.illness}</p>
                <p><strong>Doctor:</strong> {record.doctor_name}</p>
                <p><strong>Follow-Up Date:</strong> {record.follow_up_date}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-white bg-sky-500 p-2 rounded-md hover:bg-sky-600 transition-all">
                  <FaEye />
                </button>
                <button className="text-white bg-yellow-500 p-2 rounded-md hover:bg-yellow-600 transition-all">
                  <FaEdit />
                </button>
                <button className="text-white bg-red-500 p-2 rounded-md hover:bg-red-600 transition-all">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding/Updating Records */}
      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              {modalType === "addRecord" ? "Add New Record" : "Update Record"}
            </h3>
            <input
              type="text"
              placeholder="Illness"
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
            />
            <input
              type="text"
              placeholder="Doctor Name"
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
            />
            <textarea
              placeholder="Doctor Notes"
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={handleCloseModal} className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500">Cancel</button>
              <button className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDetails;
