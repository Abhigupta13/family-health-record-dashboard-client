import React from "react";
import { Button } from "./ui/button"; // Assuming you have a custom Button component
import { FaPhoneAlt } from "react-icons/fa"; // Optional: Phone icon from React Icons

const ContactUs = () => {
  const phoneNumber = "+919867843567"; // Replace with your actual phone number

  return (
    <div className="text-center mt-6">
      <h2 className="text-2xl font-semibold text-[#4499E8] mb-4">Contact Us</h2>
      
      {/* Call Us Button */}
      <a href={`tel:${phoneNumber}`} className="block">
        <Button
          className="w-64 h-16 mt-5 bg-teal-600 text-white text-lg rounded-2xl hover:bg-teal-700"
        >
          <FaPhoneAlt className="mr-2" /> Call Us
        </Button>
      </a>
      
      {/* Optional: Additional contact methods */}
      <p className="text-gray-500 mt-4">
        Or email us at: <a href="mailto:support@example.com" className="text-teal-600">support@example.com</a>
      </p>
    </div>
  );
};

export default ContactUs;
