import React from 'react';
import { MdLocationOn } from "react-icons/md";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const properties = []; // For demo purpose, leave it empty to show the fallback

function Collections() {
  const navigate = useNavigate();

  const handleBrowseClick = () => {
    navigate('/properties');
  };

  return (
    <div>
      <div className="text-center mt-10 mb-10">
        <h1 className="text-gray-900 text-3xl font-semibold">Your Collections</h1>
      </div>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="border rounded-lg shadow-sm overflow-hidden w-full max-w-[360px] mx-auto"
              style={{ border: "1px solid white", borderRadius: "2px", backgroundColor: "#E7F1FF" }}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-[#EAF2FF] text-xs text-gray-600 font-semibold px-2 py-1 rounded">
                  Price: $250,000
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button className="text-gray-600"><CiHeart /></button>
                  <button className="text-gray-600"><CiShare2 /></button>
                </div>
              </div>

              {/* Details */}
              <div className="p-3 space-y-2">
                <h2 className="text-xs font-semibold text-gray-700">{property.title}</h2>
                <div className="text-xs text-gray-500 flex flex-wrap gap-1">
                  <span>{property.beds} Beds</span> | 
                  <span>{property.baths} Baths</span> | 
                  <span>{property.sqft} sqft</span>
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <MdLocationOn className="text-base text-gray-400" />
                  {property.location}
                </p>
                <div className="flex justify-end">
                  <button className="px-3 py-1 bg-[#5A85BFB2] text-white text-xs rounded hover:bg-indigo-700">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10 mb-20 px-4 text-center">
          <img
            src="https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif"
            alt="Empty collection"
            className="w-72 h-72 mb-6"
          />
          <p className="text-gray-600 mb-4 text-lg font-medium">You haven't added any favourites yet.</p>
          <button
            onClick={handleBrowseClick}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Browse Listings
          </button>
        </div>
      )}
    </div>
  );
}

export default Collections;
