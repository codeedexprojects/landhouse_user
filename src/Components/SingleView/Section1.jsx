import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaBed, FaBath, FaRulerCombined, FaHeart, FaShareAlt, FaTimes, FaFacebook, FaTwitter, FaWhatsapp, FaPhone } from "react-icons/fa";
import { addToCompare, getSingleProperty, addToFavorites, getFavorites, deleteFavourite } from '../../services/allApi/userAllApi';
import { Toast } from '../Toast';
import { FaBuilding } from "react-icons/fa";

export default function SingleProperty() {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [compareLoading, setCompareLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const [wishlist, setWishlist] = useState([]);
    const [showShareModal, setShowShareModal] = useState(false);
    const [referralLink, setReferralLink] = useState('');
    const [loadingFavorites, setLoadingFavorites] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const BASE_URL = "https://landouse-backend.onrender.com";
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const propertyData = await getSingleProperty(propertyId);
                setProperty(propertyData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
        fetchUserFavorites();
    }, [propertyId]);

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

    const showToast = (message, type) => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    const handleCompare = async () => {
        try {
            setCompareLoading(true);
            const userId = localStorage.getItem('userId');

            if (!userId) {
                navigate('/login');
                return;
            }

            const reqBody = {
                userId: userId,
                propertyId: propertyId
            };

            await addToCompare(reqBody);
            showToast('Property added to compare list!', 'success');
            navigate('/compare')

        } catch (error) {
            // Handle the specific backend error message
            const errorMessage = error.response?.data?.message || error.message || 'Failed to add to compare';

            // Special handling for the comparison limit message
            if (errorMessage.includes("Only two properties can be compared")) {
                showToast('Only two properties can be compared.', 'error');
            } else {
                showToast(errorMessage, 'error');
            }
        } finally {
            setCompareLoading(false);
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

    const handleShare = () => {
        const userId = localStorage.getItem('userId');
        const referralCode = localStorage.getItem('referralId');

        if (!userId || !referralCode) {
            showToast('Please login to share properties', 'error');
            return;
        }

        const link = generateReferralLink(userId, referralCode, propertyId);
        setReferralLink(link);
        setShowShareModal(true);
    };

    const handleContactAgent = () => {
        if (!property || !property.created_by || !property.created_by.number) {
            showToast('Agent contact information not available', 'error');
            return;
        }

        // Use tel: protocol to initiate a call
        window.location.href = `tel:${property.created_by.number}`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink)
            .then(() => {
                showToast('Link copied to clipboard!', 'success');
            })
            .catch(() => {
                showToast('Failed to copy link', 'error');
            });
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    if (!property) return <div className="text-center py-10">Property not found</div>;

    const city = property.address.split(',')[1]?.trim() || 'Location';

    return (
        <div className="w-full p-5 max-w-full mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(prev => ({ ...prev, show: false }))}
                />
            )}
            {/* Property Image Slider */}
            <div className="relative">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    slidesPerView={1}
                    className="w-full h-96"
                >
                    {property.photos.map((photo, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={`${BASE_URL}/${photo}`}
                                alt={`Property ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/placeholder-property.jpg';
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="absolute top-4 right-4 flex space-x-2 z-10">
                    <button
                        className="p-2 bg-white bg-opacity-90 rounded-full shadow-md hover:bg-opacity-100 transition"
                        onClick={() => {
                            const isLoggedIn = localStorage.getItem('userId') && localStorage.getItem('token');
                            if (!isLoggedIn) {
                                setShowLoginModal(true);
                                return;
                            }
                            toggleWishlist(propertyId);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill={wishlist.includes(propertyId) ? "red" : "none"}
                            viewBox="0 0 24 24"
                            stroke={wishlist.includes(propertyId) ? "red" : "currentColor"}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>

                    <button
                        className="p-2 bg-white bg-opacity-90 rounded-full shadow-md hover:bg-opacity-100 transition"
                        onClick={handleShare}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl max-w-md w-full relative shadow-xl animate-fade-in">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowShareModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaTimes className="text-lg" />
                        </button>

                        {/* Modal Content */}
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

                        {/* Link Input */}
                        <div className="relative mb-6">
                            <input
                                type="text"
                                value={referralLink}
                                readOnly
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                onClick={(e) => e.target.select()}
                            />
                            <button
                                onClick={copyToClipboard}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded hover:bg-blue-200 transition-colors"
                            >
                                Copy
                            </button>
                        </div>

                        {/* Social Share Buttons (Optional) */}
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

                        {/* Action Buttons */}
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

            {/* Property Details Container */}
            <div className="p-6">
                <div className="container mx-auto">
                    <div className="lg:flex lg:justify-between">
                        {/* Left Column: Title, Location, Type, Price and Google Maps Button */}
                        <div className="lg:w-1/2">
                            {/* Title and Location */}
                            <h2 className="text-2xl font-semibold text-indigo-900">
                                {property.beds} BHK @ {city}
                            </h2>

                            <div className="flex items-center mt-3 text-indigo-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{property.address}</span>
                            </div>

                            <div className="flex items-center mt-2 text-indigo-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span>{property.property_type}</span>
                            </div>

                            {/* Price */}
                            <div className="mt-4 text-2xl font-bold text-indigo-900">
                                ₹ {property.property_price.toLocaleString()}
                            </div>

                            {/* Google Maps Button */}
                            <div className="mt-6">
                                <button
                                    className="px-6 py-3 bg-indigo-900 text-white rounded-md flex items-center justify-center w-full sm:w-auto"
                                    onClick={() => {
                                        const { latitude, longitude } = property.coordinates;
                                        window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    View on Google Maps
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 flex flex-wrap gap-3">
                                <button
                                    onClick={handleCompare}
                                    disabled={compareLoading}
                                    className={`px-6 py-2 border border-indigo-900 text-indigo-900 rounded hover:bg-indigo-50 transition-colors ${compareLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {compareLoading ? 'Adding...' : 'Compare'}
                                </button>

                                <button
                                    onClick={handleContactAgent}
                                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center"
                                >
                                    <FaPhone className="mr-2" />
                                    Contact Agent
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Property Specifications */}
                        <div className="lg:w-1/2 mt-6 lg:mt-0 lg:pl-8">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-indigo-900 mb-4">Property Specifications</h3>

                                <div className="grid grid-cols-1 gap-2">
                                    {/* Create an array of all possible specifications */}
                                    {(() => {
                                        const specs = [];

                                        if (property.buildIn) {
                                            specs.push({
                                                label: "Build In",
                                                value: property.buildIn
                                            });
                                        }

                                        if (property.beds) {
                                            specs.push({
                                                label: "Bedrooms",
                                                value: property.beds
                                            });
                                        }

                                        if (property.baths) {
                                            specs.push({
                                                label: "Bathrooms",
                                                value: property.baths
                                            });
                                        }

                                        if (property.area) {
                                            specs.push({
                                                label: "Buildup Area",
                                                value: `${property.area} sq ft`
                                            });
                                        }

                                        if (property.carpet_area) {
                                            specs.push({
                                                label: "Carpet Area",
                                                value: `${property.carpet_area} sq ft`
                                            });
                                        }

                                        if (property.cent) {
                                            specs.push({
                                                label: "Land Area",
                                                value: `${property.cent} cent`
                                            });
                                        }

                                        if (property.price_per_cent) {
                                            specs.push({
                                                label: "Price per Cent",
                                                value: `₹${property.price_per_cent}`
                                            });
                                        }

                                        if (property.car_parking) {
                                            specs.push({
                                                label: "Car Parking",
                                                value: property.car_parking
                                            });
                                        }

                                        if (property.car_access) {
                                            specs.push({
                                                label: "Car Access",
                                                value: property.car_access === 'yes' ? 'Yes' : 'No'
                                            });
                                        }

                                        if (property.floor) {
                                            specs.push({
                                                label: "Floor",
                                                value: property.floor
                                            });
                                        }

                                        if (property.road_frontage) {
                                            specs.push({
                                                label: "Road Frontage",
                                                value: property.road_frontage
                                            });
                                        }

                                        if (property.maxrooms) {
                                            specs.push({
                                                label: "Max Rooms",
                                                value: property.maxrooms
                                            });
                                        }

                                        // Display only first 4 specs or all if showAll is true
                                        const displaySpecs = showAll ? specs : specs.slice(0, 4);

                                        return (
                                            <>
                                                {displaySpecs.map((spec, index) => (
                                                    <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                                                        <span className="text-gray-600">{spec.label}</span>
                                                        <span className="font-medium">{spec.value}</span>
                                                    </div>
                                                ))}

                                                {/* Show "See More" button only if there are more than 4 specs */}
                                                {specs.length > 4 && (
                                                    <div className="col-span-full mt-3">
                                                        <button
                                                            onClick={() => setShowAll(!showAll)}
                                                            className="w-full py-2 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                                                        >
                                                            {showAll ? 'Show Less' : `See More (${specs.length - 4} more)`}
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}