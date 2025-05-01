import React, { useState } from 'react';
import image from "../../assets/LoginHalf.png"


export default function VerifyNumber() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    console.log('OTP Code:', otpCode);
    // Add verify logic here
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Blue Background */}
      <div
        className="hidden md:flex md:w-1/2 bg-blue-500 flex-col justify-between items-center text-white p-8"
        style={{
          backgroundImage: `url(${image})`, // If you want full background image
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

      {/* Right Side - Verify Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-center md:text-left">Verify Your Number</h2>
          <p className="text-gray-600 text-center md:text-left mb-6">
            We have sent you an SMS on <span className="font-semibold">+91 9987676545</span> with a 6-digit verification code.
          </p>

          {/* OTP Boxes */}
          <div className="flex justify-between mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength="1"
                className="w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            className="w-full p-4 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors"
          >
            Verify
          </button>

          {/* Resend */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Didn't receive the code? <button className="text-blue-500 hover:underline">Re-send</button>
          </p>
        </div>
      </div>
    </div>
  );
}
