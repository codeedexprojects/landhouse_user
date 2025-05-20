import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { addToFavorites, deleteFavourite, getFavorites, getProperties } from '../services/allApi/userAllApi';
import { Toast } from '../Components/Toast';
import Banner from '../Components/Home/Section1';
import PropertySection from '../Components/Home/Section3';
import AboutSection from '../Components/Home/Section4';
import WhyChooseUs from '../Components/Home/Section5';
import DreamProperty from '../Components/Home/Section6';
import ShareModal from '../Components/Home/Section7';
import LoginRequiredModal from '../Components/LoginRequired';
import Loader from '../Components/Loader';

function Home() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [properties, setProperties] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    // Fetch data
    fetchPropertyData();
    fetchUserFavorites();
    
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds of loading time
    
    return () => clearTimeout(timer);
  }, []);

  const fetchPropertyData = async () => {
    try {
      const data = await getProperties();
      setProperties(data.slice(0, 6));
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

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
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
    window.scrollTo(0, 0);
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
        showToast('Removed from favorites', 'error');
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
      showToast('Please login to share properties', 'error');
      return;
    }
    const link = generateReferralLink(userId, referralCode, propertyId);
    setReferralLink(link);
    setShowShareModal(true);
  };

  const handleShowMore = () => {
    navigate('/properties');
    window.scrollTo(0, 0);
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=Check out this property!`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent("Check out this property: " + referralLink)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => showToast('Link copied to clipboard!', 'success'))
      .catch(() => showToast('Failed to copy link', 'error'));
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <Header className="fixed top-0 left-0 w-full z-10 bg-transparent" />
          {toast.message && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ message: '', type: '' })}
            />
          )}

          <div className="bg-white mt-[-70px] relative z-0">
            <Banner />

            {/* Properties Section Heading */}
            <div className="mb-8 ms-5" data-aos="fade-down" data-aos-duration="1000">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-800">
                Best Properties Available
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl">
                Each property design has its own meaning, and we're ready to help you get a property that matches your taste.
              </p>
            </div>

            {/* Latest Properties Section */}
            <PropertySection
              title="Latest Properties"
              description="Check out our newest additions to the property listings."
              properties={properties.filter(property => property.isLatest).slice(0, 3)}
              onPriceClick={handlePriceClick}
              onToggleWishlist={toggleWishlist}
              loadingFavorites={loadingFavorites}
              wishlist={wishlist}
              onShare={handleShare}
              onViewClick={handleViewClick}
              isLoading={false}
              onLoginRequired={() => setShowLoginModal(true)}
            />

            {/* Featured Properties Section */}
            <PropertySection
              title="Featured Properties"
              description="Our hand-picked selection of premium properties."
              properties={properties.filter(property => property.isFeatured).slice(0, 3)}
              onPriceClick={handlePriceClick}
              onToggleWishlist={toggleWishlist}
              loadingFavorites={loadingFavorites}
              wishlist={wishlist}
              onShare={handleShare}
              onViewClick={handleViewClick}
              isLoading={false}
              onLoginRequired={() => setShowLoginModal(true)}
              onShowMore={handleShowMore}
            />

            <AboutSection />
            <WhyChooseUs />
            <DreamProperty />
          </div>

          {showShareModal && (
            <ShareModal
              referralLink={referralLink}
              onClose={() => setShowShareModal(false)}
              onCopy={copyToClipboard}
              onFacebookShare={shareOnFacebook}
              onTwitterShare={shareOnTwitter}
              onWhatsAppShare={shareOnWhatsApp}
            />
          )}

          <LoginRequiredModal
            show={showLoginModal}
            onClose={closeModal}
            onLogin={goToLogin}
          />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Home;