import React from 'react'
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


const properties = [
  {
    id: 1,
    image: house1,
    title: 'Single Family Residency, 4 Cent',
    location: 'Palakkad, Kerala',
    beds: 4,
    baths: 2,
    sqft: 2541,
  },
  {
    id: 2,
    image: house2,
    title: 'Single Family Residency, 6 Cent',
    location: 'Palakkad, Kerala',
    beds: 4,
    baths: 2,
    sqft: 2541,
  },
  {
    id: 3,
    image: house3,
    title: 'Single Family Residency, 4 Cent',
    location: 'Palakkad, Kerala',
    beds: 4,
    baths: 2,
    sqft: 2541,
  },
];


function AgentDetails() {
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
              <img src={profile} alt="Alexander Hipp" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-200 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
            </button>
          </div>

          <h2 className="text-xl font-semibold mt-2">Alexander Hipp</h2>

          <div className="w-full mt-4 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Role :</span>
              <span className="font-medium">Broker</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">State :</span>
              <span className="font-medium">Kerala</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Post code :</span>
              <span className="font-medium">123456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">City :</span>
              <span className="font-medium">Palakkad</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email :</span>
              <span className="font-medium">alexanderhip@info</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phone :</span>
              <span className="font-medium">+91 12345 09876</span>
            </div>
          </div>
        </div>

        {/* Right Details Section */}
        <div className="flex-1">
          {/* Agent Details Card */}
          <div className="bg-white rounded-lg p-6 mb-4">
            <h2 className="text-lg font-semibold mb-4">Agent Details</h2>
            <p className="text-gray-700">
              Alexander Hipp is an experienced property agent specializing in the buying and selling of residential properties. With over 5 years in the field, he has helped more than 120 clients navigate successful and stress-free real estate transactions across Kerala.
            </p>
          </div>

          {/* Property Status Card */}
          <div className="bg-white rounded-lg p-6 mb-4">
            <h2 className="text-lg font-semibold mb-4">Property Status</h2>
            <div className="flex justify-between">
              {/* Total Listing */}
              <div className="w-1/3 px-4 flex flex-col items-center">
                <div className="text-gray-600 mb-2">Total Listing</div>
                <div className="text-2xl font-bold mb-2">120</div>
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
                      strokeDasharray="75, 100"
                    />
                  </svg>
                </div>
              </div>

              {/* Properties Sold */}
              <div className="w-1/3 px-4 flex flex-col items-center">
                <div className="text-gray-600 mb-2">Properties Sold</div>
                <div className="text-2xl font-bold mb-2">68</div>
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
                      strokeDasharray="57, 100"
                    />
                  </svg>
                </div>
              </div>

              {/* Active Properties */}
              <div className="w-1/3 px-4 flex flex-col items-center">
                <div className="text-gray-600 mb-2">Active Properties</div>
                <div className="text-2xl font-bold mb-2">40</div>
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
                      strokeDasharray="33, 100"
                    />
                  </svg>
                </div>
              </div>
            </div>
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
        <a href="#" className="text-sm text-blue-600 hover:underline">
          View More
        </a>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-[#EAF2FF] rounded-lg overflow-hidden shadow-sm w-full max-w-[360px] mx-auto"
          >
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#EAF2FF] text-xs text-gray-600 font-semibold px-2 py-1 rounded">
                Price: {property.price}
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <button className="text-gray-600"><CiHeart size={18} /></button>
                <button className="text-gray-600"><CiShare2 size={18} /></button>
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-sm font-medium text-gray-700">{property.title}</h2>

              <div className="flex items-center text-xs text-gray-500 mt-1">
                <MdLocationOn className="mr-1 text-indigo-500" size={14} />
                {property.location}
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
                  {property.sqft} <span className="text-[10px] text-gray-400">Sqft</span>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button className="px-4 py-1 bg-[#5A85BFB2] text-white text-xs rounded hover:bg-[#3b5e89]">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


    </div>
  )
}

export default AgentDetails
