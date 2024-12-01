import React, { useState } from "react";

const HealthInsight = () => {
  const [topic, setTopic] = useState(""); // To hold the selected topic
  const [chatStarted, setChatStarted] = useState(false); // Whether chat has started or not
  const [userMessage, setUserMessage] = useState(""); // User's message
  const [messages, setMessages] = useState([]); // Chat messages history

  // Available healthcare topics with brief descriptions for insights
  const healthcareTopics = [
    {
      label: "General Health",
      description: "General information about health and wellness.",
    },
    {
      label: "Nutrition & Diet",
      description: "Tips for healthy eating and maintaining a balanced diet.",
    },
    {
      label: "Mental Health",
      description: "Discuss mental well-being, stress, anxiety, etc.",
    },
    {
      label: "Physical Fitness",
      description: "Exercise routines, fitness tips, and healthy living.",
    },
    {
      label: "Symptoms & Diagnosis",
      description: "Learn more about symptoms and conditions.",
    },
    {
      label: "Chronic Conditions",
      description:
        "Manage and live with chronic conditions like diabetes or hypertension.",
    },
    {
      label: "Preventive Care",
      description:
        "Preventive measures like vaccinations and regular health check-ups.",
    },
    {
      label: "Medications & Treatments",
      description: "Learn about medications, dosages, and treatment options.",
    },
    {
      label: "Pregnancy & Maternal Health",
      description:
        "Information and advice related to pregnancy and maternal care.",
    },
    {
      label: "Child Health & Development",
      description:
        "Topics covering child health, vaccinations, growth milestones.",
    },
    {
      label: "Elderly Health Care",
      description:
        "Health issues specific to elderly people and how to manage them.",
    },
    {
      label: "Sleep & Rest",
      description: "Improving sleep habits and addressing sleep disorders.",
    },
    {
      label: "Stress & Coping",
      description: "Techniques to cope with stress and manage mental health.",
    },
    {
      label: "Healthy Lifestyle Habits",
      description: "Building healthy habits for long-term well-being.",
    },
    {
      label: "Alternative Medicine & Therapies",
      description: "Explore alternative treatments and therapies for health.",
    },
    {
      label: "Emergency Care",
      description:
        "When to seek emergency care and how to act in urgent health situations.",
    },
    {
      label: "Allergies & Sensitivities",
      description: "Understanding and managing allergies and sensitivities.",
    },
    {
      label: "Immunization",
      description: "Information about vaccines and their importance.",
    },
    {
      label: "Skin Care",
      description:
        "Taking care of your skin, preventing and treating skin issues.",
    },
    {
      label: "Workplace Wellness",
      description:
        "Health tips for maintaining well-being in a workplace environment.",
    },
  ];

  // Handle message input change
  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  // Start chat after topic selection
  const startChat = () => {
    if (topic) {
      setChatStarted(true);
      setMessages([
        ...messages,
        { sender: "user", text: `User chose the topic: ${topic}` },
      ]);
    }
  };

  // Send message in the chat
  const sendMessage = (e) => {
    e.preventDefault();

    if (userMessage.trim()) {
      setMessages([...messages, { sender: "user", text: userMessage }]);
      setUserMessage(""); // Reset input field
    }
  };

  // Render chat interface
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto text-center mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-[#4499E8] mb-4">
          Chat with Us
        </h2>

        {!chatStarted ? (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Select a Topic to Start the Chat
            </h3>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            >
              <option value="">Choose a healthcare topic</option>
              {healthcareTopics.map((topicOption, index) => (
                <option key={index} value={topicOption.label}>
                  {topicOption.label}
                </option>
              ))}
            </select>

            {topic && (
              <div className="text-sm text-gray-500 mb-4">
                <strong>Description:</strong>{" "}
                {healthcareTopics.find((t) => t.label === topic)?.description}
              </div>
            )}

            <button
              onClick={startChat}
              className="w-full bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-700"
              disabled={!topic}
            >
              Start Chat
            </button>
          </div>
        ) : (
          <div>
            <div className="h-64 overflow-y-auto mb-4 border border-gray-300 p-4 rounded-lg">
              {/* Displaying messages */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex rounded-xl ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  } mb-3`}
                >
                  <div
                    className={`text-sm p-2 rounded-xl ${
                      message.sender === "user"
                        ? "bg-teal-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="flex">
              <input
                type="text"
                value={userMessage}
                onChange={handleMessageChange}
                className="w-full p-2 border border-gray-300 rounded-l-xl"
                placeholder="Type your message here..."
              />
              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded-r-xl hover:bg-teal-700"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* Optional footer with contact details or other options */}
        <div className="mt-4 text-sm text-gray-500">
          <p>
            Need help with urgent matters? Call our support at{" "}
            <a href="/contact-us" className="text-teal-600">
              Instant Help
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthInsight;