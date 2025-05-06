import React, { useState, useEffect } from 'react';
import { MapPin, Upload, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addPropertyVendor } from '../../services/allApi/vendorAllAPi';


const AddProperty = () => {
  const navigate = useNavigate();

  // Consolidated formData without coordinates
  const [formData, setFormData] = useState({
    property_type: '',
    property_price: '',
    area: '',
    whats_nearby: '',
    buildIn: '',
    cent: '',
    maxrooms: '',
    beds: '',
    baths: '',
    description: '',
    address: '',
    zipcode: '',
    // Removed coordinates field from here
  });

  // Separate state for coordinates
  const [coordinates, setCoordinates] = useState({
    latitude: '',
    longitude: ''
  });

  // State for files and private notes
  const [files, setFiles] = useState([]);
  const [privateNote, setPrivateNote] = useState('');
  const [noteTitle, setNoteTitle] = useState('');

  // Handle file uploads
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  // Handle using current location
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toString();
          const lng = position.coords.longitude.toString();

          setCoordinates({
            latitude: lat,
            longitude: lng
          });
          
          toast.info("Location coordinates obtained successfully");
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Failed to get current location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle coordinate field changes
  const handleCoordinateChange = (e) => {
    const { name, value } = e.target;
    setCoordinates(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission started");

    // Validate required fields
    if (!formData.property_type || !formData.property_price || !formData.area || !formData.address || !formData.zipcode) {
      toast.error("Required fields are missing");
      return;
    }

    const user_id = localStorage.getItem('vendorId');
    if (!user_id) {
      toast.error("User not authenticated. Please login again.");
      return;
    }
    // Make sure coordinates are available
    if (!coordinates.latitude || !coordinates.longitude) {
      toast.error("Location coordinates not available. Please set your coordinates.");
      return;
    }

    // Prepare FormData
    const formDataToSend = new FormData();
    formDataToSend.append('user_id', user_id);
    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // IMPORTANT: Match exactly how Postman sends coordinates
    // Method 1: Try sending as a JSON string exactly as shown in your successful example
    formDataToSend.append('coordinates[latitude]', coordinates.latitude);
    formDataToSend.append('coordinates[longitude]', coordinates.longitude);
    
    console.log("Coordinates being sent:", coordinates.latitude, coordinates.longitude);

    // Append files
    files.forEach((file) => {
      formDataToSend.append('photos', file);
    });

    // Append private note
    if (noteTitle || privateNote) {
      formDataToSend.append('private_note[heading]', noteTitle);
      formDataToSend.append('private_note[title]', privateNote);
    }

    // Debug what's being sent
    console.log("Form data being sent:");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, ":", typeof value === 'object' ? 'File or Object' : value);
    }

    try {
      toast.info("Submitting property data...");
      const response = await addPropertyVendor(formDataToSend);

      if (response && response.data) {
        console.log("Success response:", response.data);
        toast.success("Property added successfully!");
        setTimeout(() => {
          navigate('/vendor/prop-vendor');
        }, 1000);
      } else {
        console.error("Empty response received");
        toast.error("No data received in response");
      }
    } catch (error) {
      console.error("Error while adding property:", error);
      console.error("Error details:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to add property");
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
                name="whats_nearby"
                placeholder="School, Hospital, House"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.whats_nearby}
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
                placeholder="5 Cent"
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
                name="maxrooms"
                placeholder="5"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.maxrooms}
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
                name="zipcode"
                placeholder="Add your pincode"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.zipcode}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={coordinates.longitude}
                  onChange={handleCoordinateChange}
                  placeholder="Add your longitude"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={coordinates.latitude}
                  onChange={handleCoordinateChange}
                  placeholder="Add your latitude"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Coordinates status */}
            {coordinates.latitude && coordinates.longitude ? (
              <div className="mt-2 text-sm text-green-600">
                Location coordinates set: [{coordinates.latitude}, {coordinates.longitude}]
              </div>
            ) : (
              <div className="mt-2 text-sm text-orange-500">
                No coordinates set. Please use current location or enter manually.
              </div>
            )}
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
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md text-gray-400 text-sm hover:bg-gray-50">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newFiles = [...files];
                        newFiles.splice(index, 1);
                        setFiles(newFiles);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
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
              Private note
            </label>
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Heading"
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={privateNote}
              onChange={(e) => setPrivateNote(e.target.value)}
              placeholder="Note content"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
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