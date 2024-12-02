import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { FaTrash } from "react-icons/fa"; // Import trash icon from React Icons

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [newMember, setNewMember] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
    relation: "",
    image: "",
  });

  // Retrieve family members from localStorage or use an empty array
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

  // Update localStorage whenever familyMembers change
  useEffect(() => {
    localStorage.setItem("familyMembers", JSON.stringify(familyMembers));
  }, [familyMembers]);

  // Handle modal visibility
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  // Handle modal visibility for showing details
  const handleShowDetails = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  }

  // Handle file input change (image upload)
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

  // Handle form submission to add a new family member
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (
      !newMember.name ||
      !newMember.age ||
      !newMember.condition ||
      !newMember.gender
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newId = familyMembers.length + 1;
    setFamilyMembers([
      ...familyMembers,
      { ...newMember, id: newId, lastVisit: "03/12/2024" },
    ]);
    handleModalClose(); // Close the modal after submitting
  };

  // Handle member deletion
  const handleDeleteMember = (id) => {
    const updatedFamilyMembers = familyMembers.filter(
      (member) => member.id !== id
    );
    setFamilyMembers(updatedFamilyMembers);
  };

  return (
    <div className="w-full md:basis-1/2 lg:basis-1/3 text-center">
      <Navbar />
      <h1 className="mt-6 text-4xl font-bold mb-4 text-[#4499E8]">
        Family Health Dashboard
      </h1>

      {/* Family Health Overview */}
      <section className="mb-8">
        <h2 className="text-2xl text-gray-500 font-semibold mb-4">
          Family Health Overview
        </h2>
        <div className="relative">
          {/* Quick Add Button */}
          <div className="flex-shrink-0 flex items-center mt-8 justify-center">
            <Button
              className="w-64 h-16 bg-teal-600 text-white text-lg rounded-2xl hover:bg-teal-700"
              onClick={handleModalOpen}
            >
              Add Members
            </Button>
          </div>

          <Carousel className="relative w-full max-w-6xl mx-auto mt-5">
            {/* Carousel Content */}
            <CarouselContent className="items-center gap-4">
              {familyMembers.map((member) => (
                <div className="flex" key={member.id}>
                  <Card
                    className="w-80 h-96 bg-cover bg-center shadow-lg rounded-2xl flex-shrink-0 relative"
                    style={{ backgroundImage: `url(${member.image})` }}
                  >
                    <div className="absolute inset-0 bg-opacity-30 rounded-lg"></div>

                    {/* Stack Image and Text Vertically */}
                    <div className="absolute inset-0 flex flex-col">
                      {/* Image Section - Top Half */}
                      <div
                        className="w-full h-1/2 bg-cover bg-center rounded-t-2xl"
                        style={{
                          backgroundImage: `url(${member.image})`,
                          backgroundPosition: "center 20%",
                        }}
                      ></div>

                      {/* Text Section - Bottom Half */}
                      <div className="w-full h-1/2 bg-gray-300 p-10 rounded-b-2xl">
                        <h3 className="text-2xl text-[#0e100b] font-semibold">
                          {member.name}
                        </h3>
                        <p className="text-[#2d218d]">
                          Condition: {member.condition}
                        </p>
                        <p className="text-[#d14062]">
                          Last Visit: {member.lastVisit}
                        </p>

                        {/* Delete Icon */}
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="absolute bottom-4 right-4 bg-red-600 p-2 rounded-full text-white hover:bg-red-700"
                        >
                          <FaTrash />
                        </button>

                        {/* Button to view full details */}
                        <Button
                          onClick={() => handleShowDetails(member)}
                          className="mt-4 bg-teal-600 text-white hover:bg-teal-700 rounded-xl py-2 px-4"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </CarouselContent>

            {/* Carousel Navigation */}
            <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 text-[#3884cb]" />
            <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 text-[#307bc1]" />
          </Carousel>
        </div>
      </section>

      <div className="h-[2px] w-2/3 items-center justify-center mx-auto bg-[#4499E8]"></div>

      {/* Graphs/Charts */}
      <section className="mb-8 mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-[#4499E8]">
          Health Trends
        </h2>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <p className="text-gray-500">
            Example Graph: Blood Pressure Tracking
          </p>
          <div className="h-64 mt-3 w- rounded-md flex items-center justify-center">
            <img
              src="https://media.istockphoto.com/id/900699224/photo/atrial-flutter-with-variable-conduction-blood-pressure-pulse-oxymeter-and-vital-signs-on.jpg?s=612x612&w=0&k=20&c=CEzbVnMNuFSibslEdoLWmuwFdMwk9NrrS4KRbs526mI="
              alt="Blood Pressure Tracking"
              className="object-contain max-h-full max-w-full"
            />
          </div>
        </div>
      </section>

      {/* Health Notifications */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#4499E8]">
          Health Notifications
        </h2>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <ul className="list-disc list-inside">
            <li className="mb-2">
              Reminder: John's hypertension medication at 9 AM
            </li>
            <li className="mb-2">
              Upcoming Appointment: Jane's diabetes review on 30th Nov
            </li>
            <li className="mb-2">
              Prescription Update: New dosage for John's blood pressure medicine
            </li>
          </ul>
        </div>
      </section>

      {/* Modal for Adding Member */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-teal-600 mb-4">
              Add New Member
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
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
                <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                  Age
                </label>
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
                <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                  Gender
                </label>
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
                <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                  Health Condition
                </label>
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
                <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                  Relation
                </label>
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
                <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                  Your image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {
                  newMember.image && (
                    <div className="mt-2">
                    <img
                      src={newMember.image}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    </div>
                  )
                }
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

      {/* Modal for Member Details */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-teal-600 mb-4">
              {selectedMember.name}'s Details
            </h2>
            <div className="mb-4">
              <strong>Age: </strong>{selectedMember.age}
            </div>
            <div className="mb-4">
              <strong>Gender: </strong>{selectedMember.gender}
            </div>
            <div className="mb-4">
              <strong>Relation: </strong>{selectedMember.relation}
            </div>
            <div className="mb-4">
              <strong>Condition: </strong>{selectedMember.condition}
            </div>
            <div className="mb-4">
              <strong>Last Visit: </strong>{selectedMember.lastVisit}
            </div>
            <div className="mb-4">
              <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-48 object-cover rounded-lg" />
            </div>

            {/* Close Modal Button */}
            <Button
              onClick={handleCloseModal}
              className="w-full bg-red-600 text-white hover:bg-red-700 rounded-xl py-2 px-4"
            >
              Close
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
