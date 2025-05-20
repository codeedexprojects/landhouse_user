import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = ({
  properties,
  onPriceClick,
  onToggleWishlist,
  loadingFavorites,
  wishlist,
  onShare,
  onViewClick,
  isLoading,
  onLoginRequired
}) => {
  return (
    <>
      {/* Property count */}
      {properties.length > 0 && (
        <p className="mb-4 text-sm text-gray-600">
          Showing {properties.length} {properties.length === 1 ? "property" : "properties"}
        </p>
      )}

      {/* No results message */}
      {properties.length === 0 && (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">
            No properties found matching your search criteria.
          </p>
        </div>
      )}

      {/* Property listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            onPriceClick={onPriceClick}
            onToggleWishlist={onToggleWishlist}
            loadingFavorites={loadingFavorites}
            isFavorite={wishlist.includes(property._id)}
            onShare={onShare}
            onViewClick={onViewClick}
            isLoading={isLoading}
            onLoginRequired={onLoginRequired}
          />
        ))}
      </div>
    </>
  );
};

export default PropertyList;