import React, { useEffect, useState } from 'react';
import { MdLocationOn } from "react-icons/md";
import { FaFacebook, FaHeart, FaShareAlt, FaTimes, FaTwitter, FaWhatsapp, FaSearch, FaFilter } from "react-icons/fa";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getProperties, addToFavorites, getFavorites, deleteFavourite, fetchDistricts } from '../services/allApi/userAllApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginRequiredModal from '../Components/LoginRequired';
import { Toast } from '../Components/Toast';
import { fetchVendorDistricts } from '../services/allApi/vendorAllAPi';

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
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('');
  const [places, setPlaces] = useState([]);
  const [placeFilter, setPlaceFilter] = useState('');
  const [subPlaceFilter, setSubPlaceFilter] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [availableSubPlaces, setAvailableSubPlaces] = useState([]);

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
    fetchPlaces();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchTerm, priceRangeFilter, bedsFilter, bathsFilter, propertyTypeFilter, placeFilter, subPlaceFilter]);

  useEffect(() => {
    if (placeFilter) {
      const selectedPlace = places.find(place => place._id === placeFilter);
      if (selectedPlace) {
        setAvailableSubPlaces(selectedPlace.subPlaces || []);
      } else {
        setAvailableSubPlaces([]);
      }
      setSubPlaceFilter('');
    } else {
      setAvailableSubPlaces([]);
      setSubPlaceFilter('');
    }
  }, [placeFilter, places]);

  const fetchPlaces = async () => {
    try {
      const placesData = await fetchDistricts();
      setPlaces(placesData);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const fetchPropertyData = async () => {
    try {
      const data = await getProperties();
      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
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

  const handlePropertyTypeFilterChange = (e) => {
    setPropertyTypeFilter(e.target.value);
  };

  const handlePlaceFilterChange = (e) => {
    setPlaceFilter(e.target.value);
  };

  const handleSubPlaceFilterChange = (e) => {
    setSubPlaceFilter(e.target.value);
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
        property.pincode?.toString().includes(term) ||
        property.productCode?.toString().toLowerCase().includes(term)
      );
    }

    // Apply property type filter
    if (propertyTypeFilter) {
      filtered = filtered.filter(property =>
        property.property_type === propertyTypeFilter
      );
    }

    // Apply place filters
    if (placeFilter) {
      const selectedPlace = places.find(place => place._id === placeFilter);
      if (selectedPlace) {
        filtered = filtered.filter(property =>
          property.address?.includes(selectedPlace.name) ||
          property.city?.includes(selectedPlace.name)
        );
      }
    }

    // Apply subplace filter
    if (subPlaceFilter) {
      const selectedSubPlace = availableSubPlaces.find(subPlace => subPlace._id === subPlaceFilter);
      if (selectedSubPlace) {
        filtered = filtered.filter(property =>
          property.address?.includes(selectedSubPlace.name)
        );
      }
    }

    // Apply price range filter
    if (priceRangeFilter) {
      switch (priceRangeFilter) {
        case 'under50':
          filtered = filtered.filter(property => (property.property_price || 0) < 5000000);
          break;
        case '50to100':
          filtered = filtered.filter(property =>
            (property.property_price || 0) >= 5000000 &&
            (property.property_price || 0) < 10000000
          );
          break;
        case '100to200':
          filtered = filtered.filter(property =>
            (property.property_price || 0) >= 10000000 &&
            (property.property_price || 0) < 20000000
          );
          break;
        case '200to500':
          filtered = filtered.filter(property =>
            (property.property_price || 0) >= 20000000 &&
            (property.property_price || 0) < 50000000
          );
          break;
        case 'over500':
          filtered = filtered.filter(property => (property.property_price || 0) >= 50000000);
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
    setPropertyTypeFilter('');
    setPlaceFilter('');
    setSubPlaceFilter('');
    setShowMobileFilters(false);
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

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const formatPlace = (place, subPlace) => {
    if (subPlace) {
      return `${subPlace.name}, ${place.name}`;
    }
    return place.name;
  };

  return (
    <div>
      <Header />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="px-4 py-8 md:px-12 lg:px-24 bg-white overflow-x-hidden">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight" style={{ color: "#03004D" }}>
          Login to unlock <br />
          <span className="text-600">property prices !</span>
        </h1>

        {/* Full-width search with icon */}
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Search City, Pincode, Address, Property Type, Product Code"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 pl-10 border rounded-md"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
        </div>

        {/* Mobile filter toggle button */}
        <div className="block md:hidden mb-4">
          <button
            onClick={toggleMobileFilters}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 border rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <FaFilter />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters section (responsive) */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Place filter */}
            <div className="w-full">
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={placeFilter}
                onChange={handlePlaceFilterChange}
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
                onChange={handleSubPlaceFilterChange}
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

            {/* Property type filter */}
            <div className="w-full">
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={propertyTypeFilter}
                onChange={handlePropertyTypeFilterChange}
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

            {/* Price range filter */}
            <div className="w-full">
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
            <div className="w-full">
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
            <div className="w-full">
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
          </div>

          {/* Clear filters button */}
          {(searchTerm || priceRangeFilter || bedsFilter || bathsFilter || propertyTypeFilter || placeFilter || subPlaceFilter) && (
            <div className="flex justify-center md:justify-start mt-4">
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 border bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Active filters display */}
        {(searchTerm || priceRangeFilter || bedsFilter || bathsFilter || propertyTypeFilter || placeFilter || subPlaceFilter) && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm('')} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                </span>
              )}

              {placeFilter && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                  Location: {places.find(p => p._id === placeFilter)?.name || ''}
                  <button onClick={() => setPlaceFilter('')} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                </span>
              )}

              {subPlaceFilter && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                  Area: {availableSubPlaces.find(sp => sp._id === subPlaceFilter)?.name || ''}
                  <button onClick={() => setSubPlaceFilter('')} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                </span>
              )}

              {propertyTypeFilter && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                  Type: {propertyTypeFilter}
                  <button onClick={() => setPropertyTypeFilter('')} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                </span>
              )}

              {priceRangeFilter && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                  Price: {priceRangeFilter === 'under50' ? 'Under ₹50L' :
                    priceRangeFilter === '50to100' ? '₹50L - ₹1Cr' :
                      priceRangeFilter === '100to200' ? '₹1Cr - ₹2Cr' :
                        priceRangeFilter === '200to500' ? '₹2Cr - ₹5Cr' : 'Over ₹5Cr'}
                  <button onClick={() => setPriceRangeFilter('')} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                </span>
              )}

              {bedsFilter && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                  {bedsFilter} {parseInt(bedsFilter) === 1 ? 'Bedroom' : 'Bedrooms'}
                  <button onClick={() => setBedsFilter('')} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                </span>
              )}

              {bathsFilter && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                  {bathsFilter} {parseInt(bathsFilter) === 1 ? 'Bathroom' : 'Bathrooms'}
                  <button onClick={() => setBathsFilter('')} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Property count */}
        {filteredProperties.length > 0 && (
          <p className="mb-4 text-sm text-gray-600">
            Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
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

        {/* Property listings */}
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
                <h2 className="text-sm font-semibold text-gray-700">{property.property_type} -   {property.productCode || "No code provided"}</h2>
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
                    onClick={() => handleViewClick(property._id)}
                    className={`px-3 py-1 bg-[#5A85BFB2] text-white text-sm rounded hover:bg-indigo-700 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
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