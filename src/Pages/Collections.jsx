import React, { useEffect, useState } from 'react';
import { MdLocationOn } from "react-icons/md";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { deleteFavourite, getFavorites, removeFromFavorites } from '../services/allApi/userAllApi'; // Adjust import path
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from 'react-icons/fa';

function Collections() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorites from API
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          toast.error('Please login to view favorites');
          navigate('/login');
          return;
        }

        const response = await getFavorites(userId);
        // Transform API data to match frontend structure
        const formattedFavorites = response.favourites.map(fav => ({
          id: fav.propertyId._id,
          image: fav.propertyId.photos[0]
            ? fav.propertyId.photos[0].replace(/\\/g, "/")
            : 'default-image-path.jpg',
          title: `${fav.propertyId.property_type || 'Property'} `,

          beds: fav.propertyId.beds,
          baths: fav.propertyId.baths,
          sqft: fav.propertyId.area,
          location: fav.propertyId.address,
          price: fav.propertyId.property_price,
        }));
        setFavorites(formattedFavorites);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
        toast.error('Failed to load favorites');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Remove from favorites
  const handleRemoveFavorite = async (propertyId) => {
    try {
      const userId = localStorage.getItem('userId');
      await deleteFavourite(propertyId, { userId });

      setFavorites(prev => prev.filter(item => item.id !== propertyId));
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove');
    }
  };

  const handleBrowseClick = () => {
    navigate('/properties');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div>
        <div className="text-center mt-10 mb-10">
          <h1 className="text-gray-900 text-3xl font-semibold">Your Collections</h1>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-10">
            {favorites.map((property) => (
              <div
                key={property.id}
                className="border rounded-lg shadow-sm overflow-hidden w-full max-w-[360px] mx-auto"
                style={{ border: "1px solid white", borderRadius: "2px", backgroundColor: "#E7F1FF" }}
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#EAF2FF] text-xs text-gray-600 font-semibold px-2 py-1 rounded">
                    Price: RS:{property.price.toLocaleString()}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleRemoveFavorite(property.id)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <FaHeart className="text-red-500" size={14} />
                    </button>

                    {/* <button className="text-gray-600 hover:text-gray-800">
                      <CiShare2 />
                    </button> */}
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <h2 className="text-xs font-semibold text-gray-700">{property.title}</h2>
                  <div className="text-xs text-gray-500 flex flex-wrap gap-1">
                    {[
                      property.beds ? `${property.beds} Beds` : null,
                      property.baths ? `${property.baths} Baths` : null,
                      property.sqft ? `${property.sqft} sqft` : null,
                    ]
                      .filter(Boolean) // removes null values
                      .map((text, index, arr) => (
                        <span key={index}>
                          {text}
                          {index < arr.length - 1 && ' |'}
                        </span>
                      ))}
                  </div>

                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MdLocationOn className="text-base text-gray-400" />
                    {property.location}
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => navigate(`/single/${property.id}`)}
                      className="px-3 py-1 bg-[#5A85BFB2] text-white text-xs rounded hover:bg-indigo-700"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10 mb-20 px-4 text-center">
            <img
              src="https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif"
              alt="Empty collection"
              className="w-72 h-72 mb-6"
            />
            <p className="text-gray-600 mb-4 text-lg font-medium">You haven't added any favorites yet.</p>
            <button
              onClick={handleBrowseClick}
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Browse Listings
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Collections;