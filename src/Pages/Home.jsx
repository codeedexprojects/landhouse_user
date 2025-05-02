import React, { useEffect, useState } from 'react'
import { FaBed, FaBath, FaHeart, FaShareAlt, FaTimes } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { GiResize } from 'react-icons/gi';
import { CiHeart } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import home from '/src/assets/Home.png'
import home1 from '/src/assets/smallhome1.jpg'
import home2 from '/src/assets/smallhome2.jpg'
import home3 from '/src/assets/smallhome3.jpg'
import home4 from '/src/assets/smallhome4.jpg'
import person1 from '/src/assets/person1.jpg'
import person2 from '/src/assets/person2.jpg'
import person3 from '/src/assets/person3.jpg'
import person4 from '/src/assets/person4.jpg'
import bgimage from '/src/assets/bgimage.jpg'
import Rimage from '/src/assets/roundimage.png'
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LoginRequiredModal from '../Components/LoginRequired';
import { addToFavorites, deleteFavourite, getFavorites, getProperties } from '../services/allApi/userAllApi';
import { Toast } from '../Components/Toast';



function Home() {
  const navigate = useNavigate()
  const handleShow = () => {
    navigate("/properties")
  }
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  const [wishlist, setWishlist] = useState([]);
  const [properties, setProperties] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

const showToast = (message, type = 'success') => {
  setToast({ message, type });
};


  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchPropertyData();
    fetchUserFavorites();
  }, []);

  const fetchPropertyData = async () => {
    try {
      const data = await getProperties();
      // Show only first 3 properties for the home page
      setProperties(data.slice(0, 3));
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

  const handleViewClick = async (propertyId) => {
    const isLoggedIn = localStorage.getItem('userId') && localStorage.getItem('token');
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    navigate(`/single/${propertyId}`);
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
        await deleteFavourite(propertyId, { userId });
        setWishlist((prev) => prev.filter((id) => id !== propertyId));
        showToast('Removed from favorites', 'success');
      } else {
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
      <Header className="fixed top-0 left-0 w-full z-10 bg-transparent" /> {/* Header fixed at the top */}
      {toast.message && (
  <Toast
    message={toast.message}
    type={toast.type}
    onClose={() => setToast({ message: '', type: '' })}
  />
)}

      <div className="bg-white mt-[-70px] relative z-0">
        {/* Banner */}
        <div className="relative w-full h-[650px] mb-12 rounded-xl overflow-hidden" data-aos="fade-up">
          {/* Background Image */}
          <img src={home} alt="Banner" className="w-full h-full object-cover" />

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-opacity-40 flex items-center px-8 md:px-16">
            <div className="text-[#3A7EDD] max-w-md mt-52" data-aos="fade-right" data-aos-delay="200">
              <h2 className="text-3xl md:text-4xl font-bold mt-5" data-aos="fade-down" data-aos-delay="400">
                Invest In Your Future Today
              </h2>
              <p className="text-sm md:text-base mb-5 mt-5" data-aos="fade-up" data-aos-delay="600">
                Discover Profitable properties with expert guidance
              </p>
              <button
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded shadow hover:from-indigo-600 hover:to-purple-700 transition"
                data-aos="zoom-in"
                data-aos-delay="800"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>


        {/* Properties Section Heading */}
        <div
          className="mb-8 ms-5"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-800">
            Best Properties Available
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl">
            Each property design has its own meaning, and we're ready to help you get a property that matches your taste.
          </p>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
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
        {showShareModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl max-w-md w-full relative shadow-xl">
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-lg" />
              </button>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Share Property</h3>
                <p className="text-gray-600 mb-4">Share this property with friends</p>
              </div>
              <div className="relative mb-6">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  onClick={(e) => e.target.select()}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referralLink);
                    toast.success('Link copied to clipboard!');
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded hover:bg-blue-200"
                >
                  Copy
                </button>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}


        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 border-[#000000b2] text-gray-700 bg-[#5A85BFB2] rounded-sm text-[white]" onClick={handleShow}>
            SHOW MORE
          </button>
        </div>
        <div className="bg-blue-50 min-h-screen mt-5">
          {/* Top Section */}
          <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-8 overflow-hidden">

              {/* Who we are section */}
              <div
                className="md:w-1/2"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <h1 className="text-5xl font-bold text-indigo-900 mb-6">Who we are ?</h1>
                <p className="text-gray-800 text-lg mb-8">
                  We offer a range of servicing including buying, selling, and property management.
                </p>

                <div className="flex gap-12 mt-6">
                  <div className="text-center">
                    <h2 className="text-5xl font-bold text-blue-500">80+</h2>
                    <p className="text-blue-800 text-lg">Premium houses</p>
                  </div>
                  <div className="text-center">
                    <h2 className="text-5xl font-bold text-blue-500">500+</h2>
                    <p className="text-blue-800 text-lg">Agent Houses</p>
                  </div>
                  <div className="text-center">
                    <h2 className="text-5xl font-bold text-blue-500">3K</h2>
                    <p className="text-blue-800 text-lg">Happy client</p>
                  </div>
                </div>
              </div>

              {/* Images grid */}
              <div
                className="md:w-1/2 grid grid-cols-2 gap-4"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                <div className="rounded-lg overflow-hidden">
                  <img src={home1} alt="House with porch" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img src={home2} alt="White house with porch" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img src={home3} alt="Red roof house" className="w-full h-full object-cover" />
                </div>
                <div className="relative">
                  <img src={home4} alt="Modern architecture" className="w-full h-3/4 object-cover" />
                  <div className="flex justify-center mt-2">
                    <div className="flex -space-x-4">
                      <img src={person1} alt="Team member" className="w-10 h-10 rounded-full border-2 border-white" />
                      <img src={person2} alt="Team member" className="w-10 h-10 rounded-full border-2 border-white" />
                      <img src={person3} alt="Team member" className="w-10 h-10 rounded-full border-2 border-white" />
                      <img src={person4} alt="Team member" className="w-10 h-10 rounded-full border-2 border-white" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>


          {/* Bottom Section - Light Blue Background */}
          <div className="relative w-full h-auto py-16 px-6">
            {/* Background Image */}
            <img
              src={bgimage}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Light Blue Overlay */}
            <div className="absolute inset-0 bg-blue-300/30 backdrop-blur-md z-10"></div>

            {/* Content */}
            <div className="relative z-20 max-w-6xl mx-auto text-indigo-900">
              <div className="flex flex-col md:flex-row justify-between gap-8">

                {/* Why Landouse Section */}
                <div className="md:w-1/2 text-[#03004D]" data-aos="fade-right">
                  <h2 className="text-5xl font-bold mb-6">Why Landouse is Your Best Choice</h2>
                  <p className="leading-relaxed text-lg">
                    Finding the perfect property can be overwhelming, but Landouse makes the journey seamless and stress-free. Our secure platform offers transparency, convenience, and personalized features that help you make informed decisions with confidence.
                  </p>
                </div>

                {/* Features Cards */}
                <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Trusted Agency Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center" data-aos="zoom-in">
                    <div className="bg-indigo-900 p-2 rounded-full mb-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Trusted Agency</h3>
                    <p className="text-base text-gray-600">
                      Safe and reliable property-buying experience by listing only verified properties from trusted sellers.
                    </p>
                  </div>

                  {/* Legal Documentation Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center" data-aos="zoom-in">
                    <div className="bg-indigo-900 p-2 rounded-full mb-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Legal & Documentation Support</h3>
                    <p className="text-base text-gray-600">
                      Property transactions with verified legal assistance.
                    </p>
                  </div>

                  {/* Loan Assistance Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center col-span-1 md:col-span-2" data-aos="zoom-in">
                    <div className="bg-indigo-900 p-2 rounded-full mb-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Loan Assistance</h3>
                    <p className="text-base text-gray-600">
                      Get expert guidance on loan options and financing for your dream property.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 w-full flex items-center justify-center py-16 px-4 overflow-hidden" data-aos="fade-up">
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between">

            {/* Left side content */}
            <div className="md:w-1/2 p-4 md:p-8" data-aos="fade-right" data-aos-delay="200">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Get Your Dream Property
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-md">
                Discover the ideal property that suits your needs and lifestyle. Start your journey to the perfect home today!
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 text-base sm:text-lg rounded transition duration-300">
                Contact Now
              </button>
            </div>

            {/* Right side image section */}
            <div className="md:w-1/2 p-4 md:p-0 mt-8 md:mt-0 relative flex justify-center" data-aos="fade-left" data-aos-delay="400">
              <div className="w-72 h-72 rounded-full bg-blue-100/50 border-8 border-white/20 p-2 relative flex items-center justify-center">
                {/* Blue circular rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-200 -m-2"></div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-200 -m-4"></div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-200 -m-6"></div>

                {/* Image */}
                <img
                  src={Rimage}
                  alt="Modern dream home"
                  className="w-64 h-64 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      <LoginRequiredModal
        show={showLoginModal}
        onClose={closeModal}
        onLogin={goToLogin}
      />
      <Footer />
    </div>
  )
}

export default Home