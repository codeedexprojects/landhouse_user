import React from 'react';
import image from "../../assets/LoginHalf.png"
import image1 from "../../assets/accepted.jpg"
import image2 from "../../assets/logo.png"



export default function AccessGranted() {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Blue Background */}
      <div
              className="relative hidden md:flex md:w-1/2 bg-cover bg-center flex-col items-center justify-between text-white p-8"
              style={{
                  backgroundImage: `url(${image})`
                
              }}
            >
              {/* Top welcome text */}
              <div className="z-10 text-center w-full mt-8">
                <h2 className="italic text-2xl mb-8">Welcome To!</h2>
      
                {/* Logo circle */}
               <div className="bg-white rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-4">
            <img
              src={image2}
              alt="Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
      
                {/* Brand name */}
                <h1 className="text-3xl font-bold tracking-wider mt-2">LANDOUSE</h1>
              </div>
      
              {/* Bottom description text */}
              <div className="z-10 text-center mb-8 px-4">
                <p className="text-sm">
                  Your trusted partner in finding the perfect home, land, or investment property.
                  Explore a wide range of listings, connect with verified agents, and make
                  confident real estate decisions — all in one place.
                </p>
              </div>
            </div>

      {/* Right Side - Access Granted Content */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Access Granted</h2>
          <p className="text-gray-600 mb-6">
            Your login approval is completed. You can now explore all the features available in your account.
          </p>

          {/* Image */}
          <img
            src={image1} // <-- Put your illustration image path here
            alt="Access Granted Illustration"
            className="mx-auto w-60 h-auto mb-8"
          />

          {/* Button */}
          <button
            onClick={() => console.log('Go to Dashboard')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center mx-auto"
          >
            Go to dashboard
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
