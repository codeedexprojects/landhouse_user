import React from 'react';
import image3 from "../../assets/image.png"

const HomeLoanForm = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center px-6">
      <div className="w-full max-w-7xl">
        {/* Heading stays on the left */}
        <h2 className="text-xl font-semibold text-[#0c0c2c] mb-6">
          We'll Help You Find the Perfect Home Loan
        </h2>

        {/* Form and Image side by side */}
        <div className="flex flex-col md:flex-row items-start justify-between w-full">
          {/* Left Side: Form */}
          <div className="md:w-1/2 w-full md:pl-50">
            <form className="space-y-4 w-full max-w-sm">
              <div>
                <label className="block text-sm text-[#0c0c2c] mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm text-[#0c0c2c] mb-1">Phone Number</label>
                <input
                  type="text"
                  className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm text-[#0c0c2c] mb-1">Occupation</label>
                <select className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">Select occupation</option>
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#0c0c2c] mb-1">Type of Loan</label>
                <select className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">Select loan type</option>
                  <option value="home">Home Loan</option>
                  <option value="plot">Plot Loan</option>
                  <option value="renovation">Renovation Loan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#0c0c2c] mb-1">Monthly Salary</label>
                <input
                  type="text"
                  className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your monthly salary"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Right Side: Image */}
          <div className="md:w-1/2 w-full mt-10 md:mt-0 flex justify-center items-center">
            <img
              src={image3}
              alt="Home loan illustration"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanForm;
