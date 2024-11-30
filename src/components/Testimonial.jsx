import React from "react";

const Testimonial = () => {
  return (
    <div className="px-8 py-16 bg-gray-100">
      <div className="flex items-center justify-center">
        <h2 className="text-3xl font-bold text-center items-center justify-center text-yellow-500 mb-12">
          What Our Users Say
          <div className="h-1 w-2/3 mx-auto mt-5 bg-yellow-500"></div>
        </h2>
      </div>

      <div className="flex justify-center gap-8">

        {/* Testimonial Card 1 */}
        <div className="w-1/3 p-6 mt-8 bg-gray-200 rounded-xl shadow-lg border border-gray-200">
          <img
            src="https://cdn.pixabay.com/photo/2019/11/30/12/10/girl-4663125_1280.jpg" // Replace with actual image URL
            alt="User 1"
            className="w-24 h-24 rounded-full mx-auto mb-4 -mt-14"
          />
          <p className="flex text-center text-lg mt-8 text-gray-700 italic mb-4">
            <div className="text-yellow-400 text-5xl">"</div>This service has been amazing! It's simple to use and incredibly
            efficient. I highly recommend it!<div className="text-yellow-400 text-5xl">"</div>
          </p>
          <p className="text-center text-xl text-yellow-400 font-semibold">John Doe</p>
        </div>

        {/* Testimonial Card 2 */}
        <div className="w-1/3 p-6 mt-8 bg-gray-200 rounded-xl shadow-lg border border-gray-200">
          <img
            src="https://cdn.pixabay.com/photo/2021/03/27/19/25/alone-boy-6129399_1280.jpg" // Replace with actual image URL
            alt="User 2"
            className="w-24 h-24 rounded-full mx-auto mb-4 -mt-14"
          />
          <p className="flex text-center text-lg mt-8 text-gray-700 italic mb-4">
          <div className="text-yellow-400 text-5xl">"</div>A fantastic experience! The platform helped me achieve my goals
            faster. I'll definitely use it again!<div className="text-yellow-400 text-5xl">"</div>
          </p>
          <p className="text-center text-xl text-yellow-400 font-semibold">Jane Smith</p>
        </div>

        {/* Testimonial Card 3 */}
        <div className="w-1/3 p-6 mt-8 bg-gray-200 rounded-xl shadow-lg border border-gray-200">
          <img
            src="https://cdn.pixabay.com/photo/2015/03/03/18/58/woman-657753_1280.jpg" // Replace with actual image URL
            alt="User 3"
            className="w-24 h-24 rounded-full mx-auto mb-4 -mt-14"
          />
          <p className="flex text-lg text-center mt-8 text-gray-700 italic mb-4">
          <div className="text-yellow-400 text-5xl">"</div>I am so impressed with the results! It's easy to navigate, and the
            team is always responsive.<div className="text-yellow-400 text-5xl">"</div>
          </p>
          <p className="text-center text-xl text-yellow-400 font-semibold">
            Michael Johnson
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
