// components/AddProperty.js
import React, { useState } from 'react';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    propertyType: '',
    propertyPrice: '',
    area: '',
    whatsNearby: '',
    buildIn: '',
    cent: '',
    maxRooms: '',
    beds: '',
    baths: '',
    description: '',
    address: '',
    zipCode: '',
    coordinates: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      media: e.target.files,
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span>property</span>
          <span className="mx-2">/</span>
          <span className="text-blue-500">Add property</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-medium">Add Property</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Property Type</label>
              <input
                type="text"
                name="propertyType"
                placeholder="Office, Apartment, House"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.propertyType}
                onChange={handleChange}
              />
            </div>

            {/* Property Price */}
            <div>
              <label className="block text-sm font-medium mb-2">Property Price</label>
              <input
                type="text"
                name="propertyPrice"
                placeholder="₹ 4500000"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.propertyPrice}
                onChange={handleChange}
              />
            </div>

            {/* Area */}
            <div>
              <label className="block text-sm font-medium mb-2">Area</label>
              <input
                type="text"
                name="area"
                placeholder="2000 sq ft"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.area}
                onChange={handleChange}
              />
            </div>

            {/* What's nearby */}
            <div>
              <label className="block text-sm font-medium mb-2">What's nearby</label>
              <input
                type="text"
                name="whatsNearby"
                placeholder="School, Hospital, House"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.whatsNearby}
                onChange={handleChange}
              />
            </div>

            {/* Build in */}
            <div>
              <label className="block text-sm font-medium mb-2">Build in</label>
              <input
                type="text"
                name="buildIn"
                placeholder="2002"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.buildIn}
                onChange={handleChange}
              />
            </div>

            {/* Cent */}
            <div>
              <label className="block text-sm font-medium mb-2">Cent</label>
              <input
                type="text"
                name="cent"
                placeholder="Palakkad"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.cent}
                onChange={handleChange}
              />
            </div>

            {/* Max Rooms */}
            <div>
              <label className="block text-sm font-medium mb-2">Max Rooms</label>
              <input
                type="text"
                name="maxRooms"
                placeholder="5"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.maxRooms}
                onChange={handleChange}
              />
            </div>

            {/* Beds */}
            <div>
              <label className="block text-sm font-medium mb-2">Beds</label>
              <input
                type="text"
                name="beds"
                placeholder="5"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.beds}
                onChange={handleChange}
              />
            </div>

            {/* Baths */}
            <div>
              <label className="block text-sm font-medium mb-2">Baths</label>
              <input
                type="text"
                name="baths"
                placeholder="3"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.baths}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              rows={5}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Address of your property"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Zip code */}
            <div>
              <label className="block text-sm font-medium mb-2">Zip code</label>
              <input
                type="text"
                name="zipCode"
                placeholder="Add your pincode"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Location mark */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Location mark</label>
            <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500">Choose Property location</p>
                <p className="text-gray-400">or</p>
                <button type="button" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full">
                  Use current location
                </button>
              </div>
            </div>
          </div>

          {/* Coordinates */}
          {/* Media Upload */}
<div className="mt-6">
  <label className="block text-sm font-medium mb-2">Media</label>
  <input
    type="file"
    name="media"
    multiple
    accept="image/*,video/*"
    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={handleFileChange} // use a file handler here
  />
</div>


          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;