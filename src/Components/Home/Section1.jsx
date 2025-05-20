import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/properties');
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative w-full h-[650px] mb-12 rounded-xl overflow-hidden" data-aos="fade-up">
      <img src="/src/assets/Home.png" alt="Banner" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-opacity-40 flex items-center px-8 md:px-16">
        <div className="text-[#3A7EDD] max-w-md mt-52" data-aos="fade-right" data-aos-delay="200">
          <h2 className="text-3xl md:text-4xl font-bold mt-5" data-aos="fade-down" data-aos-delay="400">
            Invest In Your Future Today
          </h2>
          <p className="text-sm md:text-base mb-5 mt-5" data-aos="fade-up" data-aos-delay="600">
            Discover Profitable properties with expert guidance
          </p>
          <button
            className="bg-gradient-to-r from-blue-500 cursor-pointer to-blue-900 text-white px-6 py-2 rounded shadow hover:text-blue-900 hover:from-blue-300 hover:to-blue-200 transition"
            onClick={handleClick}
            data-aos="zoom-in"
            data-aos-delay="800"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;