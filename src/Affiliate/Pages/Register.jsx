import React from 'react';
import image from "../../assets/LoginHalf.png";

export default function AffiliateRegister() {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Background Image with logo and text */}
      <div
        className="relative hidden md:flex md:w-1/2 bg-cover bg-center flex-col items-center justify-between text-white p-8"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="z-10 text-center w-full mt-8">
          <h2 className="italic text-2xl mb-8">Welcome To!</h2>
          <div className="bg-white rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-4">
            <div className="text-blue-500">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L4 9v12h16V9l-8-6zm0 1.618l6 4.5V20h-2v-6H8v6H6V9.118l6-4.5z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-wider mt-2">LANDOUSE</h1>
        </div>

        <div className="z-10 text-center mb-8 px-4">
          <p className="text-sm">
            Your trusted partner in finding the perfect home, land, or investment property.
            Explore a wide range of listings, connect with verified agents, and make
            confident real estate decisions — all in one place.
          </p>
        </div>
      </div>

      {/* Right side - Register form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Register</h2>

          <form className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-4 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <select
              name="role"
              className="w-full p-4 bg-blue-50 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="" disabled>Select your Role</option>
              <option value="Broker">Broker</option>
              <option value="Employee">Employee</option>
              <option value="Developer">Developer</option>
              <option value="Builder">Builder</option>
            </select>
            <input
              type="tel"
              name="number"
              placeholder="Phone Number"
              className="w-full p-4 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            
            <div className="flex items-start pt-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                className="mt-1"
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-xs text-gray-600">
                By registering your details you agree with our terms & conditions, privacy policy, and cookie policy.
              </label>
            </div>
            <div className="pt-4">
              <button
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
