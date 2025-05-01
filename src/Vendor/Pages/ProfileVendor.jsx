import React from 'react';

function ProfileVendor() {
  return (
    <div className="min-h-screen bg-blue-50 p-4 font-sans">
      <div className="w-full">
        {/* Header with emoji and name */}
        <div className="mb-4">
          <h1 className="text-xl text-blue-500 font-medium flex items-center">
            <span className="mr-2">🎉</span> Hey Alexander Hipp,
          </h1>
        </div>

        {/* Verified phone number */}
        <div className="mb-6">
          <div className="bg-blue-100 rounded-md p-3 flex justify-between items-center">
            <span className="text-gray-700">
              verified phone number : <span className="font-bold">9989898978</span>
            </span>
            <button className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Section title */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Add Additional Information</h2>
        </div>

        {/* Form and Profile Image Side by Side */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Form fields */}
          <div className="flex-1 space-y-4">
            {/* Role dropdown */}
            <div>
              <label className="block mb-1 text-gray-700">Choose your Role</label>
              <select className="w-full bg-blue-100 p-3 rounded-md text-gray-700">
                <option>Select Role</option>
                <option>Vendor</option>
                <option>Service Provider</option>
                <option>Customer</option>
              </select>
            </div>

            {/* Email field */}
            <div>
              <label className="block mb-1 text-gray-700">Enter your E-mail</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-blue-100 p-3 rounded-md text-gray-700"
              />
            </div>

            {/* Postcode field */}
            <div>
              <label className="block mb-1 text-gray-700">Enter your post code</label>
              <input
                type="text"
                placeholder="Enter your postcode"
                className="w-full bg-blue-100 p-3 rounded-md text-gray-700"
              />
            </div>

            {/* City field */}
            <div>
              <label className="block mb-1 text-gray-700">Enter your city</label>
              <input
                type="text"
                placeholder="Enter your city"
                className="w-full bg-blue-100 p-3 rounded-md text-gray-700"
              />
            </div>

            {/* About Profession */}
            <div>
              <label className="block mb-1 text-gray-700">About your profession</label>
              <textarea
                rows="4"
                placeholder="Tell us about your profession"
                className="w-full bg-blue-100 p-3 rounded-md text-gray-700 resize-none"
              />
            </div>
          </div>

          {/* Profile image upload */}
          <div className="flex justify-center md:block">
            <div className="bg-blue-100 rounded-md w-32 h-32 flex flex-col items-center justify-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <div className="text-xs text-gray-500">Add Image</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileVendor;