import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/health/family";

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [currentHealthRecord, setCurrentHealthRecord] = useState(null);
  const [pastRecords, setPastRecords] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState({
    illness: "",
    doctor_name: "",
    doctor_notes: "",
    visit_date: "",
    follow_up_date: "",
    medications:[] ,
  });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    fetchMemberDetails(storedToken);
  }, [id]);

  const fetchMemberDetails = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/${id}/records`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        console.log("member",response.data.data)
        setMember(response.data.data);
        fetchHealthRecords(token);
      } else {
        console.error("Member not found:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching member details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHealthRecords = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}/records`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPastRecords(response.data.data.healthRecords);
      setCurrentHealthRecord(response.data.data.healthRecords[0] || null);
    } catch (error) {
      console.error("Error fetching health records:", error);
    }
  };
  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setModalType("view");
  };

  const handleAddOrUpdateRecord = async () => {
    try {
      if (modalType === "edit") {
        await axios.put(`${API_BASE_URL}/${id}/records/${selectedRecord._id}`, selectedRecord, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPastRecords(pastRecords.map((r) => (r._id === selectedRecord._id ? selectedRecord : r)));
      } else {
        const response = await axios.post(`${API_BASE_URL}/${id}/records`, selectedRecord, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPastRecords([...pastRecords, response.data.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving record:", error);
    }
  };

  const handleEditRecord = (record) => {
    setSelectedRecord(record);
    setModalType("edit");
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}/records/${recordId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPastRecords(pastRecords.filter((record) => record._id !== recordId));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedRecord({
      illness: "",
      doctor_name: "",
      doctor_notes: "",
      visit_date: "",
      follow_up_date: "",
      medications: [],
    });
  };

  if (loading) return <p className="text-center">Loading...</p>;

  if (!member) return <p className="text-center text-red-500 text-lg">Member not found!</p>;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center bg-blue-600 rounded text-white py-2 px-4 hover:bg-gray-700 transition-all mb-6"
      >
        <FaArrowLeft className="mr-2 " /> Back to Dashboard
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex justify-center items-center">
            <img
              src={member.familyMember.image}
              alt={member.familyMember.name}
              className="w-48 h-48 object-cover rounded-full border-4 border-teal-500"
            />
          </div>
          <div className="text-left space-y-3 col-span-2">
            <h1 className="text-3xl font-bold text-teal-600">{member.familyMember.name}</h1>
            <p className="text-gray-700"><strong>Email:</strong> {member.familyMember.email || "N/A"}</p>
            <p className="text-gray-700"><strong>Relation:</strong> {member.familyMember.relation || "N/A"}</p>
            <p className="text-gray-700"><strong>Last Visit:</strong> {member.familyMember.lastVisit || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="bg-teal-50 shadow-md rounded-lg p-6 mb-8 border border-teal-200">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Current Health Record</h2>
        {currentHealthRecord ? (
          <div className="text-gray-700">
            <p><strong>Illness:</strong> {currentHealthRecord.illness}</p>
            <p><strong>Doctor Name:</strong> {currentHealthRecord.doctor_name}</p>
            <p><strong>Doctor Notes:</strong> {currentHealthRecord.doctor_notes}</p>
          </div>
        ) : (
          <div className="text-gray-700">
            <p>No current health record found.</p>
            <button
              onClick={() => setModalType("add")}
              className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition-all mt-4"
            >
              + Add New Record
            </button>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Past Health Records</h2>
        <button
          onClick={() => setModalType("add")}
          className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition-all mb-4"
        >
          + Add New Record
        </button>
        <div className="space-y-4">
          {pastRecords.length > 0 ? (
            pastRecords.map((record) => (
              <div key={record._id} className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p><strong>Illness:</strong> {record.illness}</p>
                  <p><strong>Doctor:</strong> {record.doctor_name}</p>
                </div>
                <div className="flex space-x-2">
                <button onClick={() => handleViewRecord(record)} className="text-white bg-sky-500 p-2 rounded-md hover:bg-sky-600 transition-all">
                    <FaEye />
                  </button>
                  <button onClick={() => handleEditRecord(record)} className="text-white bg-yellow-500 p-2 rounded-md hover:bg-yellow-600 transition-all">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteRecord(record._id)} className="text-white bg-red-500 p-2 rounded-md hover:bg-red-600 transition-all">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No past health records found.</p>
          )}
        </div>
      </div>
      {modalType === "view" && selectedRecord && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-xl font-bold text-gray-700 mb-4">View Health Record</h3>
      <p><strong>Illness:</strong> {selectedRecord.illness}</p>
      <p><strong>Doctor Name:</strong> {selectedRecord.doctor_name}</p>
      <p><strong>Doctor Notes:</strong> {selectedRecord.doctor_notes}</p>
      <p><strong>Visit Date:</strong> {selectedRecord.visit_date}</p>
      <p><strong>Follow-up Date:</strong> {selectedRecord.follow_up_date}</p>
      <p><strong>Medications:</strong> {selectedRecord.medications?.join(", ") || "N/A"}</p>
      <div className="flex justify-end space-x-2 mt-4">
        <button onClick={closeModal} className="bg-gray-400 text-white py-2 px-4 rounded-xl hover:bg-gray-500">
          Close
        </button>
      </div>
    </div>
  </div>
)}

{(modalType === "add" || modalType === "edit") && selectedRecord && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-xl font-bold text-gray-700 mb-4">
        {modalType === "add" ? "Add New Record" : "Update Record"}
      </h3>

      <label>Illness</label>
      <input
        type="text"
        value={selectedRecord.illness || ""}
        onChange={(e) => setSelectedRecord({ ...selectedRecord, illness: e.target.value })}
        placeholder="Illness"
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />

      <label>Doctor Name</label>
      <input
        type="text"
        value={selectedRecord.doctor_name || ""}
        onChange={(e) => setSelectedRecord({ ...selectedRecord, doctor_name: e.target.value })}
        placeholder="Doctor Name"
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />

      <label>Doctor Notes</label>
      <input
        type="text"
        value={selectedRecord.doctor_notes || ""}
        onChange={(e) => setSelectedRecord({ ...selectedRecord, doctor_notes: e.target.value })}
        placeholder="Doctor Notes"
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />

      <label>Visit Date</label>
      <input
        type="date"
        value={selectedRecord.visit_date || ""}
        onChange={(e) => setSelectedRecord({ ...selectedRecord, visit_date: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />

      <label>Follow-up Date</label>
      <input
        type="date"
        value={selectedRecord.follow_up_date || ""}
        onChange={(e) => setSelectedRecord({ ...selectedRecord, follow_up_date: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />

      <label>Medications</label>
      <input
        type="text"
        value={(selectedRecord.medications || []).join(', ')}
        onChange={(e) =>
          setSelectedRecord({
            ...selectedRecord,
            medications: e.target.value
              .split(',')
              .map(med => med.trim())
              .filter(med => med !== ''),
          })
        }
        placeholder="Medications (comma-separated)"
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />

      <label>Documents</label>
      <input
        type="file"
        onChange={(e) => {
          const filesArray = Array.from(e.target.files);
          setSelectedRecord({ ...selectedRecord, images: [...(selectedRecord.images || []), ...filesArray] });
        }}
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
        multiple
      />

      <div className="flex justify-end space-x-2">
        <button onClick={closeModal} className="bg-gray-400 text-white py-2 px-4 rounded-xl hover:bg-gray-500">
          Cancel
        </button>
        <button onClick={handleAddOrUpdateRecord} className="bg-teal-600 text-white py-2 px-4 rounded-xl hover:bg-teal-700">
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default MemberDetails;