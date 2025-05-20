import React from 'react';
import PropertyCard from './Section2';

const PropertySection = ({
  title,
  description,
  properties,
  onPriceClick,
  onToggleWishlist,
  loadingFavorites,
  wishlist,
  onShare,
  onViewClick,
  isLoading,
  onLoginRequired,
  onShowMore
}) => {
  return (
    <div className="mb-12">
      <div className="mb-6 ms-5">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      {onShowMore && (
        <div className="flex justify-center mt-8">
          <button 
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-sm text-white" 
            onClick={onShowMore}
          >
            SHOW MORE
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertySection;