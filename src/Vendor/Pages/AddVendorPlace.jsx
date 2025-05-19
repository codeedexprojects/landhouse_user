import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, Plus, X } from 'lucide-react';
import { addVendorSubPlace, deleteVendorPlace, fetchVendorDistricts } from '../../services/allApi/vendorAllAPi';


const AddVendorPlace = () => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [subPlaceName, setSubPlaceName] = useState('');
  const [nearPlaces, setNearPlaces] = useState([]);
  const [availableSubPlaces, setAvailableSubPlaces] = useState([]);
  const [selectedNearPlace, setSelectedNearPlace] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadDistricts();
  }, []);

  useEffect(() => {
    if (selectedDistrictId) {
      const district = districts.find(d => d._id === selectedDistrictId);
      if (district) {
        setAvailableSubPlaces(district.subPlaces);
      }
    } else {
      setAvailableSubPlaces([]);
    }
    setNearPlaces([]);
  }, [selectedDistrictId, districts]);

  const loadDistricts = async () => {
    try {
      const data = await fetchVendorDistricts();
      setDistricts(data);
    } catch (error) {
      console.error('Error loading districts:', error);
      toast.error("Failed to load districts");
    }
  };

  const handleAddNearPlace = () => {
    if (selectedNearPlace && !nearPlaces.includes(selectedNearPlace)) {
      setNearPlaces([...nearPlaces, selectedNearPlace]);
      setSelectedNearPlace('');
    }
  };


  const handleRemoveNearPlace = (placeToRemove) => {
    setNearPlaces(nearPlaces.filter(place => place !== placeToRemove));
  };

  const handleAddSubPlace = async (e) => {
    e.preventDefault();
    if (!selectedDistrictId) {
      toast.error("Please select a district");
      return;
    }
    if (!subPlaceName.trim()) {
      toast.error("Sub-place name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      // Prepare the request data
      const requestData = {
        districtId: selectedDistrictId,
        subPlaceName,
        nearPlaces
      };

      console.log("Sending data:", requestData); // Debug log

      await addVendorSubPlace(requestData);
      toast.success("Sub-place added successfully!");
      setSubPlaceName('');
      setNearPlaces([]);
      await loadDistricts();
    } catch (error) {
      console.error('Error adding sub-place:', error);
      toast.error(error.response?.data?.message || "Failed to add sub-place");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubPlace = async (districtId, subPlaceId) => {
    if (!window.confirm("Are you sure you want to delete this sub-place?")) {
      return;
    }

    try {
      setDeletingId(subPlaceId);
      await deleteVendorPlace(districtId, subPlaceId);
      toast.success("Sub-place deleted successfully!");
      await loadDistricts(); // Refresh data
    } catch (error) {
      console.error('Error deleting sub-place:', error);
      toast.error(error.response?.data?.message || "Failed to delete sub-place");
    } finally {
      setDeletingId(null);
    }
  };

  const getSelectedDistrict = () =>
    districts.find((d) => d._id === selectedDistrictId);

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span>Locations</span>
          <span className="mx-2">/</span>
          <span className="text-blue-500">Sub-place Management</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-medium">Manage Sub-places</h1>
        </div>

        <div className="p-4">
          {/* District Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select District</label>
            <select
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select District --</option>
              {districts.map((district) => (
                <option key={district._id} value={district._id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Add Sub-place Form */}
          <form onSubmit={handleAddSubPlace} className="mb-8">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Sub-place Name</label>
                <input
                  type="text"
                  value={subPlaceName}
                  onChange={(e) => setSubPlaceName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter sub-place name"
                />
              </div>

              {/* Near Places Section */}
              <div>
                <label className="block text-sm font-medium mb-2">Nearby Places</label>
                <div className="flex gap-2 mb-2">
                  <select
                    value={selectedNearPlace}
                    onChange={(e) => setSelectedNearPlace(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={availableSubPlaces.length === 0}
                  >
                    <option value="">-- Select nearby place --</option>
                    {availableSubPlaces
                      .filter(sp => sp.name !== subPlaceName) // Exclude current sub-place name
                      .map((place) => (
                        <option key={place._id} value={place.name}>
                          {place.name}
                        </option>
                      ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddNearPlace}
                    disabled={!selectedNearPlace}
                    className="bg-blue-100 text-blue-600 px-3 py-2 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                  >
                    <Plus size={16} className="mr-1" /> Add
                  </button>
                </div>

                {/* Selected Near Places */}
                {nearPlaces.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <h4 className="text-sm font-medium mb-2">Selected Nearby Places:</h4>
                    <div className="flex flex-wrap gap-2">
                      {nearPlaces.map((place, index) => (
                        <div
                          key={index}
                          className="bg-white px-3 py-1 rounded-full border border-gray-200 flex items-center"
                        >
                          <span>{place}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveNearPlace(place)}
                            className="ml-2 text-gray-400 hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                >
                  {loading ? 'Adding...' : 'Add Sub-place'}
                </button>
              </div>
            </div>
          </form>

          {/* Sub-places List */}
          {selectedDistrictId && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium mb-4">
                Sub-places in {getSelectedDistrict()?.name}
              </h3>

              {getSelectedDistrict()?.subPlaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getSelectedDistrict()?.subPlaces.map((place) => (
                    <div
                      key={place._id}
                      className="bg-gray-50 p-3 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{place.name}</span>
                        <button
                          onClick={() => handleDeleteSubPlace(selectedDistrictId, place._id)}
                          disabled={deletingId === place._id}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete sub-place"
                        >
                          {deletingId === place._id ? (
                            <span className="animate-pulse">Deleting...</span>
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>

                      {/* Display near places */}
                      {place.nearPlaces?.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <h4 className="text-xs font-medium text-gray-500 mb-1">Nearby Places:</h4>
                          <div className="flex flex-wrap gap-1">
                            {place.nearPlaces.map((nearPlace, index) => (
                              <span
                                key={index}
                                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                              >
                                {nearPlace.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No sub-places added yet for this district</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddVendorPlace;