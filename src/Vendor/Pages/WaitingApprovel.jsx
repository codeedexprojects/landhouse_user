import React from 'react';
import image from "../../assets/LoginHalf.png"
import image1 from "../../assets/waiting.jpg"

export default function WaitingApproval() {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Blue Background */}
      <div
        className="hidden md:flex md:w-1/2 bg-blue-500 flex-col justify-between items-center text-white p-8"
        style={{
          backgroundImage: `url(${image})`,  // optional
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center mt-12">
          <h2 className="italic text-2xl mb-8">Welcome To !</h2>

          {/* Logo */}
          <div className="bg-white rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-4">
            <div className="text-blue-500">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L4 9v12h16V9l-8-6zm0 1.618l6 4.5V20h-2v-6H8v6H6V9.118l6-4.5z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-wider mt-2">LANDOUSE</h1>
        </div>

        <div className="text-center mb-8 px-6">
          <p className="text-sm">
            Your trusted partner in finding the perfect home, land, or investment property.
            Explore a wide range of listings, connect with verified agents, and make
            confident real estate decisions — all in one place.
          </p>
        </div>
      </div>

      {/* Right Side - Waiting Content */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">You're in line.</h2>
          <h3 className="text-2xl font-bold mb-4">Thanks for your patience!</h3>
          <p className="text-gray-600 mb-6">
            Approval is currently in process. You will be notified once it is complete.
          </p>

          {/* Image */}
          <img
            src={image1} // <-- Put your illustration image path here
            alt="Waiting Illustration"
            className="mx-auto w-60 h-auto"
          />
        </div>
      </div>
    </div>
  );
}
