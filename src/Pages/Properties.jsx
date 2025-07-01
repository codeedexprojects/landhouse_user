import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { getProperties, addToFavorites, getFavorites, deleteFavourite, fetchDistricts } from "../services/allApi/userAllApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropertyFilters from "../Components/Properties/PropertyFilters";
import PropertyList from "../Components/Properties/PropertyList";
import PriceFilterModal from "../Components/Properties/PriceFilterModal";
import ShareModal from "../Components/Home/Section7";
import LoginRequiredModal from "../Components/LoginRequired";
import Loader from "../Components/Loader";

const Properties = () => {
  const [wishlist, setWishlist] = useState([]);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bedsFilter, setBedsFilter] = useState("");
  const [bathsFilter, setBathsFilter] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [places, setPlaces] = useState([]);
  const [placeFilter, setPlaceFilter] = useState("");
  const [subPlaceFilter, setSubPlaceFilter] = useState("");
  const [nearbyPlaceFilter, setNearbyPlaceFilter] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [availableSubPlaces, setAvailableSubPlaces] = useState([]);
  const [availableNearbyPlaces, setAvailableNearbyPlaces] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Ref to store scroll position
  const scrollPositionRef = useRef(0);
  const hasRestoredScroll = useRef(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    // Restore state from sessionStorage if coming back from SingleView
    const savedState = sessionStorage.getItem('propertiesPageState');
    const shouldRestoreScroll = sessionStorage.getItem('shouldRestoreScroll') === 'true';
    
    if (savedState && (location.state?.fromSingleView || shouldRestoreScroll)) {
      const parsedState = JSON.parse(savedState);
      
      // Restore all filter states
      setSearchTerm(parsedState.searchTerm || "");
      setBedsFilter(parsedState.bedsFilter || "");
      setBathsFilter(parsedState.bathsFilter || "");
      setPropertyTypeFilter(parsedState.propertyTypeFilter || "");
      setPlaceFilter(parsedState.placeFilter || "");
      setSubPlaceFilter(parsedState.subPlaceFilter || "");
      setNearbyPlaceFilter(parsedState.nearbyPlaceFilter || "");
      setMinPrice(parsedState.minPrice || "");
      setMaxPrice(parsedState.maxPrice || "");
      
      scrollPositionRef.current = parsedState.scrollPosition || 0;
    }
    
    fetchPropertyData();
    fetchUserFavorites();
    fetchPlaces();
    
    // Cleanup function to handle page unload
    const handleBeforeUnload = () => {
      // Clear the restore flag if user is leaving the site completely
      if (!document.referrer.includes(window.location.origin)) {
        sessionStorage.removeItem('shouldRestoreScroll');
        sessionStorage.removeItem('propertiesPageState');
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Restore scroll position after data is loaded and component is rendered
  useEffect(() => {
    if (!loading && !hasRestoredScroll.current) {
      const timer = setTimeout(() => {
        // Check if we should restore scroll position
        const shouldRestoreScroll = location.state?.fromSingleView || 
                                   sessionStorage.getItem('shouldRestoreScroll') === 'true';
        
        if (shouldRestoreScroll && scrollPositionRef.current > 0) {
          window.scrollTo({
            top: scrollPositionRef.current,
            behavior: 'instant'
          });
          hasRestoredScroll.current = true;
          // Clear the flag after restoring
          sessionStorage.removeItem('shouldRestoreScroll');
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [loading, filteredProperties, location.state]);

  useEffect(() => {
    filterProperties();
  }, [
    properties,
    searchTerm,
    bedsFilter,
    bathsFilter,
    propertyTypeFilter,
    placeFilter,
    subPlaceFilter,
    nearbyPlaceFilter,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    if (placeFilter) {
      const selectedPlace = places.find((place) => place._id === placeFilter);
      if (selectedPlace) {
        setAvailableSubPlaces(selectedPlace.subPlaces || []);
      } else {
        setAvailableSubPlaces([]);
      }
      setSubPlaceFilter("");
    } else {
      setAvailableSubPlaces([]);
      setSubPlaceFilter("");
    }
  }, [placeFilter, places]);

  useEffect(() => {
    if (subPlaceFilter) {
      const selectedSubPlace = availableSubPlaces.find(
        (subPlace) => subPlace._id === subPlaceFilter
      );
      if (selectedSubPlace) {
        setAvailableNearbyPlaces(selectedSubPlace.nearPlaces || []);
      } else {
        setAvailableNearbyPlaces([]);
      }
      setNearbyPlaceFilter("");
    } else {
      setAvailableNearbyPlaces([]);
      setNearbyPlaceFilter("");
    }
  }, [subPlaceFilter, availableSubPlaces]);

  // Save current state before navigation
  const saveCurrentState = () => {
    const currentState = {
      searchTerm,
      bedsFilter,
      bathsFilter,
      propertyTypeFilter,
      placeFilter,
      subPlaceFilter,
      nearbyPlaceFilter,
      minPrice,
      maxPrice,
      scrollPosition: window.pageYOffset || document.documentElement.scrollTop
    };
    
    sessionStorage.setItem('propertiesPageState', JSON.stringify(currentState));
    sessionStorage.setItem('shouldRestoreScroll', 'true');
  };

  const fetchPlaces = async () => {
    try {
      const placesData = await fetchDistricts();
      setPlaces(placesData);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const fetchPropertyData = async () => {
    try {
      const data = await getProperties();
      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const fetchUserFavorites = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setLoadingFavorites(true);
        const response = await getFavorites(userId);
        const favoriteIds = response.favourites.map((fav) => fav.propertyId._id);
        setWishlist(favoriteIds);
        setLoadingFavorites(false);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setLoadingFavorites(false);
    }
  };

  const filterProperties = () => {
    let filtered = [...properties];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.address?.toLowerCase().includes(term) ||
          property.property_type?.toLowerCase().includes(term) ||
          property.city?.toLowerCase().includes(term) ||
          property.pincode?.toString().includes(term) ||
          property.productCode?.toString().toLowerCase().includes(term)
      );
    }

    if (propertyTypeFilter) {
      filtered = filtered.filter(
        (property) => property.property_type === propertyTypeFilter
      );
    }

    if (placeFilter) {
      const selectedPlace = places.find((place) => place._id === placeFilter);
      if (selectedPlace) {
        filtered = filtered.filter(
          (property) =>
            property.address?.includes(selectedPlace.name) ||
            property.city?.includes(selectedPlace.name)
        );
      }
    }

    if (subPlaceFilter) {
      const selectedSubPlace = availableSubPlaces.find(
        (subPlace) => subPlace._id === subPlaceFilter
      );
      if (selectedSubPlace) {
        filtered = filtered.filter((property) =>
          property.address?.includes(selectedSubPlace.name)
        );
      }
    }

    if (nearbyPlaceFilter) {
      const selectedNearbyPlace = availableNearbyPlaces.find(
        (nearPlace) => nearPlace._id === nearbyPlaceFilter
      );
      if (selectedNearbyPlace) {
        const nearbyProperties = properties.filter((property) =>
          property.address?.includes(selectedNearbyPlace.name)
        );
        filtered = [...filtered, ...nearbyProperties];
        filtered = filtered.filter((property, index, self) =>
          index === self.findIndex((p) => p._id === property._id)
        );
      }
    }

    if (minPrice !== "" || maxPrice !== "") {
      const min = minPrice !== "" ? parseInt(minPrice, 10) : 0;
      const max = maxPrice !== "" ? parseInt(maxPrice, 10) : Infinity;

      filtered = filtered.filter((property) => {
        const price = property.property_price || 0;
        return price >= min && price <= max;
      });
    }

    if (bedsFilter) {
      const bedsCount = parseInt(bedsFilter);
      filtered = filtered.filter((property) => property.beds === bedsCount);
    }

    if (bathsFilter) {
      const bathsCount = parseInt(bathsFilter);
      filtered = filtered.filter((property) => property.baths === bathsCount);
    }

    setFilteredProperties(filtered);
  };

  const handlePriceClick = () => {
    const isLoggedIn = localStorage.getItem("userId") && localStorage.getItem("token");
    if (!isLoggedIn) {
      setShowLoginModal(true);
    }
  };

  const closeModal = () => setShowLoginModal(false);

  const goToLogin = () => {
    closeModal();
    navigate("/login");
  };

  const handleViewClick = async (propertyId) => {
    const isLoggedIn = localStorage.getItem("userId") && localStorage.getItem("token");

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    setIsLoading(true);
    try {
      // Save current state before navigating
      saveCurrentState();
      
      // Navigate with state indicating we're going to SingleView
      navigate(`/single/${propertyId}`, { 
        state: { fromProperties: true }
      });
      window.scrollTo(0, 0);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWishlist = async (propertyId) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        toast.error("Please login to add favorites");
        return;
      }

      const isFavorite = wishlist.includes(propertyId);

      if (isFavorite) {
        await deleteFavourite(propertyId, { userId });
        setWishlist((prev) => prev.filter((id) => id !== propertyId));
        toast.success("Removed from favorites");
      } else {
        await addToFavorites(userId, propertyId);
        setWishlist((prev) => [...prev, propertyId]);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Favorite error:", error);
      toast.error(error.response?.data?.message || "Failed to update favorites");
    }
  };

  const generateReferralLink = (userId, referralCode, propertyId) => {
    return `${window.location.origin}/register?referrerId=${userId}&referralCode=${referralCode}&productId=${propertyId}`;
  };

  const handleShare = (propertyId) => {
    const userId = localStorage.getItem("userId");
    const referralCode = localStorage.getItem("referralId");

    if (!userId || !referralCode) {
      toast.error("Please login to share properties");
      return;
    }

    const link = generateReferralLink(userId, referralCode, propertyId);
    setReferralLink(link);
    setShowShareModal(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Link copied to clipboard!");
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
    window.open(facebookUrl, "_blank");
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=Check out this property!`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent("Check out this property: " + referralLink)}`;
    window.open(whatsappUrl, "_blank");
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setBedsFilter("");
    setBathsFilter("");
    setMinPrice("");
    setMaxPrice("");
    setPropertyTypeFilter("");
    setPlaceFilter("");
    setSubPlaceFilter("");
    setNearbyPlaceFilter("");
    setShowMobileFilters(false);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const activeFiltersCount = [
    searchTerm,
    minPrice,
    maxPrice,
    bedsFilter,
    bathsFilter,
    propertyTypeFilter,
    placeFilter,
    subPlaceFilter,
    nearbyPlaceFilter
  ].filter(Boolean).length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500) // 1.5 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <Header />
          <ToastContainer position="bottom-right" autoClose={3000} />
          <div className="px-4 py-8 md:px-12 lg:px-24 bg-white overflow-x-hidden">
            {!localStorage.getItem("userId") || !localStorage.getItem("token") ? (
              <h1 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight" style={{ color: "#03004D" }}>
                Login to unlock <br />
                <span className="text-600">property prices !</span>
              </h1>
            ) : null}

            <PropertyFilters
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              placeFilter={placeFilter}
              places={places}
              onPlaceFilterChange={(e) => setPlaceFilter(e.target.value)}
              subPlaceFilter={subPlaceFilter}
              availableSubPlaces={availableSubPlaces}
              onSubPlaceFilterChange={(e) => setSubPlaceFilter(e.target.value)}
              nearbyPlaceFilter={nearbyPlaceFilter}
              availableNearbyPlaces={availableNearbyPlaces}
              onNearbyPlaceFilterChange={(e) => setNearbyPlaceFilter(e.target.value)}
              propertyTypeFilter={propertyTypeFilter}
              onPropertyTypeFilterChange={(e) => setPropertyTypeFilter(e.target.value)}
              bedsFilter={bedsFilter}
              onBedsFilterChange={(e) => setBedsFilter(e.target.value)}
              bathsFilter={bathsFilter}
              onBathsFilterChange={(e) => setBathsFilter(e.target.value)}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onShowPriceModal={() => setShowPriceModal(true)}
              onClearAllFilters={clearAllFilters}
              showMobileFilters={showMobileFilters}
              onToggleMobileFilters={toggleMobileFilters}
              activeFiltersCount={activeFiltersCount}
            />

            <PropertyList
              properties={filteredProperties}
              onPriceClick={handlePriceClick}
              onToggleWishlist={toggleWishlist}
              loadingFavorites={loadingFavorites}
              wishlist={wishlist}
              onShare={handleShare}
              onViewClick={handleViewClick}
              isLoading={isLoading}
              onLoginRequired={() => setShowLoginModal(true)}
            />
          </div>

          {showPriceModal && (
            <PriceFilterModal
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={(e) => setMinPrice(e.target.value)}
              onMaxPriceChange={(e) => setMaxPrice(e.target.value)}
              onApply={() => {
                filterProperties();
                setShowPriceModal(false);
              }}
              onCancel={() => setShowPriceModal(false)}
            />
          )}

          {showShareModal && (
            <ShareModal
              referralLink={referralLink}
              onClose={() => setShowShareModal(false)}
              onCopy={handleCopy}
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
};

export default Properties;