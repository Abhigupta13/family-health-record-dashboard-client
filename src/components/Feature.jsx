import React from 'react';
import { useParams } from 'react-router-dom';

const FeaturePage = () => {
  const { featureId } = useParams();
  const getFeatureContent = (id) => {
    switch (id) {
      case '1':
        return (
          <div>
            <h2 className="text-3xl font-bold">Health Insights</h2>
            <p>Track your family members' health metrics and get AI-powered insights.</p>
          </div>
        );
      case '2':
        return (
          <div>
            <h2 className="text-3xl font-bold">Medical Records</h2>
            <p>Store and manage detailed medical records for each family member.</p>
          </div>
        );
      case '3':
        return (
          <div>
            <h2 className="text-3xl font-bold">Emergency Contacts</h2>
            <p>Keep an updated list of emergency contacts for easy access in case of emergencies.</p>
          </div>
        );
      default:
        return <p>Select a feature to learn more.</p>;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Feature Details</h1>
      {getFeatureContent(featureId)}
    </div>
  );
};

export default FeaturePage;
