import React from 'react';
import image3 from "../../assets/image3.jpg";

const AboutUsSection = () => {
  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image3})` }}
      />

      {/* Full white overlay with shade */}
      <div className="absolute inset-0 bg-white opacity-50"></div> {/* You can adjust the opacity as needed */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">About Us</h1>
        {/* You can add more content below if needed */}
      </div>
    </section>
  );
};

export default AboutUsSection;
