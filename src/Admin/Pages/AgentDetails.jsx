import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { User } from 'lucide-react';
import profile from '/src/assets/agentprof.jpg'
import house1 from '/src/assets/house1.jpg'
import house2 from '/src/assets/house2.jpg'
import house3 from '/src/assets/house2.jpg'
import { CiHeart } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { MdLocationOn } from 'react-icons/md';
import { FaBed, FaBath } from 'react-icons/fa';
import { GiResize } from 'react-icons/gi';
import { getSingleVendor, vendorPageCounts, vendorProperties } from '../../services/allApi/adminAllApis';



function AgentDetails() {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState(null);
  const [vendorPropertiesList, setVendorPropertiesList] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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



  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        setLoading(true);
        // Fetch vendor details
        const vendorData = await getSingleVendor(vendorId);
        setVendor(vendorData);
        
        // Fetch property counts
        const countsData = await vendorPageCounts(vendorId);
        setCounts(countsData);
        
        // Fetch initial vendor properties
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
      <div className="flex bg-blue-100 p-4 font-sans">
        {/* Left Profile Section */}
        <div className="w-1/4 bg-white rounded-lg p-4 flex flex-col items-center relative mr-4">
          <div className="absolute top-4 right-4 text-gray-400">
            <button className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>

          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-2">
              <img src={profile} alt={vendor.name} className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-200 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
            </button>
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
              <h2 className="text-lg font-semibold">Referrals</h2>
              <span className="text-gray-600">(25)</span>
            </div>

            <div className="grid grid-cols-3 font-medium text-gray-500 mb-2">
              <div>User</div>
              <div>Date</div>
              <div>Referral code</div>
            </div>

            <div className="border-b border-gray-200 py-3">
              <div className="grid grid-cols-3 items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 overflow-hidden">
                    <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <span>Iqbal muhammed</span>
                </div>
                <div>12 Jun 2025</div>
                <div>LAND123</div>
              </div>
            </div>

            <div className="text-center mt-3">
              <button className="text-blue-500">See more</button>
            </div>
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
                    <span className={`text-xs px-2 py-1 rounded ${
                      property.soldOut 
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