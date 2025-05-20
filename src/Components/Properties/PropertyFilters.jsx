import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const PropertyFilters = ({
  searchTerm,
  onSearchChange,
  placeFilter,
  places,
  onPlaceFilterChange,
  subPlaceFilter,
  availableSubPlaces,
  onSubPlaceFilterChange,
  nearbyPlaceFilter,
  availableNearbyPlaces,
  onNearbyPlaceFilterChange,
  propertyTypeFilter,
  onPropertyTypeFilterChange,
  bedsFilter,
  onBedsFilterChange,
  bathsFilter,
  onBathsFilterChange,
  minPrice,
  maxPrice,
  onShowPriceModal,
  onClearAllFilters,
  showMobileFilters,
  onToggleMobileFilters,
  activeFiltersCount
}) => {
  return (
    <>
      {/* Mobile filter toggle button */}
      <div className="block md:hidden mb-4">
        <button
          onClick={onToggleMobileFilters}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 border rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <FaFilter />
          {showMobileFilters ? "Hide Filters" : `Show Filters${activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ''}`}
        </button>
      </div>

      {/* Filters section (responsive) */}
      <div className={`${showMobileFilters ? "block" : "hidden"} md:block mb-8`}>
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Search City, Pincode, Address, Property Type, Product Code"
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full px-4 py-3 pl-10 border rounded-md"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Place filter */}
          <div className="w-full">
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={placeFilter}
              onChange={onPlaceFilterChange}
            >
              <option value="">Select Location</option>
              {places.map((place) => (
                <option key={place._id} value={place._id}>
                  {place.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-place filter */}
          <div className="w-full">
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={subPlaceFilter}
              onChange={onSubPlaceFilterChange}
              disabled={!placeFilter || availableSubPlaces.length === 0}
            >
              <option value="">Select Area</option>
              {availableSubPlaces.map((subPlace) => (
                <option key={subPlace._id} value={subPlace._id}>
                  {subPlace.name}
                </option>
              ))}
            </select>
          </div>

          {/* Nearby Places filter */}
          <div className="w-full">
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={nearbyPlaceFilter}
              onChange={onNearbyPlaceFilterChange}
              disabled={!subPlaceFilter || availableNearbyPlaces.length === 0}
            >
              <option value="">Select Nearby Area</option>
              {availableNearbyPlaces.map((nearPlace) => (
                <option key={nearPlace._id} value={nearPlace._id}>
                  {nearPlace.name}
                </option>
              ))}
            </select>
          </div>

          {/* Property type filter */}
          <div className="w-full">
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={propertyTypeFilter}
              onChange={onPropertyTypeFilterChange}
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

          {/* Price filter input */}
          <button
            onClick={onShowPriceModal}
            className="px-4 py-2 border bg-white-100 text-black-700 rounded-md"
          >
            Open Price Filter
          </button>

          {/* Beds filter */}
          <div className="w-full">
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={bedsFilter}
              onChange={onBedsFilterChange}
            >
              <option value="">All Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
          </div>

          {/* Baths filter */}
          <div className="w-full">
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={bathsFilter}
              onChange={onBathsFilterChange}
            >
              <option value="">All Bathrooms</option>
              <option value="1">1 Bathroom</option>
              <option value="2">2 Bathrooms</option>
              <option value="3">3 Bathrooms</option>
              <option value="4">4+ Bathrooms</option>
            </select>
          </div>
        </div>

        {/* Clear filters button */}
        {activeFiltersCount > 0 && (
          <div className="flex justify-center md:justify-start mt-4">
            <button
              onClick={onClearAllFilters}
              className="px-4 py-2 border bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyFilters;