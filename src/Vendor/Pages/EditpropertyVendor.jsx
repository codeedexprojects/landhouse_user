import React, { useState } from "react";
import { MapPin, Upload, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditPropertyVendorAPI } from "../../services/allApi/vendorAllAPi";

function EditpropertyVendor() {
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state?.property;
  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
      property_type: property?.property_type || "",
      property_price: property?.property_price || "",
      price_per_cent: property?.price_per_cent || "",
      area: property?.area || "",
      carpet_area: property?.carpet_area || "",
      whats_nearby: property?.whats_nearby || "",
      buildIn: property?.buildIn || "",
      cent: property?.cent || "",
      maxrooms: property?.maxrooms || "",
      beds: property?.beds || "",
      baths: property?.baths || "",
      car_parking: property?.car_parking || "",
      car_access: property?.car_access || "no",
      floor: property?.floor || "",
      road_frontage: property?.road_frontage || "",
      description: property?.description || "",
      address: property?.address || "",
      zipcode: property?.zipcode || "",
      coordinates: property?.coordinates || { latitude: "", longitude: "" },
      private_note: property?.private_note || { heading: "", title: "" },
      photos: property?.photos || []
    });
  
    
  
    // Define which fields to show for each property type
    const getFieldsForPropertyType = (type) => {
      const commonFields = [
        { name: 'property_price', label: 'Property Price', placeholder: '₹ 4500000', type: 'text' },
        { name: 'whats_nearby', label: "What's nearby", placeholder: 'School, Hospital, House', type: 'text' },
        { name: 'buildIn', label: 'Build in', placeholder: '2002', type: 'text' }
      ];
  
      switch(type) {
        case 'Home/Villa':
          return [
            ...commonFields,
            { name: 'cent', label: 'Land Area', placeholder: '5 Cent', type: 'text' },
            { name: 'beds', label: 'Beds', placeholder: '5', type: 'text' },
            { name: 'maxrooms', label: 'Max Rooms', placeholder: '5', type: 'text' },
            { name: 'baths', label: 'Baths', placeholder: '3', type: 'text' },
            { name: 'area', label: 'Building Area', placeholder: '2000 sq ft', type: 'text' },
            { name: 'car_access', label: 'Car Access', type: 'select', options: ['no', 'yes'] }
          ];
        case 'Flat':
          return [
            ...commonFields,
            { name: 'carpet_area', label: 'Carpet Area', placeholder: '1800 sq ft', type: 'text' },
            { name: 'maxrooms', label: 'Max Rooms', placeholder: '5', type: 'text' },
            { name: 'beds', label: 'Beds', placeholder: '5', type: 'text' },
            { name: 'baths', label: 'Baths', placeholder: '3', type: 'text' },
            { name: 'car_parking', label: 'Car Parking', placeholder: '2', type: 'text' },
            { name: 'floor', label: 'Floor', placeholder: '2', type: 'text' }
          ];
        case 'Residential land':
          return [
            ...commonFields,
            { name: 'price_per_cent', label: 'Price per Cent', placeholder: '₹ 100000', type: 'text' },
            { name: 'cent', label: 'Land Area', placeholder: '5 Cent', type: 'text' },
            { name: 'car_access', label: 'Car Access', type: 'select', options: ['no', 'yes'] }
          ];
        case 'Agriculture land':
        case 'Commercial land':
          return [
            ...commonFields,
            { name: 'price_per_cent', label: 'Price per Cent', placeholder: '₹ 100000', type: 'text' },
            { name: 'cent', label: 'Land Area', placeholder: '5 Cent', type: 'text' },
            { name: 'road_frontage', label: 'Road Frontage', placeholder: '30 feet', type: 'text' }
          ];
        case 'Shop/Office':
          return [
            ...commonFields,
            { name: 'price_per_cent', label: 'Price per Cent', placeholder: '₹ 100000', type: 'text' },
            { name: 'area', label: 'Buildup Area', placeholder: '2000 sq ft', type: 'text' },
            { name: 'road_frontage', label: 'Road Frontage', placeholder: '30 feet', type: 'text' },
            { name: 'floor', label: 'Floor', placeholder: '2', type: 'text' },
            { name: 'car_access', label: 'Car Access', type: 'select', options: ['no', 'yes'] }
          ];
        default:
          return [];
      }
    };
  
    const renderField = (field) => {
      switch(field.type) {
        case 'select':
          return (
            <select
              name={field.name}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData[field.name]}
              onChange={handleChange}
            >
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          );
        default:
          return (
            <input
              type={field.type || 'text'}
              name={field.name}
              placeholder={field.placeholder}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData[field.name]}
              onChange={handleChange}
            />
          );
      }
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            coordinates: {
              ...prev.coordinates,
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString(),
            },
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handlePrivateNoteChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      private_note: {
        ...prev.private_note,
        [name]: value,
      },
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await EditPropertyVendorAPI(property._id, formData);

      if (response?.data?.success) {
        toast.success("Property updated successfully!");
        setTimeout(() => {
          navigate("/vendor/prop-vendor");
        }, 2000);
      } else {
        toast.error("Failed to update property.");
      }
    } catch (error) {
      console.error("Edit error:", error);
      toast.error(error.message || "An error occurred while updating.");
    }
  };

  console.log(property);
  

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span>property</span>
          <span className="mx-2">/</span>
          <span className="text-blue-500">Edit property</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-medium">Edit Property</h1>
        </div>

        <form className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Property Type</label>
              <select
                name="property_type"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.property_type}
                onChange={handleChange}
              >
                <option value="">Select Property Type</option>
                <option value="Home/Villa">Home/Villa</option>
                <option value="Flat">Flat</option>
                <option value="Residential land">Residential land</option>
                <option value="Agriculture land">Agriculture land</option>
                <option value="Commercial land">Commercial land</option>
                <option value="Shop/Office">Shop/Office</option>
              </select>
            </div>

            {/* Dynamic Fields */}
            {formData.property_type && getFieldsForPropertyType(formData.property_type).map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium mb-2">{field.label}</label>
                {renderField(field)}
              </div>
            ))}
          </div>
          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location mark
            </label>
            <div className="bg-gray-100 h-64 rounded-md flex items-center justify-center">
              <div className="text-center p-4">
                <MapPin className="mx-auto mb-2 text-gray-500" />
                <p className="text-gray-500 font-medium">
                  Choose Property location
                </p>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coordinates
            </label>
            <input
              type="text"
              name="longitude"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData?.coordinates?.longitude || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  coordinates: {
                    ...prev.coordinates,
                    longitude: e.target.value,
                  },
                }))
              }
            />
            <div className="text-center my-2 text-gray-400">or</div>
            <input
              type="text"
              name="latitude"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData?.coordinates?.latitude || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  coordinates: {
                    ...prev.coordinates,
                    latitude: e.target.value,
                  },
                }))
              }
            />
          </div>

          {/* Photos */}

          {property?.photos && property.photos[0] && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-5">
                Current Photo
              </label>
              <img
                src={`https://landouse-backend.onrender.com/${property.photos[0]}`}
                alt="Current Property"
                className="w-64 h-40 object-cover rounded border"
              />
            </div>
          )}

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex items-center justify-center bg-gray-50 col-span-2">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="text-center cursor-pointer"
                >
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Drop files here or click to upload.
                  </p>
                </label>
              </div>

              <div className="flex flex-col space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="p-3 border border-gray-200 rounded-md text-gray-400 text-sm hover:bg-gray-50"
                  >
                    {file.name}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => document.getElementById("file-upload").click()}
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
              name="heading"
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData?.private_note?.heading || ""}
              onChange={handlePrivateNoteChange}
            />
            <input
              type="text"
              name="title"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData?.private_note?.title || ""}
              onChange={handlePrivateNoteChange}
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
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) => handleEdit(e, property?._id)}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default EditpropertyVendor;
