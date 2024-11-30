import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons"; // Importing the chat bubble icon

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What should I do in case of a medical emergency?",
      answers: [
        "In case of a medical emergency, call your local emergency services or visit the nearest hospital. If you have a healthcare app or emergency contact, make sure to reach out to them as well.",
        "Stay calm and try to assess the situation before calling emergency services. Make sure you have the right address and describe symptoms clearly.",
      ],
    },
    {
      question: "How can I book an appointment with a doctor?",
      answers: [
        "You can book an appointment either by calling the clinic directly or using online healthcare apps or portals. Make sure to provide your health details and preferred time.",
        "Many healthcare providers now allow booking appointments through their website or third-party platforms like Zocdoc or Practo.",
      ],
    },
    {
      question: "What information should I provide during a doctor’s visit?",
      answers: [
        "During a doctor’s visit, provide your personal details, medical history, symptoms, any current medications, and any recent tests or treatments you have undergone.",
        "It’s also helpful to have a list of any allergies, your family health history, and any questions you want to ask the doctor.",
      ],
    },
    {
      question: "How can I track my medication schedule?",
      answers: [
        "You can track your medication schedule using a healthcare app, a medication reminder service, or a physical pillbox. Many apps allow you to set reminders for each dose.",
        "Some apps even allow you to track side effects or refill prescriptions when they are about to run out.",
      ],
    },
  ];

  return (
    <div className="bg-gray-300 min-h-[500px]">
      <div className="faq-section max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-[#2B21E2] mb-12">
          Frequently Asked Questions
          <div className="h-1 w-2/3 mx-auto mt-4 bg-[#2B21E2]"></div>
        </h2>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full bg-[#bcb9f3] text-[#3c35cb] font-semibold p-4 rounded-2xl focus:outline-none flex items-center justify-between"
              >
                <span>{faq.question}</span>
                <span className="ml-4">
                  {openIndex === index ? (
                    <span className="h-3 w-3">-</span> // Minus icon when expanded
                  ) : (
                    <span className="h-3 w-3">+</span> // Plus icon when collapsed
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-2 p-4 bg-gray-100 rounded-md">
                  {faq.answers.map((answer, idx) => (
                    <p key={idx} className="mb-2 text-gray-700">
                      {answer}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Leave a Message Section */}
        <div className="leave-message mt-12 bg-[#a09bf6] text-white p-8 rounded-xl">
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faComment}
              className="text-5xl mr-2 mb-3" // Larger icon and center it
            />
          </div>
          <div className="flex items-center justify-center mb-4 mt-2">
            <span className="text-xl font-semibold">Still have Questions</span>
          </div>
          <p className="text-center text-lg">
            If you have any further questions or need additional assistance,
            feel free to leave a message below.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
