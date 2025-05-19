import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import profile from '/src/assets/agentprof.jpg'
import house1 from '/src/assets/house1.jpg'
import { CiHeart } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { MdLocationOn, MdEdit } from 'react-icons/md';
import { FaBed, FaBath } from 'react-icons/fa';
import { GiResize } from 'react-icons/gi';
import { getSingleVendor, vendorPageCounts, vendorProperties, deleteVendor, updateVendor, getEnquireisVendor } from '../../services/allApi/adminAllApis';
import { toast } from 'react-toastify';

function AgentDetails() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState(null);
  const [vendorPropertiesList, setVendorPropertiesList] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    state: '',
    city: '',
    postCode: '',
    aboutVendor: '',
    role: ''
  });
  const [enquiries, setEnquiries] = useState([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(true);
  const BASE_URL = 'https://landouse-backend.onrender.com/';

  // Add this useEffect to fetch enquiries when the component mounts
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        setEnquiriesLoading(true);
        const response = await getEnquireisVendor(vendorId);
        if (response && response.success) {
          setEnquiries(response.enquiries || []);
        }
        setEnquiriesLoading(false);
      } catch (err) {
        console.error('Error fetching enquiries:', err);
        setEnquiriesLoading(false);
      }
    };

    fetchEnquiries();
  }, [vendorId]);

  const fetchVendorProperties = async (pageNum = 1) => {
    try {
      setPropertiesLoading(true);
      const propertiesData = await vendorProperties(vendorId, pageNum);

      if (pageNum === 1) {
        setVendorPropertiesList(propertiesData.data || []);
      } else {
        setVendorPropertiesList(prev => [...prev, ...(propertiesData.data || [])]);
      }

      setTotalPages(propertiesData.pages || 1);
      setHasMore(pageNum < (propertiesData.pages || 1));
      setPropertiesLoading(false);
    } catch (err) {
      setError(err.message);
      setPropertiesLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchVendorProperties(nextPage);
  };

  const handleDeleteVendor = async () => {
    try {
      setDeleting(true);
      const response = await deleteVendor(vendorId);
      if (response && response.status === 200) {
        toast.success('Vendor deleted successfully');
        navigate('/admin/view-agent');
      } else {
        toast.error('Failed to delete vendor');
      }
    } catch (err) {
      toast.error('Error deleting vendor');
      console.error(err);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleEditVendor = async () => {
    try {
      setEditing(true);

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('number', formData.number);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('postCode', formData.postCode);
      formDataToSend.append('aboutVendor', formData.aboutVendor);
      formDataToSend.append('role', formData.role);

      if (profileImage) {
        formDataToSend.append('profileImage', profileImage);
      }

      const response = await updateVendor(vendorId, formDataToSend);

      if (response) {
        toast.success('Vendor updated successfully');
        const updatedVendor = await getSingleVendor(vendorId);
        setVendor(updatedVendor);
        // Update the vendor state with the new data
        setShowEditModal(false);
      } else {
        toast.error('Failed to update vendor');
      }
    } catch (err) {
      toast.error('Error updating vendor');
      console.error(err);
    } finally {
      setEditing(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        setLoading(true);
        const vendorData = await getSingleVendor(vendorId);
        setVendor(vendorData);

        // Initialize form data with vendor details
        setFormData({
          name: vendorData.name || '',
          email: vendorData.email || '',
          number: vendorData.number || '',
          state: vendorData.state || '',
          city: vendorData.city || '',
          postCode: vendorData.postCode || '',
          aboutVendor: vendorData.aboutVendor || '',
          role: vendorData.role || ''
        });

        // Set preview image if vendor has profileImage
        if (vendorData.profileImage) {
          setPreviewImage(vendorData.profileImage);
        }

        const countsData = await vendorPageCounts(vendorId);
        setCounts(countsData);
        await fetchVendorProperties(1);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVendorDetails();
  }, [vendorId]);

  const calculatePercentage = (value, total) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!vendor) {
    return <div className="p-4">Vendor not found</div>;
  }

  return (
    <div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this vendor? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteVendor}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Vendor Modal */}
      {showEditModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Vendor Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Profile Image */}
              <div>
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={previewImage || profile}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-200 shadow-sm cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera">
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                        <circle cx="12" cy="13" r="3"></circle>
                      </svg>
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">Click on the camera icon to change profile image</p>
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Post Code</label>
                  <input
                    type="text"
                    name="postCode"
                    value={formData.postCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About Vendor</label>
                  <textarea
                    name="aboutVendor"
                    value={formData.aboutVendor}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={editing}
              >
                Cancel
              </button>
              <button
                onClick={handleEditVendor}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                disabled={editing}
              >
                {editing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex bg-blue-100 p-4 font-sans">
        {/* Left Profile Section */}
        <div className="w-1/4 bg-white rounded-lg p-4 flex flex-col items-center relative mr-4">
          <div className="absolute top-4 left-4 flex gap-2 text-gray-400">
            <button
              className="p-1 hover:text-blue-500"
              onClick={() => setShowEditModal(true)}
            >
              <MdEdit size={20} />
            </button>
          </div>
          <div className="absolute top-4 right-4 text-gray-400">
            <button
              className="p-1 hover:text-red-500"
              onClick={() => setShowDeleteModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>

          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-2">
            <img
              src={vendor.profileImage ? vendor.profileImage.replace(/\\/g, '/') : profile}
              alt={vendor.name}
              className="w-full h-full object-cover"
            />

          </div>

          <h2 className="text-xl font-semibold mt-2">{vendor.name}</h2>

          <div className="w-full mt-4 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Role :</span>
              <span className="font-medium">{vendor.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">State :</span>
              <span className="font-medium">{vendor.state}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Post code :</span>
              <span className="font-medium">{vendor.postCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">City :</span>
              <span className="font-medium">{vendor.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email :</span>
              <span className="font-medium">{vendor.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phone :</span>
              <span className="font-medium">{vendor.number}</span>
            </div>
          </div>
        </div>


        {/* Right Details Section */}
        <div className="flex-1">
          {/* Agent Details Card */}
          <div className="bg-white rounded-lg p-6 mb-4">
            <h2 className="text-lg font-semibold mb-4">Agent Details</h2>
            <p className="text-gray-700">
              {vendor.aboutVendor || 'No description provided'}
            </p>
          </div>

          {/* Property Status Card */}
          <div className="bg-white rounded-lg p-6 mb-4">
            <h2 className="text-lg font-semibold mb-4">Property Status</h2>
            {counts ? (
              <div className="flex justify-between">
                {/* Total Listing */}
                <div className="w-1/3 px-4 flex flex-col items-center">
                  <div className="text-gray-600 mb-2">Total Listing</div>
                  <div className="text-2xl font-bold mb-2">{counts.totalProperties}</div>
                  <div className="w-16 h-16 relative">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E6E6E6"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#4285F4"
                        strokeWidth="3"
                        strokeDasharray={`${calculatePercentage(counts.totalProperties, counts.totalProperties)}, 100`}
                      />
                    </svg>
                  </div>
                </div>

                {/* Properties Sold */}
                <div className="w-1/3 px-4 flex flex-col items-center">
                  <div className="text-gray-600 mb-2">Properties Sold</div>
                  <div className="text-2xl font-bold mb-2">{counts.soldProperties}</div>
                  <div className="w-16 h-16 relative">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E6E6E6"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#EA4335"
                        strokeWidth="3"
                        strokeDasharray={`${calculatePercentage(counts.soldProperties, counts.totalProperties)}, 100`}
                      />
                    </svg>
                  </div>
                </div>

                {/* Active Properties */}
                <div className="w-1/3 px-4 flex flex-col items-center">
                  <div className="text-gray-600 mb-2">Active Properties</div>
                  <div className="text-2xl font-bold mb-2">{counts.activeProperties}</div>
                  <div className="w-16 h-16 relative">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E6E6E6"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#8E24AA"
                        strokeWidth="3"
                        strokeDasharray={`${calculatePercentage(counts.activeProperties, counts.totalProperties)}, 100`}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">Loading property stats...</div>
            )}
          </div>

          {/* Referrals Card */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Latest Property Enquiries</h2>
              <span className="text-gray-600">({enquiries.length})</span>
            </div>

            {enquiriesLoading ? (
              <div className="text-center py-4">Loading enquiries...</div>
            ) : enquiries.length === 0 ? (
              <div className="text-center py-4">No enquiries found</div>
            ) : (
              <>
                <div className="grid grid-cols-12 font-medium text-gray-500 mb-2 text-sm">
                  <div className="col-span-3">Property</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Enquirer</div>
                  <div className="col-span-2">Contact</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1">Actions</div>
                </div>

                {enquiries.slice(0, 3).map((enquiry) => (
                  <div key={enquiry._id} className="border-b border-gray-200 py-3">
                    <div className="grid grid-cols-12 items-center text-sm">
                      <div className="col-span-3 font-medium">
                        {enquiry.propertyId?.property_type || 'N/A'}
                      </div>
                      <div className="col-span-2">
                        ₹{enquiry.propertyId?.property_price?.toLocaleString() || 'N/A'}
                      </div>
                      <div className="col-span-2">
                        {enquiry.name || enquiry.userId?.email || 'N/A'}
                      </div>
                      <div className="col-span-2">
                        <div>{enquiry.phoneNumber || 'N/A'}</div>
                        <div className="text-xs text-gray-500 truncate">{enquiry.email}</div>
                      </div>
                      <div className="col-span-2">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </div>
                      <div className="col-span-1">
                        <button className="text-blue-500 hover:text-blue-700">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {enquiries.length > 3 && (
                  <div className="text-center mt-3">
                    <button className="text-blue-500 hover:underline">See all enquiries</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="m-6">
        {/* Top Heading Row */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Active Listings</h2>
          {hasMore && (
            <button
              onClick={handleLoadMore}
              className="text-sm text-blue-600 hover:underline"
              disabled={propertiesLoading}
            >
              {propertiesLoading ? 'Loading...' : 'View More'}
            </button>
          )}
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendorPropertiesList.map((property) => (
            <div
              key={property._id}
              className="bg-[#EAF2FF] rounded-lg overflow-hidden shadow-sm w-full max-w-[360px] mx-auto"
            >
              <div className="relative">
                <img
                  src={property.photos && property.photos.length > 0 ? property.photos[0] : house1}
                  alt={property.property_type}
                  className="w-full h-40 object-cover"
                />

                <div className="absolute top-2 left-2 bg-[#EAF2FF] text-xs text-gray-600 font-semibold px-2 py-1 rounded">
                  Price: ₹{property.property_price.toLocaleString()}
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button className="text-gray-600"><CiHeart size={18} /></button>
                  <button className="text-gray-600"><CiShare2 size={18} /></button>
                </div>
              </div>

              <div className="p-4">
                <h2 className="text-sm font-medium text-gray-700">
                  {property.property_type}, {property.cent} Cent
                </h2>

                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MdLocationOn className="mr-1 text-indigo-500" size={14} />
                  {property.address}, {property.zipcode}
                </div>

                <div className="flex justify-between text-[11px] text-gray-500 mt-3">
                  <div className="flex items-center gap-1">
                    <FaBed className="text-gray-700" size={12} />
                    {property.beds} <span className="text-[10px] text-gray-400">Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBath className="text-gray-700" size={12} />
                    {property.baths} <span className="text-[10px] text-gray-400">Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GiResize className="text-gray-700" size={12} />
                    {property.area} <span className="text-[10px] text-gray-400">Sqft</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className={`text-xs px-2 py-1 rounded ${property.soldOut
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                    }`}>
                    {property.soldOut ? 'Sold' : 'Available'}
                  </span>
                  <Link
                    to="/admin/property-details"
                    state={{ property }}
                    className="px-4 py-1 bg-[#5A85BFB2] text-white text-xs rounded hover:bg-[#3b5e89]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {propertiesLoading && page > 1 && (
          <div className="text-center py-4">Loading more properties...</div>
        )}

        {vendorPropertiesList.length === 0 && !propertiesLoading && (
          <div className="text-center py-8">No properties found for this vendor</div>
        )}
      </div>
    </div>
  )
}

export default AgentDetails