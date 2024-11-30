import React from "react";
import { Button } from "./ui/button";

const CtaSection = () => {
  return (
    <div 
    className="bg-gray-100 w-full py-10 text-center min-h-[500px]"
    style={{
      backgroundImage:
        'url("https://cdn.pixabay.com/photo/2016/01/31/15/22/mother-1171569_1280.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center 30%", // Move the image down
    }}>
      {/* Call-to-Action Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Join Thousands of Families</h2>
        <p className="mb-6">
          Start managing your family's health with ease today.
        </p>
        <Button
          onClick={() => navigate("/signup")}
          variant="outline"
          size="lg"
          className="text-teal-600 border-teal-600 hover:bg-teal-600 hover:text-white transition-colors"
        >
          Sign Up Now
        </Button>
      </section>
    </div>
  );
};

export default CtaSection;
