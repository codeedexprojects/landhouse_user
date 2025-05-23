import React from "react";
import { MdLocationOn } from "react-icons/md";
import { FaHeart, FaShareAlt } from "react-icons/fa";

const PropertyCard = ({
  property,
  onPriceClick,
  onToggleWishlist,
  loadingFavorites,
  isFavorite,
  onShare,
  onViewClick,
  isLoading,
  onLoginRequired,
}) => {
  return (
    <div
      className="border rounded-lg shadow-sm overflow-hidden w-full max-w-[500px] mx-auto relative"
      style={{ backgroundColor: "#E7F1FF" }}
      data-aos="fade-up"
    >
      <div className="relative">
        <img
          src={property.photos[0]?.replace(/\\/g, "/")}
          className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-md"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />
        <div
          className="absolute top-2 left-2 bg-[#EAF2FF] text-xs text-gray-600 font-semibold px-2 py-1 rounded cursor-pointer hover:bg-[#D5E3FF]"
          onClick={onPriceClick}
        >
          {localStorage.getItem("userId") && localStorage.getItem("token")
            ? `Price: ₹${property.property_price?.toLocaleString() || "N/A"}`
            : "Login to view Price"}
        </div>
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={() => {
              const isLoggedIn =
                localStorage.getItem("userId") && localStorage.getItem("token");
              if (!isLoggedIn) {
                onLoginRequired();
                return;
              }
              onToggleWishlist(property._id);
            }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            disabled={loadingFavorites}
          >
            {loadingFavorites ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            ) : (
              <FaHeart
                className={
                  isFavorite ? "text-red-500 fill-current" : "text-gray-500"
                }
                size={14}
              />
            )}
          </button>
          <button
            onClick={() => {
              const isLoggedIn =
                localStorage.getItem("userId") && localStorage.getItem("token");
              if (!isLoggedIn) {
                onLoginRequired();
                return;
              }
              onShare(property._id);
            }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <FaShareAlt className="text-gray-500" size={14} />
          </button>
        </div>
      </div>
      <div className="p-2 space-y-1">
        <h2 className="text-sm font-semibold text-gray-700">
          {property.property_type} -{" "}
          {property.productCode || "No code provided"}
        </h2>
        <div className="text-sm text-gray-500 flex flex-wrap gap-1">
          {property.beds && <span>{property.beds} Beds</span>}
          {property.beds && property.baths && <span>|</span>}
          {property.baths && <span>{property.baths} Baths</span>}
          {(property.beds || property.baths) && property.area && <span>|</span>}
          {property.area && <span>{property.area} sqft</span>}
        </div>
        <p className="text-sm text-gray-400 flex items-center gap-1">
          <MdLocationOn className="text-base text-gray-400" />
          {property.address}
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => onViewClick(property._id)}
            className={`px-3 py-1 bg-[#5A85BFB2] text-white text-sm rounded hover:bg-indigo-700 transition-colors ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "View Details"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
