import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- for navigation
import image from "../../assets/LoginHalf.png";
import image1 from "../../assets/waiting.jpg";
import image2 from "../../assets/logo.png"


export default function WaitingApproval() {
  const navigate = useNavigate(); // initialize navigate function

  const handleTryLogin = () => {
    navigate('/vendor/login'); // redirect to vendor login
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Blue Background */}
      <div
        className="hidden md:flex md:w-1/2 bg-blue-500 flex-col justify-between items-center text-white p-8"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center mt-12">
          <h2 className="italic text-2xl mb-8">Welcome To !</h2>

          {/* Logo */}
          <div className="bg-white rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-4">
            <img
              src={image2}
              alt="Logo"
              className="w-16 h-16 object-contain"
            />
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
            src={image1}
            alt="Waiting Illustration"
            className="mx-auto w-60 h-auto mb-6"
          />

          {/* 🔥 Try Login Again Button */}
          <button
            onClick={handleTryLogin}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Go To Login
          </button>
        </div>
      </div>
    </div>
  );
}
