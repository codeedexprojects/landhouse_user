import React, { useState } from 'react';
import image from "../../assets/LoginHalf.png"
import { useNavigate } from 'react-router-dom';

export default function VendorLogin() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    role: '',
    agreeToTerms: false,
  });
  const navigate=useNavigate()

  const handleClick=()=>{
    navigate('/vendor/otp')
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle login logic here
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Background Image with logo and text */}
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
            <div className="text-blue-500">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L4 9v12h16V9l-8-6zm0 1.618l6 4.5V20h-2v-6H8v6H6V9.118l6-4.5z" />
              </svg>
            </div>
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

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-4 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-4 bg-blue-50 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="" disabled>Select your Role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="agent">Agent</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex items-start pt-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1"
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-xs text-gray-600">
                By registering your details you agree with our terms & conditions, privacy policy, and cookie policy.
              </label>
            </div>

            <div className="pt-4">
              <button
              onClick={handleClick}
                type="submit"
                className="w-full p-4 bg-blue-400 text-white font-medium rounded-md hover:bg-blue-500 transition-colors"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
