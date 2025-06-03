import React, { useState, useEffect } from 'react';
import { MapPin, Upload, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addProperty, fetchDistricts } from '../../services/allApi/adminAllApis';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';


const AddProperty = () => {
  const navigate = useNavigate();

  // Consolidated formData without coordinates
  const [formData, setFormData] = useState({
    property_type: '',
    property_price: '',
    price_per_cent: '',
    area: '',
    carpet_area: '',
    whats_nearby: '',
    buildIn: '',
    cent: '',
    maxrooms: '',
    beds: '',
    baths: '',
    car_parking: '',
    car_access: 'no',
    floor: '',
    road_frontage: '',
    description: '',
    address: '',
    zipcode: '',
    isFeatured: false,
    isLatest: false
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
  const [places, setPlaces] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addressOptions = places.flatMap(district =>
    district.subPlaces.map(sub => ({
      value: `${sub.name}, ${district.name}`,
      label: `${sub.name}, ${district.name}`,
    }))
  );

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const data = await fetchDistricts();
        setPlaces(data);
      } catch (err) {
        console.error("Failed to load places", err);
      }
    };

    getPlaces();
  }, []);


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
    setIsSubmitting(true);
    console.log("Form submission started");

    // Validate required fields
    if (!formData.property_type || !formData.property_price || !formData.address || !formData.zipcode) {
      toast.error("Required fields are missing");
      return;
    }

    const user_id = localStorage.getItem('adminId');
    if (!user_id) {
      toast.error("User not authenticated. Please login again.");
      return;
    }

    if (!coordinates.latitude || !coordinates.longitude) {
      toast.error("Location coordinates not available. Please set your coordinates.");
      return;
    }

    // Prepare FormData
    const formDataToSend = new FormData();
    formDataToSend.append('user_id', user_id);

    // Append all form data including the new fields
    Object.entries(formData).forEach(([key, value]) => {
      // For boolean values, convert to string
      if (typeof value === 'boolean') {
        formDataToSend.append(key, value.toString());
      } else {
        formDataToSend.append(key, value);
      }
    });

    // Append coordinates
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
      const response = await addProperty(formDataToSend);

      if (response && response.data) {
        console.log("Success response:", response.data);
        toast.success("Property added successfully!");
        setTimeout(() => {
          navigate('/admin/view-property');
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
    finally {
      setIsSubmitting(false);
    }
  };


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
          { name: 'area', label: 'Buildup Area', placeholder: '2000 sq ft', type: 'text' },
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
      case 'Other':
        return [
          ...commonFields,
          // { name: 'price_per_cent', label: 'Price per Cent', placeholder: '₹ 100000', type: 'text' },
          { name: 'area', label: 'Buildup Area', placeholder: '2000 sq ft', type: 'text' },
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
                <option value="Other">Other</option>
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
            {/* <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <select
                name="address"  // <-- Important
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.address || ''}
                onChange={handleChange}
              >
                <option value="">Select Address</option>
                {places.map(district =>
                  district.subPlaces.map(sub => {
                    const fullName = `${sub.name}, ${district.name}`;
                    return (
                      <option key={sub._id} value={fullName}>
                        {fullName}
                      </option>
                    );
                  })
                )}
              </select>
            </div> */}
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Select
                name="address"
                className="w-full"
                options={addressOptions}
                value={addressOptions.find(option => option.value === formData.address) || null}
                onChange={selected => handleChange({ target: { name: 'address', value: selected?.value || '' } })}
                isSearchable
                placeholder="Select Address"
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
            {/* <div className="flex items-center">
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
            </div> */}
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
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center min-w-[120px]"
              disabled={isSubmitting} // Disable button during submission
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Submit Property"
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddProperty;