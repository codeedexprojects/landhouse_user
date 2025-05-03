import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { getComparisons } from "../services/allApi/userAllApi";

const CompareProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL="http://localhost:3005"

  useEffect(() => {
    const fetchCompareData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Adjust as needed
        const response = await getComparisons(userId);
        setProperties(response.properties || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCompareData();
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen px-4 py-10 flex justify-center bg-white">
          <div className="w-full max-w-6xl">
            <h2 className="text-3xl font-bold text-[#131A5A] mb-10">
              Compare Properties
            </h2>
            <p>Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="min-h-screen px-4 py-10 flex justify-center bg-white">
          <div className="w-full max-w-6xl">
            <h2 className="text-3xl font-bold text-[#131A5A] mb-10">
              Compare Properties
            </h2>
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (properties.length < 2) {
    return (
      <div>
        <Header />
        <div className="min-h-screen px-4 py-10 flex justify-center bg-white">
          <div className="w-full max-w-6xl">
            <h2 className="text-3xl font-bold text-[#131A5A] mb-10">
              Compare Properties
            </h2>
            <p>You need at least 2 properties to compare.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Extract the properties to compare
  const [property1, property2] = properties;

  return (
    <div>
      <Header />
      <div className="min-h-screen px-4 py-10 flex justify-center bg-white">
        <div className="w-full max-w-6xl">
          <h2 className="text-3xl font-bold text-[#131A5A] mb-10">
            Compare Properties
          </h2>

          {/* Images on top of columns */}
          <div className="grid grid-cols-3 gap-4 items-start mb-4">
            <div></div> {/* Left spacer for title column */}
            <div className="flex justify-center">
              <img
                src={`${BASE_URL}/${property1.photos[0]}`} // Use your BASE_URL
                alt="Property 1"
                className="h-48 w-full max-w-[300px] object-cover rounded-md"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "/path/to/default/image.jpg";
                }}
              />
            </div>
            <div className="flex justify-center">
              <img
                src={`${BASE_URL}/${property2.photos[0]}`}
                alt="Property 2"
                className="h-48 w-full max-w-[300px] object-cover rounded-md"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "/path/to/default/image.jpg";
                }}
              />
            </div>
          </div>

          {/* Table with comparison data */}
          <div className="w-full border border-gray-300 rounded-md overflow-hidden">
            {[
              ["Title", `${property1.property_type}, ${property1.cent} Cent`, `${property2.property_type}, ${property2.cent} Cent`],
              ["Price", `₹ ${property1.property_price?.toLocaleString() || 'N/A'}`, `₹ ${property2.property_price?.toLocaleString() || 'N/A'}`],
              ["Area", `${property1.area || 'N/A'} sqft`, `${property2.area || 'N/A'} sqft`],
              ["Property Type", property1.property_type || 'N/A', property2.property_type || 'N/A'],
              ["Address", property1.address || 'N/A', property2.address || 'N/A'],
              ["Build Year", property1.buildIn || 'N/A', property2.buildIn || 'N/A'],
              ["Bedrooms", property1.beds || 'N/A', property2.beds || 'N/A'],
              ["Bathrooms", property1.baths || 'N/A', property2.baths || 'N/A'],
              ["Cent", property1.cent || 'N/A', property2.cent || 'N/A'],
              ["Max Rooms", property1.maxrooms || 'N/A', property2.maxrooms || 'N/A'],
              ["Nearby", property1.whats_nearby || 'N/A', property2.whats_nearby || 'N/A'],
              ["Status", property1.soldOut ? "Sold Out" : "Available", property2.soldOut ? "Sold Out" : "Available"],
            ].map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-3 px-4 py-3 text-sm ${
                  idx % 2 === 0 ? "bg-[#E9F1FF]" : "bg-white"
                }`}
              >
                <div className="font-medium text-[#131A5A]">{row[0]}</div>
                <div>{row[1]}</div>
                <div>{row[2]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompareProperties;