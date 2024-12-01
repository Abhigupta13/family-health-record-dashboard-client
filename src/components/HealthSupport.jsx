import React, { useState } from 'react';

const HealthSupport = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      title: 'Personalized Care Plans',
      description: 'Get customized health plans based on your specific health needs and goals.',
    },
    {
      title: 'Wellness Tips',
      description: 'Receive daily tips on healthy living, exercise, diet, and mental well-being.',
    },
    {
      title: 'Expert Advice',
      description: 'Access professional health advice and guidance for managing your conditions.',
    },
    {
      title: 'Medication Reminders',
      description: 'Set reminders to never miss your prescribed medications or treatments.',
    },
    {
      title: 'Symptom Checker',
      description: 'Use the symptom checker tool to identify possible conditions and next steps.',
    },
    {
      title: '24/7 Support',
      description: 'Get round-the-clock support for any health-related queries or emergencies.',
    },
    {
      title: 'Health Dashboard',
      description: 'Monitor your health progress with a personalized health dashboard and metrics.',
    },
  ];

  return (
    <div className="bg-gray-200 p-8 h-screen">
      <h2 className="text-4xl font-semibold text-center text-[#2B21E2] mb-8">
        Health Support Features
      </h2>
      
      <div className="features-list text-center grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-item p-4 bg-white rounded-2xl shadow-md cursor-pointer w-full max-w-lg mx-auto"
            onClick={() => setSelectedFeature(feature)}
          >
            <h3 className="text-lg font-semibold text-[#3c35cb] mb-2">{feature.title}</h3>
            <p className="text-gray-700 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {selectedFeature && (
        <div className="feature-detail mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-[#3c35cb] mb-4">
            {selectedFeature.title}
          </h3>
          <p className="text-gray-700">{selectedFeature.description}</p>
        </div>
      )}
    </div>
  );
};

export default HealthSupport;
