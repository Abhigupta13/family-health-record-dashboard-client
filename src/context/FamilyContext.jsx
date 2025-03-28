import { createContext, useState } from 'react';
import { toast } from 'react-hot-toast';

export const FamilyContext = createContext();

export const FamilyProvider = ({ children }) => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const token = localStorage.getItem("token");

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

  const addFamilyMember = async (newMember) => {
    try {
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
      fetchFamilyMembers(); // Refresh the list after adding
    } catch (error) {
      console.error("Error adding family member:", error);
      alert("Failed to add family member. Please try again.");
    }
  };

  const updateFamilyMember = async (member) => {
    console.log("calling")
    try {
      const formData = new FormData();
      Object.entries(member).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      const response = await fetch(`http://localhost:8080/family/${member._id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body:formData,
      });
      if (!response.ok) {
        throw new Error('Failed to update family member');
      }
      fetchFamilyMembers(); // Refresh the list after updating
    } catch (error) {
      console.error("Error updating family member:", error);
      toast.error("Failed to update family member.");
    }
  };

  const deleteFamilyMember = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/family/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete family member");
      fetchFamilyMembers(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting family member:", error);
    }
  };

  return (
    <FamilyContext.Provider
      value={{
        familyMembers,
        fetchFamilyMembers,
        addFamilyMember,
        updateFamilyMember,
        deleteFamilyMember,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
}; 