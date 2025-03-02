import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
    relation: "",
    image: "",
  });

  const [familyMembers, setFamilyMembers] = useState(() => {
    const savedMembers = localStorage.getItem("familyMembers");
    return savedMembers
      ? JSON.parse(savedMembers)
      : [
          {
            id: 1,
            name: "John Doe",
            condition: "Hypertension",
            lastVisit: "10th Nov 2024",
            image:
              "https://health-e.in/wp-content/uploads/2023/12/healthcare-concept-with-futuristic-design-graphics-medical-treatment-icons.webp",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("familyMembers", JSON.stringify(familyMembers));
  }, [familyMembers]);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewMember({
      name: "",
      age: "",
      gender: "",
      condition: "",
      relation: "",
      image: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMember({ ...newMember, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.age || !newMember.condition || !newMember.gender) {
      alert("Please fill in all fields.");
      return;
    }

    const newId = familyMembers.length + 1;
    setFamilyMembers([
      ...familyMembers,
      { ...newMember, id: newId, lastVisit: "03/12/2024" },
    ]);
    handleModalClose();
  };

  const handleDeleteMember = (id) => {
    const updatedFamilyMembers = familyMembers.filter(
      (member) => member.id !== id
    );
    setFamilyMembers(updatedFamilyMembers);
  };

  const handleShowDetails = (member) => {
    navigate(`/family-member/${member.id}/details`);
  };

  return (
    <div className="w-full md:basis-1/2 lg:basis-1/3 text-center">
      
      <h1 className="mt-6 text-4xl font-bold mb-4 text-[#4499E8]">
        Family Health Dashboard
      </h1>
      <section className="mb-8">
        <div className="relative">
          <div className="flex-shrink-0 flex items-center mt-8 justify-center">
            <Button
              className="w-64 h-16 bg-teal-600 text-white text-lg rounded-2xl hover:bg-teal-700"
              onClick={handleModalOpen}
            >
              Add Members
            </Button>
          </div>
          <Carousel className="relative w-full max-w-6xl mx-auto mt-5">
            <CarouselContent className="items-center gap-4">
              {familyMembers.map((member) => (
                <div className="flex" key={member.id}>
                  <Card
                    className="w-80 h-96 bg-cover bg-center shadow-lg rounded-2xl flex-shrink-0 relative overflow-hidden group"
                    style={{ backgroundImage: `url(${member.image})` }}
                  >
                    <div
                      className="absolute top-0 left-0 w-full h-4/5 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${member.image})`,
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="absolute bottom-0 w-full h-1/5 bg-gray-300 p-4 rounded-b-2xl flex flex-col justify-center items-start">
                      <h3 className="text-lg text-[#0e100b] font-semibold">{member.name}</h3>
                      <p className="text-sm text-[#2d218d]">Condition: {member.condition}</p>
                      <p className="text-sm text-[#d14062]">Last Visit: {member.lastVisit}</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        onClick={() => handleShowDetails(member)}
                        className="bg-teal-600 text-white hover:bg-teal-700 rounded-xl py-2 px-4"
                      >
                        View Details
                      </Button>
                    </div>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="absolute top-4 right-4 bg-red-600 p-2 rounded-full text-white hover:bg-red-700"
                    >
                      <FaTrash />
                    </button>
                  </Card>
                </div>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 text-[#3884cb]" />
            <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 text-[#307bc1]" />
          </Carousel>
        </div>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-teal-600 mb-4">Add New Member</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm text-left font-semibold text-gray-700 mb-2">Full Name</label>
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
                <label className="block text-sm text-left font-semibold text-gray-700 mb-2">Age</label>
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
                <label className="block text-sm text-left font-semibold text-gray-700 mb-2">Gender</label>
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
                <label className="block text-sm text-left font-semibold text-gray-700 mb-2">Health Condition</label>
                <input
                  type="text"
                  name="condition"
                  value={newMember.condition}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter condition"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-left font-semibold text-gray-700 mb-2">Relation</label>
                <input
                  type="text"
                  name="relation"
                  value={newMember.relation}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter relation (e.g., Father)"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-left font-semibold text-gray-700 mb-2">Your image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {newMember.image && (
                  <div className="mt-2">
                    <img
                      src={newMember.image}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={handleModalClose}
                  className="mr-4 text-red-600 bg-gray-400 hover:bg-red-400 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl"
                >
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
