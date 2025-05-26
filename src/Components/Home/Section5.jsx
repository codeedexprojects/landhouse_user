import React from 'react';

const WhyChooseUs = () => {
  return (
    <div className="relative w-full h-auto py-16 px-6 overflow-hidden">
      {/* Background Image with Blur Overlay */}
      <img
        src="/src/assets/bgimage.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-blue-300/30 backdrop-blur-md z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto text-indigo-900">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left Section (Text) */}
          <div className="md:w-1/2 text-[#03004D]" data-aos="fade-right">
            <h2 className="text-5xl font-bold mb-6">Why Landouse is Your Best Choice</h2>
            <p className="leading-relaxed text-lg">
              Finding the perfect property can be overwhelming, but Landouse makes the journey seamless and stress-free. Our secure platform offers transparency, convenience, and personalized features that help you make informed decisions with confidence.
            </p>
          </div>

          {/* Right Section (Cards) */}
          <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Trusted Agency */}
            <div 
              className="group bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              data-aos="zoom-in"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="bg-indigo-900 p-2 rounded-full mb-4 z-10">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 z-10">Trusted Agency</h3>
              <p className="text-base text-gray-600 z-10">
                Safe and reliable property-buying experience by listing only verified properties from trusted sellers.
              </p>
            </div>

            {/* Card 2: Legal Support */}
            <div 
              className="group bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              data-aos="zoom-in"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="bg-indigo-900 p-2 rounded-full mb-4 z-10">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 z-10">Legal & Documentation Support</h3>
              <p className="text-base text-gray-600 z-10">
                Property transactions with verified legal assistance.
              </p>
            </div>

            {/* Card 3: Loan Assistance (Full Width) */}
            <div 
              className="group bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center col-span-1 md:col-span-2 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              data-aos="zoom-in"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="bg-indigo-900 p-2 rounded-full mb-4 z-10">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 z-10">Loan Assistance</h3>
              <p className="text-base text-gray-600 z-10">
                Get expert guidance on loan options and financing for your dream property.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;