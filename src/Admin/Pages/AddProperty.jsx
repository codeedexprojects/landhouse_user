import React, { useState } from 'react';
import { MapPin, Upload, Plus } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { addProperty } from '../../services/allApi/adminAllApis';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddProperty = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    property_type: '',
    property_price: '',
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
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [files, setFiles] = useState([]);
  const [privateNote, setPrivateNote] = useState('');
  const [noteTitle, setNoteTitle] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!formData.property_type || !formData.property_price || !formData.area || !formData.address || !formData.zipCode) {
      toast.error("Required fields are missing");
      return;
    }
  
    // Make sure latitude and longitude are available
    if (!latitude || !longitude) {
      toast.error("Coordinates not available.");
      return;
    }
  
    // Prepare property data
    const propertyData = {
      ...formData,
      coordinates: `${latitude},${longitude}`,
    };
  
    // Add files (photos) to the property data
    if (files.length > 0) {
      propertyData.files = files;
    }
  
    try {

      const response = await addProperty(propertyData);
  
      if (response && response.data) {
        toast.success("Property added successfully!");

        setTimeout(() => {
          navigate('/admin/view-property');
        }, 1000);
      } else {
        toast.error("No data received in response");
      }
    } catch (error) {
      console.error("Error while adding property:", error.message || error);
    }
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
                name="property_type"
                placeholder="Office, Apartment, House"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.property_type}
                onChange={handleChange}
              />
            </div>

            {/* Property Price */}
            <div>
              <label className="block text-sm font-medium mb-2">Property Price</label>
              <input
                type="text"
                name="property_price"
                placeholder="₹ 4500000"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.property_price}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Location mark</label>
            <div className="bg-gray-100 h-64 rounded-md flex items-center justify-center">
              <div className="text-center p-4">
                <MapPin className="mx-auto mb-2 text-gray-500" />
                <p className="text-gray-500 font-medium">Choose Property location</p>
                <p className="text-gray-400 my-1">or</p>
                <button 
                  type="button" 
                  onClick={handleUseCurrentLocation}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
                >
                  Use current location
                </button>
              </div>
            </div>
          </div>

          {/* Coordinates */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Coordinates</label>
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Add your longitude"
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-center my-2 text-gray-400">or</div>
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Add your latitude"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Photos */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex items-center justify-center bg-gray-50 col-span-2">
                <input 
                  type="file" 
                  multiple 
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="text-center cursor-pointer">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Drop files here or click to upload.</p>
                </label>
              </div>
              
              <div className="flex flex-col space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-md text-gray-400 text-sm hover:bg-gray-50">
                    {file.name}
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={() => document.getElementById('file-upload').click()}
                  className="p-3 border border-gray-200 rounded-md text-gray-400 text-sm flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus size={16} className="mr-1" /> Add More
                </button>
              </div>
            </div>
          </div>

          {/* Private note */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Private note <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Heading"
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="text"
              value={privateNote}
              onChange={(e) => setPrivateNote(e.target.value)}
              placeholder="Title"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <button 
              type="button"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors mt-2"
            >
              Add more
            </button>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
            
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Property
            </button>
          </div>
        </form>
      </div>
            <ToastContainer position="top-right" autoClose={3000} />
      
    </div>
  );
};

export default AddProperty;