import React from "react";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";

const Dashboard = () => {
  // Example data for family members with image URLs
  const familyMembers = [
    {
      id: 1,
      name: "John Doe",
      condition: "Hypertension",
      lastVisit: "10th Nov 2024",
      image: "https://health-e.in/wp-content/uploads/2023/12/healthcare-concept-with-futuristic-design-graphics-medical-treatment-icons.webp", // Placeholder image
    },
    {
      id: 2,
      name: "Jane Doe",
      condition: "Diabetes",
      lastVisit: "18th Nov 2024",
      image: "https://pidswebs.pids.gov.ph/CDN/featured-image/PR_DP2242-3.jpg", // Placeholder image
    },
    {
      id: 3,
      name: "Emily Doe",
      condition: "Asthma",
      lastVisit: "15th Nov 2024",
      image: "https://opinionexpress.in/assets/images/article/1597126632.jpg", // Placeholder image
    },
    {
      id: 4,
      name: "Michael Doe",
      condition: "Healthy",
      lastVisit: "5th Nov 2024",
      image: "https://st3.depositphotos.com/13349494/17896/i/450/depositphotos_178964866-stock-photo-stethoscope-cardiogram-red-heart-isolated.jpg", // Placeholder image
    },
    {
      id: 5,
      name: "Alex Doe",
      condition: "Healthy",
      lastVisit: "5th Nov 2024",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6aFr0GuWgAArEETKjcBPhDvhtkL8XuVKHiA&s", // Placeholder image
    },
    {
      id: 6,
      name: "Chris Doe",
      condition: "Healthy",
      lastVisit: "5th Nov 2024",
      image: "https://t3.ftcdn.net/jpg/01/11/75/56/360_F_111755682_lL0qdCITRiPtS7Ytmr8LGydLd28nk9xM.jpg", // Placeholder image
    },
  ];

  return (
    <div className="w-full md:basis-1/2 lg:basis-1/3">
        <Navbar/>
      <h1 className="mt-6 text-4xl font-bold mb-4">Family Health Dashboard</h1>

      {/* Family Health Overview */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Family Health Overview</h2>
        <div className="relative">
          <Carousel className="relative w-full max-w-6xl mx-auto">
            {/* Carousel Content */}
            <CarouselContent className="items-center gap-4">
              {familyMembers.map((member) => (
                <Card
                  key={member.id}
                  className="w-80 h-96 bg-cover bg-center shadow-lg rounded-lg flex-shrink-0 relative"
                  style={{ backgroundImage: `url(${member.image})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 text-white z-10">
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <p className="text-teal-300">Condition: {member.condition}</p>
                    <p className="text-gray-300">Last Visit: {member.lastVisit}</p>
                  </div>
                </Card>
              ))}

              {/* Quick Add Button */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <Button
                  className="w-64 h-16 bg-teal-600 text-white text-lg rounded-lg hover:bg-teal-700"
                  onClick={() => alert("Add new family member or record!")}
                >
                  + Quick Add
                </Button>
              </div>
            </CarouselContent>

            {/* Carousel Navigation */}
            <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10" />
            <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </section>

      {/* Graphs/Charts */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Health Trends</h2>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <p>Example Graph: Blood Pressure Tracking</p>
          {/* Replace with actual graph component */}
          <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
            <p>Graph Placeholder</p>
          </div>
        </div>
      </section>

      {/* Health Notifications */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Health Notifications</h2>
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
    </div>
  );
};

export default Dashboard;
