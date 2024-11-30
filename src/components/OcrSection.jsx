import React, { useState } from "react";

const OcrSection = () => {
  const [image, setImage] = useState(null);
  const [json, setJson] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Mocking an OCR process here. Replace this with your actual OCR function.
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        // Simulating JSON response after OCR processing
        setJson({
          prescription: {
            medicine: "Aspirin",
            dosage: "500mg",
            frequency: "Twice a day",
          },
          doctor: "Dr. John Doe",
          date: "2024-11-30",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="px-8 py-16 min-h-[600px]"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1140108276/photo/close-up-of-stethoscope-and-doctor.jpg?s=612x612&w=0&k=20&c=IxqXCmE0ZP-cfmg25OwOi9YukWzLufyUZvMrq_Qlh58=')", // Add your background image URL here
        backgroundSize: "cover",
        backgroundPosition: "center 10%",
      }}
    >
      <h2 className="text-4xl font-bold text-center text-black">
        Prescription Generation Through OCR
      </h2>
      <div className="mt-24">
        <div className="flex mt-20 justify-center items-center gap-12">
          {/* Left Section - Image Upload */}
          <div className="w-1/3 text-center border-[3px] border-black p-4 rounded-lg  min-h-40 bg-opacity-50">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
              />
              <div className="mt-4">
                {image ? (
                  <img
                    src={image}
                    alt="Prescription"
                    className="w-full h-auto"
                  />
                ) : (
                  <p className="text-black">
                    Upload an image of the prescription
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Arrow between Left and Right */}
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-teal-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 4.293a1 1 0 011.414 0L16 8.586a1 1 0 010 1.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 10H3a1 1 0 110-2h10.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Right Section - JSON Preview */}
          <div className="w-1/3 text-center border-[3px] border-black min-h-40 p-4 rounded-lg  bg-opacity-70">
            {json ? (
              <pre className="bg-gray-100 p-4 rounded-lg">
                {JSON.stringify(json, null, 2)}
              </pre>
            ) : (
              <p className="text-black">JSON output will appear here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OcrSection;
