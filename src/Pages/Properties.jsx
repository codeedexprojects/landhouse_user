import React, { useEffect, useState } from 'react';
import { MdLocationOn } from "react-icons/md";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getProperties } from '../services/allApi/userAllApi';

const Properties = () => {
  const [wishlist, setWishlist] = useState([]);
  const [properties, setProperties] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [referralLink, setReferralLink] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchPropertyData();
  }, []);

  const fetchPropertyData = async () => {
    const data = await getProperties();
    setProperties(data);
  };

  const handleViewClick = (id) => {
    navigate(`/single/${id}`);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const generateReferralLink = (userId, referralCode, productId) => {
    return `${window.location.origin}/register?referrerId=${userId}&referralCode=${referralCode}&productId=${productId}`;
  };


  const handleShare = (propertyId) => {
    const userId = localStorage.getItem('userId');
    const referralCode = localStorage.getItem('referralId');

    if (!userId || !referralCode) {
      console.error('User ID or Referral Code not found in localStorage');
      return;
    }

    const link = generateReferralLink(userId, referralCode, propertyId);
    setReferralLink(link);
    setShowShareModal(true);
  };



  return (
    <div>
      <Header />
      <div className="px-4 py-8 md:px-12 lg:px-24 bg-white overflow-x-hidden">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-tight">
          Login to unlock <br />
          <span className="text-600">property prices !</span>
        </h1>

        <input
          type="text"
          placeholder="Search City, Pincode, Address"
          className="w-[300px] px-4 py-3 border rounded-md mb-4"
        />

        <div className="w-40 mb-8">
          <select className="w-full px-3 py-2 border rounded-md">
            <option>Price</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg shadow-sm overflow-hidden w-full max-w-[360px] mx-auto relative"
              style={{ backgroundColor: "#E7F1FF" }}
            >
              {/* Property Image */}
              <div className="relative">
                <img
                  src={`https://landouse-backend.onrender.com/${property.photos[0]?.replace(/\\/g, "/")}`}
                  alt={property.property_type}
                  className="w-full h-36 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => toggleWishlist(property._id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <FaHeart
                      className={wishlist.includes(property._id) ? "text-red-500" : "text-gray-500"}
                      size={14}
                    />
                  </button>
                  <button
                    onClick={() => handleShare(property._id)}
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
                    className="px-3 py-1 bg-[#5A85BFB2] text-white text-sm rounded hover:bg-indigo-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-80 shadow-md">
            <h2 className="text-lg font-semibold mb-4">Share Property</h2>
            <input
              type="text"
              value={referralLink}
              readOnly
              className="w-full px-3 py-2 border rounded mb-4 text-sm"
            />
            <div className="flex justify-between">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(referralLink);
                  alert("Link copied to clipboard!");
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Properties;
