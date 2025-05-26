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
      photos: property?.photos || [],
      isFeatured: property?.isFeatured || false,
      isLatest: property?.isLatest || false
    });
  
    const [files, setFiles] = useState([]);
    const [existingPhotos, setExistingPhotos] = useState(property?.photos || []);
    const [photosToRemove, setPhotosToRemove] = useState([]);
  
    // Define which fields to show for each property type
    const getFieldsForPropertyType = (type) => {
      const commonFields = [
        { name: 'property_price', label: 'Property Price', placeholder: '₹ 4500000', type: 'text' },
        { name: 'whats_nearby', label: "What's nearby", placeholder: 'School, Hospital, House', type: 'text' },
        { name: 'buildIn', label: 'Build in', placeholder: '2002', type: 'text' }
      ];
  
      switch (type) {
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
      switch (field.type) {
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
  
    const handleFileChange = (e) => {
      if (e.target.files) {
        setFiles([...files, ...Array.from(e.target.files)]);
      }
    };
  
    const removeNewFile = (index) => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
    };
  
    const removeExistingPhoto = (photoUrl, index) => {
      // Add to photos to remove list
      setPhotosToRemove([...photosToRemove, photoUrl]);
      // Remove from existing photos display
      const updatedPhotos = existingPhotos.filter((_, i) => i !== index);
      setExistingPhotos(updatedPhotos);
      toast.info("Photo marked for removal");
    };
  
    const handleUseCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setFormData((prev) => ({
              ...prev,
              coordinates: {
                latitude: position.coords.latitude.toString(),
                longitude: position.coords.longitude.toString(),
              },
            }));
            toast.success("Location coordinates obtained successfully");
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
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleEdit = async (e) => {
      e.preventDefault();
  
      try {
        const formDataToSend = new FormData();
  
        // Append all form data
        Object.entries(formData).forEach(([key, value]) => {
          if (key === 'coordinates') {
            formDataToSend.append('coordinates[latitude]', value.latitude);
            formDataToSend.append('coordinates[longitude]', value.longitude);
          } else if (key === 'private_note') {
            formDataToSend.append('private_note[heading]', value.heading);
            formDataToSend.append('private_note[title]', value.title);
          } else if (key !== 'photos') {
            formDataToSend.append(key, value);
          }
        });
  
        // Append existing photos that are not marked for removal
        existingPhotos.forEach((photoUrl) => {
          if (!photosToRemove.includes(photoUrl)) {
            formDataToSend.append('existing_photos', photoUrl);
          }
        });
  
        // Append photos to remove
        photosToRemove.forEach((photoUrl) => {
          formDataToSend.append('photos_to_remove', photoUrl);
        });
  
        // Append new files
        files.forEach((file) => {
          formDataToSend.append('photos', file);
        });
  
        const response = await EditPropertyAPI(property._id, formDataToSend);
  
        if (response?.data?.success) {
          toast.success("Property updated successfully!");
          setTimeout(() => {
            navigate("/admin/view-property");
          }, 2000);
        } else {
          toast.error("Failed to update property.");
        }
      } catch (error) {
        console.error("Edit error:", error);
        toast.error(error.response?.data?.message || "An error occurred while updating.");
      }
    };
  
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
  
          <form onSubmit={handleEdit} className="p-4">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Featured Property Toggle */}
              <div className="flex items-center">
                <label className="block text-sm font-medium mr-4">Featured Property</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
  
              {/* Latest Property Toggle */}
              <div className="flex items-center">
                <label className="block text-sm font-medium mr-4">Latest Property</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isLatest"
                    checked={formData.isLatest}
                    onChange={(e) => setFormData({ ...formData, isLatest: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Longitude</label>
                  <input
                    type="text"
                    name="longitude"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.coordinates?.longitude || ""}
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
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Latitude</label>
                  <input
                    type="text"
                    name="latitude"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.coordinates?.latitude || ""}
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
              </div>
            </div>
  
            {/* Current Photos Section */}
            {existingPhotos.length > 0 && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Photos
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Property ${index + 1}`}
                        className="w-full h-32 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingPhoto(photo, index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
  
            {/* New Photos Upload Section */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {existingPhotos.length > 0 ? "Add New Photos" : "Photos"}
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex items-center justify-center bg-gray-50 col-span-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
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
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-md text-gray-700 text-sm hover:bg-gray-50"
                    >
                      <span className="truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeNewFile(index)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <X size={16} />
                      </button>
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
                Private note
              </label>
              <input
                type="text"
                name="heading"
                placeholder="Note heading"
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.private_note?.heading || ""}
                onChange={handlePrivateNoteChange}
              />
              <textarea
                name="title"
                placeholder="Note content"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={formData.private_note?.title || ""}
                onChange={handlePrivateNoteChange}
              />
            </div>
  
            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  };
  

export default EditpropertyVendor;
