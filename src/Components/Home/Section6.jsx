import React from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from "../../assets/roundimage.png"

const DreamProperty = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-blue-50 w-full flex items-center justify-center py-16 px-4 overflow-hidden" data-aos="fade-up">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 p-4 md:p-8" data-aos="fade-right" data-aos-delay="200">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Get Your Dream Property
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-md">
            Discover the ideal property that suits your needs and lifestyle. Start your journey to the perfect home today!
          </p>
          <button onClick={handleContactClick} className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 text-base sm:text-lg rounded transition duration-300">
            Contact Now
          </button>
        </div>
        <div className="md:w-1/2 p-4 md:p-0 mt-8 md:mt-0 relative flex justify-center" data-aos="fade-left" data-aos-delay="400">
          <div className="w-72 h-72 rounded-full bg-blue-100/50 border-8 border-white/20 p-2 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-blue-200 -m-2"></div>
            <div className="absolute inset-0 rounded-full border-2 border-blue-200 -m-4"></div>
            <div className="absolute inset-0 rounded-full border-2 border-blue-200 -m-6"></div>
            <img
              src={image1}
              alt="Modern dream home"
              className="w-64 h-64 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamProperty;