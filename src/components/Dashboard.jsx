import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { StoreContext } from "../context/StoreContext";
import { FamilyContext } from '../context/FamilyContext';
import { toast } from 'react-hot-toast'; // Importing react-toastify

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(StoreContext);
  const { familyMembers, fetchFamilyMembers, addFamilyMember, deleteFamilyMember, updateFamilyMember } = useContext(FamilyContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    _id:"",
    name: "",
    age: "",
    gender: "",
    relation: "",
    image: null,
    email: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchFamilyMembers();
    } else {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewMember({ _id:"",name: "", age: "", gender: "", relation: "", image: null, email: "" });
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
      toast.error("Please fill in all fields."); // Using toast for error message
      return;
    }

    if (newMember._id) {
      // Update existing member
      await updateFamilyMember(newMember); // Call the update function
      toast.success("Family member updated successfully!"); // Success message
    } else {
      // Add new member
      await addFamilyMember(newMember);
      toast.success("Family member added successfully!"); // Success message
    }

    handleModalClose();
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm("Are you sure you want to delete this family member?")) {
      await deleteFamilyMember(id);
      toast.success("Family member deleted successfully!"); // Success message
    }
  };

  const handleShowDetails = (member) => {
    navigate(`/family-member/${member._id}/details`);
  };

  const handleEdit = (member) => {
    setNewMember({
      _id: member._id, // Set the ID for the member being edited
      name: member.name,
      age: member.age,
      gender: member.gender,
      relation: member.relation,
      image: member.image, // Keep the existing image
      email: member.email,
    });
    setIsModalOpen(true); // Open the modal for editing
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
          <Card key={member._id} className="bg-white shadow-lg rounded-xl p-8">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-72 object-cover rounded-md" // Adjusted to zoom out the image
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-[#0e100b]">{member.name}</h3>
              <p className="text-sm text-[#2d218d]">Relation: {member.relation}</p>
              <p className="text-sm text-[#d14062]">Last Visit: {member.lastVisit || "N/A"}</p>
            </div>

            <div className="mt-4 flex justify-around -mx-5">
              <button
                onClick={() => handleDeleteMember(member._id)}
                className="bg-red-600 p-2.5 rounded-full text-white hover:bg-red-700"
              >
                <FaTrash />
              </button>
              <Button
                onClick={() => handleShowDetails(member)}
                className="bg-teal-600 text-white hover:bg-teal-700 rounded-xl py-2 px-4"
              >
                View Details
              </Button>
              <button
                onClick={() => handleEdit(member)} // Open edit modal with current data
                className="bg-blue-600 p-2.5 rounded-full text-white hover:bg-blue-700"
              >
                <FaEdit /> {/* Edit icon */}
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal for adding new members */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-teal-600 mb-4">
              {newMember._id ? "Edit Member" : "Add New Member"} {/* Change title based on context */}
            </h2>
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
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
                  {newMember._id ? "Update Member" : "Add Member"} {/* Change button text based on context */}
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
