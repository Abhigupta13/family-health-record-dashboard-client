import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash, FaEye, FaDownload, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

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
    medications: [],
  });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [viewMode, setViewMode] = useState('view');
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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
        setMember(response.data.data);
        fetchHealthRecords(token);
      } else {
        toast.error("Member not found");
      }
    } catch (error) {
      toast.error("Error fetching member details");
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
      toast.error("Error fetching health records");
    }
  };

  const handleViewRecord = (record) => {
    setSelectedRecord({
      ...record,
      visit_date: record.visit_date?.split('T')[0],
      follow_up_date: record.follow_up_date?.split('T')[0]
    });
    setModalType("view");
    setViewMode('view');
    setImagePreviews(record.images || []);
  };

  const handleEditInViewMode = () => {
    setViewMode('edit');
    setModalType("edit");
  };

  const handleAddNewRecord = () => {
    setSelectedRecord({
      illness: "",
      doctor_name: "",
      doctor_notes: "",
      visit_date: "",
      follow_up_date: "",
      medications: [],
    });
    setModalType("edit");
    setViewMode('edit');
    setImagePreviews([]);
    setSelectedImages([]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDownloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'health-record-image.jpg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  const handleAddOrUpdateRecord = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(selectedRecord).forEach(key => {
        if (key !== 'images' && selectedRecord[key]) {
          formData.append(key, selectedRecord[key]);
        }
      });
      imagePreviews.forEach((image, index) => {
        if (!image.startsWith('blob:')) {
          formData.append('existingImages', image);
        }
      });
      selectedImages.forEach(file => {
        formData.append('images', file);
      });

      let response;
      console.log(modalType)
      if (modalType === "edit" && selectedRecord._id) {
        response = await axios.put(
          `${API_BASE_URL}/${id}/records/${selectedRecord._id}`,
          formData,
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        if (response.data.success) {
          setPastRecords(pastRecords.map(r => 
            r._id === selectedRecord._id ? response.data.data : r
          ));
          toast.success('Record updated successfully');
        }
      } else {
        console.log("post")
        response = await axios.post(
          `${API_BASE_URL}/${id}/records`,
          formData,
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        if (response.data.success) {
          setPastRecords([...pastRecords, response.data.data]);
          toast.success('Record added successfully');
        }
      }
      closeModal();
    } catch (error) {
      toast.error('Failed to save record');
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
    setViewMode('view');
    setSelectedRecord({
      illness: "",
      doctor_name: "",
      doctor_notes: "",
      visit_date: "",
      follow_up_date: "",
      medications: [],
    });
    setSelectedImages([]);
    setImagePreviews([]);
  };

  if (loading) return <p className="text-center">Loading...</p>;

  if (!member) return <p className="text-center text-red-500 text-lg">Member not found!</p>;

  return (
    <div className="container mx-auto px-16 py-8">
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
          </div>
        )}
      </div>

      <div className="bg-teal-50 shadow-md rounded-lg p-6 mb-8 border border-teal-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-teal-700">Past Health Records</h2>
          <button
            onClick={handleAddNewRecord}
            className="flex items-center bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-all"
          >
            <FaPlus className="mr-2" /> Add New Record
          </button>
        </div>
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

      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-700">
                {viewMode === 'view' ? 'View Health Record' : 'Edit Health Record'}
              </h3>
              {viewMode === 'view' && (
                <button
                  onClick={handleEditInViewMode}
                  className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-all"
                >
                  <FaEdit />
                </button>
              )}
            </div>

            {viewMode === 'view' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Illness</p>
                    <p className="text-gray-600">{selectedRecord.illness}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Doctor Name</p>
                    <p className="text-gray-600">{selectedRecord.doctor_name}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold">Doctor Notes</p>
                    <p className="text-gray-600">{selectedRecord.doctor_notes}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Visit Date</p>
                    <p className="text-gray-600">{new Date(selectedRecord.visit_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Follow-up Date</p>
                    <p className="text-gray-600">{new Date(selectedRecord.follow_up_date).toLocaleDateString()}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold">Medications</p>
                    <p className="text-gray-600">{selectedRecord.medications?.join(", ") || "N/A"}</p>
                  </div>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="mt-6">
                    <p className="font-semibold mb-3">Uploaded Documents</p>
                    <div className="grid grid-cols-3 gap-4">
                      {imagePreviews.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Document ${index + 1}`}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <button
                              onClick={() => handleDownloadImage(image)}
                              className="text-white p-2 hover:text-blue-300"
                            >
                              <FaDownload />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleAddOrUpdateRecord} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Illness</label>
                    <input
                      type="text"
                      value={selectedRecord.illness || ""}
                      onChange={(e) => setSelectedRecord({ ...selectedRecord, illness: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
                    <input
                      type="text"
                      value={selectedRecord.doctor_name || ""}
                      onChange={(e) => setSelectedRecord({ ...selectedRecord, doctor_name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Doctor Notes</label>
                    <textarea
                      value={selectedRecord.doctor_notes || ""}
                      onChange={(e) => setSelectedRecord({ ...selectedRecord, doctor_notes: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Visit Date</label>
                    <input
                      type="date"
                      value={selectedRecord.visit_date || ""}
                      onChange={(e) => setSelectedRecord({ ...selectedRecord, visit_date: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Follow-up Date</label>
                    <input
                      type="date"
                      value={selectedRecord.follow_up_date || ""}
                      onChange={(e) => setSelectedRecord({ ...selectedRecord, follow_up_date: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Medications</label>
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
                      placeholder="Enter medications separated by commas"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documents
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    multiple
                    className="w-full"
                  />
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-400 text-white py-2 px-4 rounded-xl hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-teal-600 text-white py-2 px-4 rounded-xl hover:bg-teal-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDetails;