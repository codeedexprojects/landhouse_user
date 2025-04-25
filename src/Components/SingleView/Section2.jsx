import React from 'react';

const PropertyDetails = () => {
  return (
    <div className="p-10 bg-white text-[#0c0c2c] space-y-12">
      {/* Top Section: Overview + Form */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Overview */}
        <div className="md:w-1/2">
          <h2 className="text-lg font-semibold mb-6">Overview</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Address</span>
              <span className="text-[#6b6b8d]">Palakkad, Kerala</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">City</span>
              <span className="text-[#6b6b8d]">Palakkad</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">State</span>
              <span className="text-[#6b6b8d]">Kerala</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Postal Code</span>
              <span className="text-[#6b6b8d]">123456</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">What's Nearby</span>
              <span className="text-[#6b6b8d]">School, Groceries</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:w-1/2">
          <h2 className="text-lg font-semibold mb-6">Ask About This Property</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-blue-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border border-blue-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-blue-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              rows="4"
              placeholder="Type your message here"
              className="w-full border border-blue-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
           <div className="flex justify-end">
  <button
    type="submit"
    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
  >
    Send
  </button>
</div>

          </form>
        </div>
      </div>

      {/* Description Section */}
      <div className="text-sm md:text-base">
        <h2 className="text-lg font-semibold mb-4">Description</h2>
        <p className="text-[#2c2c51] leading-relaxed">
          The house, built in 2003, is a charming single-story residence with a classic design.
          Featuring a spacious living room, a cozy kitchen, and three well-lit bedrooms, it provides
          a comfortable living space. The exterior boasts a traditional brick façade with a neatly
          landscaped front yard. Large windows allow ample natural light, while the backyard offers a
          serene retreat with a small patio. The house has been well-maintained over the years,
          preserving its original character while incorporating modern conveniences.
        </p>
      </div>
    </div>
  );
};

export default PropertyDetails;
