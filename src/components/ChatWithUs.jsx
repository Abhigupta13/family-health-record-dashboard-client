import React, { useState } from "react";

const ChatWithUs = () => {
  const [topic, setTopic] = useState(""); // To hold the selected topic
  const [chatStarted, setChatStarted] = useState(false); // Whether chat has started or not
  const [userMessage, setUserMessage] = useState(""); // User's message
  const [messages, setMessages] = useState([]); // Chat messages history

  // Available healthcare topics
  const healthcareTopics = [
    "General Health",
    "Nutrition",
    "Symptoms",
    "Mental Health",
    "Diseases & Conditions",
    "Medications",
    "Preventive Care",
    "Emergency Help",
  ];

  // Handle message input change
  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  // Start chat after topic selection
  const startChat = () => {
    if (topic) {
      setChatStarted(true);
      setMessages([...messages, { sender: "user", text: `User chose the topic: ${topic}` }]);
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
    <div className="w-full max-w-lg mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-[#4499E8] mb-4">Chat with Us</h2>

      {!chatStarted ? (
        <div>
          <h3 className="text-lg font-semibold mb-4">Select a Topic to Start the Chat</h3>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          >
            <option value="">Choose a healthcare topic</option>
            {healthcareTopics.map((topicOption, index) => (
              <option key={index} value={topicOption}>
                {topicOption}
              </option>
            ))}
          </select>
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
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-3`}
              >
                <div
                  className={`text-sm p-2 rounded-xl ${message.sender === "user" ? "bg-teal-600 text-white" : "bg-gray-100"}`}
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
  );
};

export default ChatWithUs;
