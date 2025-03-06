import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { FaTrash, FaPlus } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    age: "",
    gender: "",
    relation: "",
    image: null,
    email: "",
  });
  const [familyMembers, setFamilyMembers] = useState([]);

  const fetchFamilyMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/family", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch family members");
      const data = await res.json();
      setFamilyMembers(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching family members:", error);
      setFamilyMembers([]);
    }
  };

  useEffect(() => {
    fetchFamilyMembers();
  }, []);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewMember({ name: "", age: "", gender: "",  relation: "", image: null, email: "" });
  };

  const handleInputChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMember({ ...newMember, image: file });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.age || !newMember.gender) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      Object.entries(newMember).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      const res = await fetch("http://localhost:8080/family", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to add family member");
      fetchFamilyMembers();
      handleModalClose();
    } catch (error) {
      console.error("Error adding family member:", error);
      alert("Failed to add family member. Please try again.");
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/family/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete member");
      fetchFamilyMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };
  const handleShowDetails = (member) => {
    navigate(`/family-member/${member._id}/details`);
  };

  return (
    <div className="w-full text-center p-6">
      <h1 className="mt-3 text-4xl font-bold mb-3 text-[#4499E8]">
        Family Health Dashboard
      </h1>

      {/* Grid layout for family members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        
        {/* Add Member Card */}
        <Card
          className="flex flex-col items-center border-spacing-3 justify-center bg-gray-200 shadow-lg rounded-xl p-6 cursor-pointer hover:bg-gray-300 transition border-4 border-teal-600"
          onClick={handleModalOpen}
        >
          <FaPlus className="text-4xl text-teal-600" />
          <p className="mt-2 text-lg font-semibold text-gray-700">Add Member</p>
        </Card>

        {/* Family Members */}
        {familyMembers.map((member) => (
          <Card key={member._id} className="relative bg-white shadow-lg rounded-xl p-4">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-56 object-cover rounded-md"
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-[#0e100b]">{member.name}</h3>
              <p className="text-sm text-[#2d218d]">Relation: {member.relation}</p>
              <p className="text-sm text-[#d14062]">Last Visit: {member.lastVisit || "N/A"}</p>
            </div>

            <div className="mt-4 flex justify-between">
              <Button
                onClick={() => handleShowDetails(member)}
                className="bg-teal-600 text-white hover:bg-teal-700 rouded-xl py-2 px-4"
              >
                View Details
              </Button>
              <button
                onClick={() => handleDeleteMember(member._id)}
                className="bg-red-600 p-2 rounded-full text-white hover:bg-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal for adding new members */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-teal-600 mb-4">Add New Member</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={newMember.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Age</label>
                <input
                  type="number"
                  name="age"
                  value={newMember.age}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter age"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Gender</label>
                <select
                  name="gender"
                  value={newMember.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Relation</label>
                <select
                  name="relation"
                  value={newMember.relation}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Relation</option>
                  <option value="Self">Self</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Other">Other</option>
                </select>
              </div> 

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newMember.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter email (optional)"
                />
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={handleModalClose}
                  className="mr-4 text-red-600 bg-gray-400 hover:bg-red-400 rounded-xl"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl">
                  Add Member
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
