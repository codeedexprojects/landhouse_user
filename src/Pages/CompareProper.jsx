import React, { useEffect, useState } from "react";
import { FiHeart, FiPlusCircle, FiX, FiTrash2 } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { getComparisons, deleteCompare, addToFavorites, getFavorites, deleteFavourite } from "../services/allApi/userAllApi";
import { Toast } from "../Components/Toast";

const CompareListings = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [wishlist, setWishlist] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const BASE_URL = "https://landouse-backend.onrender.com";

  useEffect(() => {
    const fetchComparisons = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/login');
          return;
        }

        const data = await getComparisons(userId);
        setProperties(data.properties || []);
      } catch (error) {
        setToast({ show: true, message: 'Failed to fetch comparisons', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchComparisons();
    fetchUserFavorites();
  }, [navigate]);

  const fetchUserFavorites = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        setLoadingFavorites(true);
        const response = await getFavorites(userId);

        // Extract property IDs from the nested structure
        const favoriteIds = response.favourites.map(fav => fav.propertyId._id);

        setWishlist(favoriteIds);
        setLoadingFavorites(false);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setLoadingFavorites(false);
    }
  };

  const toggleWishlist = async (propertyId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setToast({ show: true, message: 'Please login to add favorites', type: 'error' });
        return;
      }

      const isFavorite = wishlist.includes(propertyId);

      if (isFavorite) {
        // Remove from favorites
        await deleteFavourite(propertyId, { userId });
      } else {
        // Add to favorites
        await addToFavorites(userId, propertyId);
      }

      // Update local state
      setWishlist((prev) => {
        return isFavorite
          ? prev.filter(id => id !== propertyId)
          : [...prev, propertyId];
      });

      setToast({
        show: true,
        message: isFavorite ? 'Removed from favorites' : 'Added to favorites',
        type: 'success'
      });
    } catch (error) {
      console.error('Favorite error:', error);
      setToast({
        show: true,
        message: error.response?.data?.message || 'Failed to update favorites',
        type: 'error'
      });
    }
  };

  const handleCompareClick = () => {
    if (properties.length < 2) {
      setToast({ show: true, message: 'Please add at least 2 properties to compare', type: 'error' });
      return;
    }
    navigate('/compare-result');
  };

  const handleAddProperty = () => {
    navigate('/properties');
  };

  const handleDelete = async (propertyId) => {
    try {
      const userId = localStorage.getItem('userId');
      await deleteCompare(propertyId, { userId });
      setProperties(properties.filter(prop => prop._id !== propertyId));
      setToast({ show: true, message: 'Property removed from comparison', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Failed to remove property', type: 'error' });
    } finally {
      setShowDeleteConfirm(null);
    }
  };

  const closeToast = () => {
    setToast({ ...toast, show: false });
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
        <div className="w-full max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#131A5A]">
            Compare Listings
          </h2>

          {/* Property List */}
          {properties.map((property) => (
            <div key={property._id} className="border border-blue-300 rounded-lg p-4 flex items-center gap-4 mb-6 relative">
              {showDeleteConfirm === property._id ? (
                <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center gap-4 rounded-lg">
                  <p className="text-gray-700">Remove this property?</p>
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                  >
                    No
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowDeleteConfirm(property._id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    title="Remove from comparison"
                  >
                    <FiTrash2 />
                  </button>
                  <div className="w-32 h-24 rounded-md overflow-hidden">
                    <img
                      src={property.photos[0] ? property.photos[0].replace(/\\/g, "/") : '/placeholder-property.jpg'}
                      alt={property.property_type}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-property.jpg';
                      }}
                    />

                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-[#131A5A]">
                      {property.property_type}, {property.cent} Cent
                    </h3>
                    <p className="text-gray-600">{property.address}</p>
                    <p className="text-gray-600">{property.property_type}</p>
                    <p className="font-semibold text-[#131A5A] mt-1">
                      ₹ {property.property_price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const isLoggedIn = localStorage.getItem('userId') && localStorage.getItem('token');
                      if (!isLoggedIn) {
                        setToast({ show: true, message: 'Please login to add favorites', type: 'error' });
                        return;
                      }
                      toggleWishlist(property._id);
                    }}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    disabled={loadingFavorites}
                  >
                    {loadingFavorites ? (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    ) : (
                      <FaHeart
                        className={
                          wishlist.includes(property._id)
                            ? "text-red-500 fill-current"
                            : "text-gray-500"
                        }
                        size={14}
                      />
                    )}
                  </button>
                </>
              )}
            </div>
          ))}

          {/* Empty slot for adding more properties */}
          {properties.length < 2 && (
            <div className="border border-blue-300 rounded-lg p-4 flex items-center justify-between">
              <p className="text-gray-500">Add another property to compare</p>
              <button
                onClick={handleAddProperty}
                className="flex items-center gap-2 text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
              >
                <FiPlusCircle />
                <span>Add</span>
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handleCompareClick}
              className="bg-[#131A5A] text-white px-6 py-2 rounded hover:bg-[#0f154a] transition disabled:opacity-50"
              disabled={properties.length < 2}
            >
              Compare
            </button>
            <button
              onClick={() => navigate('/')}
              className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompareListings;