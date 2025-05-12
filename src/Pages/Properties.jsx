import React, { useEffect, useState } from 'react';
import { MdLocationOn } from "react-icons/md";
import { FaFacebook, FaHeart, FaShareAlt, FaTimes, FaTwitter, FaWhatsapp, FaSearch } from "react-icons/fa";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getProperties, addToFavorites, getFavorites, deleteFavourite } from '../services/allApi/userAllApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginRequiredModal from '../Components/LoginRequired';
import { Toast } from '../Components/Toast';

const Properties = () => {
  const [wishlist, setWishlist] = useState([]);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRangeFilter, setPriceRangeFilter] = useState('');
  const [bedsFilter, setBedsFilter] = useState('');
  const [bathsFilter, setBathsFilter] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setToastMessage('Link copied to clipboard!');
  };

  const handlePriceClick = () => {
    const isLoggedIn = localStorage.getItem('userId') && localStorage.getItem('token');
    if (!isLoggedIn) {
      setShowLoginModal(true);
    }
  };

  const closeModal = () => setShowLoginModal(false);

  const goToLogin = () => {
    closeModal();
    navigate('/login');
  };
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchPropertyData();
    fetchUserFavorites();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchTerm, priceRangeFilter, bedsFilter, bathsFilter]);

  const fetchPropertyData = async () => {
    const data = await getProperties();
    setProperties(data);
    setFilteredProperties(data);
  };

  const fetchUserFavorites = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        setLoadingFavorites(true);
        const response = await getFavorites(userId);
        const favoriteIds = response.favourites.map(fav => fav.propertyId._id);
        setWishlist(favoriteIds);
        setLoadingFavorites(false);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setLoadingFavorites(false);
    }
  };

  const filterProperties = () => {
    let filtered = [...properties];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(property => 
        property.address?.toLowerCase().includes(term) || 
        property.property_type?.toLowerCase().includes(term) ||
        property.city?.toLowerCase().includes(term) ||
        property.pincode?.toString().includes(term)
      );
    }
    
    // Apply price range filter
    if (priceRangeFilter) {
      switch (priceRangeFilter) {
        case 'under50':
          filtered = filtered.filter(property => (property.property_price || 0) < 50000000);
          break;
        case '50to100':
          filtered = filtered.filter(property => 
            (property.property_price || 0) >= 50000000 && 
            (property.property_price || 0) < 100000000
          );
          break;
        case '100to200':
          filtered = filtered.filter(property => 
            (property.property_price || 0) >= 100000000 && 
            (property.property_price || 0) < 200000000
          );
          break;
        case '200to500':
          filtered = filtered.filter(property => 
            (property.property_price || 0) >= 200000000 && 
            (property.property_price || 0) < 500000000
          );
          break;
        case 'over500':
          filtered = filtered.filter(property => (property.property_price || 0) >= 500000000);
          break;
        default:
          break;
      }
    }
    
    // Apply beds filter
    if (bedsFilter) {
      const bedsCount = parseInt(bedsFilter);
      filtered = filtered.filter(property => property.beds === bedsCount);
    }
    
    // Apply baths filter
    if (bathsFilter) {
      const bathsCount = parseInt(bathsFilter);
      filtered = filtered.filter(property => property.baths === bathsCount);
    }
    
    setFilteredProperties(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceRangeFilterChange = (e) => {
    setPriceRangeFilter(e.target.value);
  };

  const handleBedsFilterChange = (e) => {
    setBedsFilter(e.target.value);
  };

  const handleBathsFilterChange = (e) => {
    setBathsFilter(e.target.value);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setPriceRangeFilter('');
    setBedsFilter('');
    setBathsFilter('');
  };

  const handleViewClick = async (propertyId) => {
    const isLoggedIn = localStorage.getItem('userId') && localStorage.getItem('token');

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    setIsLoading(true);
    try {
      navigate(`/single/${propertyId}`);
      window.scrollTo(0, 0);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWishlist = async (propertyId) => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        showToast('Please login to add favorites', 'error');
        return;
      }

      const isFavorite = wishlist.includes(propertyId);

      if (isFavorite) {
        // REMOVE from wishlist
        await deleteFavourite(propertyId, { userId });
        setWishlist((prev) => prev.filter((id) => id !== propertyId));
        showToast('Removed from favorites', 'success');
      } else {
        // ADD to wishlist
        await addToFavorites(userId, propertyId);
        setWishlist((prev) => [...prev, propertyId]);
        showToast('Added to favorites', 'success');
      }
    } catch (error) {
      console.error('Favorite error:', error);
      showToast(error.response?.data?.message || 'Failed to update favorites', 'error');
    }
  };

  const generateReferralLink = (userId, referralCode, propertyId) => {
    return `${window.location.origin}/register?referrerId=${userId}&referralCode=${referralCode}&productId=${propertyId}`;
  };

  const handleShare = (propertyId) => {
    const userId = localStorage.getItem('userId');
    const referralCode = localStorage.getItem('referralId');

    if (!userId || !referralCode) {
      toast.error('Please login to share properties');
      return;
    }

    const link = generateReferralLink(userId, referralCode, propertyId);
    setReferralLink(link);
    setShowShareModal(true);
  };
  return (
    <div>
      <Header />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="px-4 py-8 md:px-12 lg:px-24 bg-white overflow-x-hidden">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight" style={{color:"#03004D"}}>
          Login to unlock <br />
          <span className="text-600">property prices !</span>
        </h1>

        {/* Full-width search with icon */}
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Search City, Pincode, Address , Property Type"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 pl-10 border rounded-md"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
        </div>

        {/* Filters section */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Price range filter */}
          <div className="w-full sm:w-auto">
            <select 
              className="w-full px-3 py-2 border rounded-md"
              value={priceRangeFilter}
              onChange={handlePriceRangeFilterChange}
            >
              <option value="">Price Range</option>
              <option value="under50">Under ₹50L</option>
              <option value="50to100">₹50L - ₹1Cr</option>
              <option value="100to200">₹1Cr - ₹2Cr</option>
              <option value="200to500">₹2Cr - ₹5Cr</option>
              <option value="over500">Over ₹5Cr</option>
            </select>
          </div>

          {/* Beds filter */}
          <div className="w-full sm:w-auto">
            <select 
              className="w-full px-3 py-2 border rounded-md"
              value={bedsFilter}
              onChange={handleBedsFilterChange}
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
          <div className="w-full sm:w-auto">
            <select 
              className="w-full px-3 py-2 border rounded-md"
              value={bathsFilter}
              onChange={handleBathsFilterChange}
            >
              <option value="">All Bathrooms</option>
              <option value="1">1 Bathroom</option>
              <option value="2">2 Bathrooms</option>
              <option value="3">3 Bathrooms</option>
              <option value="4">4+ Bathrooms</option>
            </select>
          </div>

          {/* Clear filters button */}
          {(searchTerm || priceRangeFilter || bedsFilter || bathsFilter) && (
            <button 
              onClick={clearAllFilters}
              className="px-3 py-2 border bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Property count */}
        {filteredProperties.length > 0 && (
          <p className="mb-4 text-sm text-gray-600">
            Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
            {(searchTerm || bedsFilter || bathsFilter || priceRangeFilter) && (
              <span>
                {searchTerm && ` for "${searchTerm}"`}
                {priceRangeFilter && ` in ${priceRangeFilter === 'under50' ? 'Under ₹50L' : 
                  priceRangeFilter === '50to100' ? '₹50L - ₹1Cr' : 
                  priceRangeFilter === '100to200' ? '₹1Cr - ₹2Cr' : 
                  priceRangeFilter === '200to500' ? '₹2Cr - ₹5Cr' : 'Over ₹5Cr'}`}
                {bedsFilter && ` with ${bedsFilter} ${parseInt(bedsFilter) === 1 ? 'bedroom' : 'bedrooms'}`}
                {bathsFilter && ` with ${bathsFilter} ${parseInt(bathsFilter) === 1 ? 'bathroom' : 'bathrooms'}`}
              </span>
            )}
          </p>
        )}

        {/* No results message */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">No properties found matching your search criteria.</p>
            <button 
              onClick={clearAllFilters}
              className="mt-2 text-blue-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Rest of your property listing code remains the same */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg shadow-sm overflow-hidden w-full max-w-[360px] mx-auto relative"
              style={{ backgroundColor: "#E7F1FF" }}
              data-aos="fade-up"
            >
              {/* Property Image */}
              <div className="relative">
                <img
                  src={`https://landouse-backend.onrender.com/${property.photos[0]?.replace(/\\/g, "/")}`}
                  alt={property.property_type}
                  className="w-full h-36 object-cover"
                />
                <div
                  className="absolute top-2 left-2 bg-[#EAF2FF] text-xs text-gray-600 font-semibold px-2 py-1 rounded cursor-pointer hover:bg-[#D5E3FF]"
                  onClick={handlePriceClick}
                >
                  {localStorage.getItem('userId') && localStorage.getItem('token') ? (
                    `Price: ₹${property.property_price?.toLocaleString() || 'N/A'}`
                  ) : (
                    'Login to view Price'
                  )}
                </div>
                <div className="absolute top-2 right-2 flex space-x-2">
                  {/* Favorite Button */}
                  <button
                    onClick={() => {
                      const isLoggedIn = localStorage.getItem('userId') && localStorage.getItem('token');
                      if (!isLoggedIn) {
                        setShowLoginModal(true);
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
                            ? 'text-red-500 fill-current'
                            : 'text-gray-500'
                        }
                        size={14}
                      />
                    )}
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => {
                      const isLoggedIn = localStorage.getItem('userId') && localStorage.getItem('token');
                      if (!isLoggedIn) {
                        setShowLoginModal(true);
                        return;
                      }
                      handleShare(property._id);
                    }}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <FaShareAlt className="text-gray-500" size={14} />
                  </button>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-3 space-y-2">
                <h2 className="text-sm font-semibold text-gray-700">{property.property_type} - {property.maxrooms} Rooms</h2>
                <div className="text-sm text-gray-500 flex flex-wrap gap-1">
                  <span>{property.beds} Beds</span> |
                  <span>{property.baths} Baths</span> |
                  <span>{property.area} sqft</span>
                </div>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <MdLocationOn className="text-base text-gray-400" />
                  {property.address}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleViewClick(property._id)}
                    className={`px-3 py-1 bg-[#5A85BFB2] text-white text-sm rounded hover:bg-indigo-700 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      'View Details'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ... (rest of your modal and footer code remains the same) */}
      {showShareModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl max-w-md w-full relative shadow-xl animate-fade-in">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>

            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">Share Property</h3>
              <p className="text-gray-600 mb-4">
                Share this property with friends and family
              </p>
            </div>

            <div className="relative mb-6">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                onClick={(e) => e.target.select()}
              />
              <button
                onClick={handleCopy}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded hover:bg-blue-200 transition-colors"
              >
                Copy
              </button>
            </div>

            <div className="flex justify-center space-x-4 mb-6">
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <FaFacebook className="text-blue-600" />
              </button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <FaTwitter className="text-blue-400" />
              </button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <FaWhatsapp className="text-green-500" />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}
      <LoginRequiredModal
        show={showLoginModal}
        onClose={closeModal}
        onLogin={goToLogin}
      />

      <Footer />
    </div>
  );
};

export default Properties;