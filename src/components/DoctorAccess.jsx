import React, { useState } from 'react';
import { Card } from './ui/card';
import { Carousel, CarouselNext, CarouselPrevious } from './ui/carousel'; // Import Carousel as well

const DoctorAccess = () => {
  // Pre-populated doctor details
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. John Doe', qualification: 'MBBS, MD', experience: 15, specialization: 'Cardiology' },
    { id: 2, name: 'Dr. Jane Smith', qualification: 'MBBS, MS', experience: 12, specialization: 'Orthopedics' },
    { id: 3, name: 'Dr. Sarah Lee', qualification: 'MBBS, DNB', experience: 10, specialization: 'Neurology' },
    { id: 4, name: 'Dr. Robert Brown', qualification: 'MBBS, MD', experience: 20, specialization: 'Pediatrics' },
    { id: 5, name: 'Dr. Alice Cooper', qualification: 'MBBS, MD', experience: 18, specialization: 'Dermatology' },
    { id: 6, name: 'Dr. Michael Johnson', qualification: 'MBBS, MS', experience: 25, specialization: 'Gastroenterology' },
    { id: 7, name: 'Dr. Emma Wilson', qualification: 'MBBS, MD', experience: 8, specialization: 'Psychiatry' },
    { id: 8, name: 'Dr. Daniel Harris', qualification: 'MBBS, DNB', experience: 5, specialization: 'ENT' },
  ]);

  // Number of cards visible at once
  const cardsPerPage = 3;
  
  // Track the current page index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to the next set of cards
  const nextPage = () => {
    if (currentIndex + cardsPerPage < doctors.length) {
      setCurrentIndex(currentIndex + cardsPerPage);
    }
  };

  // Navigate to the previous set of cards
  const prevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - cardsPerPage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-teal-50">
      <div className="max-w-4xl w-full p-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-md text-center mb-6">
          Doctor's Details
        </h1>

        {/* Carousel Container */}
        <Carousel>
          <div className="relative">
            {/* Cards Container */}
            <div className="flex space-x-8 pb-6">
              {doctors.slice(currentIndex, currentIndex + cardsPerPage).map((doctor) => (
                <Card key={doctor.id} className="w-80 p-8 rounded-xl shadow-lg bg-gradient-to-r from-teal-100 to-teal-300 hover:shadow-xl transition-all duration-300">
                  <h3 className="font-bold text-2xl text-teal-900 mb-3">{doctor.name}</h3>
                  <p className="text-lg text-gray-700 mb-2">Qualification: <span className="font-semibold text-teal-800">{doctor.qualification}</span></p>
                  <p className="text-lg text-gray-700 mb-2">Experience: <span className="font-semibold text-teal-800">{doctor.experience} years</span></p>
                  <p className="text-lg text-gray-700">Specialization: <span className="font-semibold text-teal-800">{doctor.specialization}</span></p>
                </Card>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <CarouselPrevious
                variant="outline"
                onClick={prevPage}
                disabled={currentIndex === 0}
                className="text-white bg-teal-500 hover:bg-teal-600 rounded-full p-2"
              />
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
              <CarouselNext
                variant="outline"
                onClick={nextPage}
                disabled={currentIndex + cardsPerPage >= doctors.length}
                className="text-white bg-teal-500 hover:bg-teal-600 rounded-full p-2"
              />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default DoctorAccess;
