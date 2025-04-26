import React, { useState } from 'react';

export default function CreateCouponForm() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      {/* Header with navigation */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-6">
        <div className="text-gray-500">
          <span>Referral</span>
          <span className="mx-2">/</span>
          <span className="text-blue-600">create coupon</span>
        </div>
      </div>
      
      {/* Form container */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="space-y-4">
          {/* Name input */}
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          
          {/* Phone number input */}
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-4 bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          
          {/* Role dropdown */}
          <div className="relative">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-4 bg-blue-100 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="" disabled selected>Enter your Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="affiliate">Affiliate</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* Submit button */}
          <button
            type="submit"
            className="w-full p-4 bg-blue-400 text-center text-white font-medium rounded-md hover:bg-blue-500 transition-colors"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}