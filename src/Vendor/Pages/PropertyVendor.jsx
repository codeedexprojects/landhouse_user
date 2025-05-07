import { useEffect, useState } from "react";
import { Search, ChevronDown, Filter, Download, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdLocationOn } from "react-icons/md";
import { getAllVendorProperties } from "../../services/allApi/vendorAllAPi";

export default function PropertyListingPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    const filtered = properties.filter((p) => p._id !== id);
    setProperties(filtered);
    toast.success("Property deleted successfully!");
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getAllVendorProperties();
      setProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span>property</span>
          <span className="mx-2">/</span>
          <span className="text-blue-500">property list</span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-md shadow-sm p-3 mb-4">
        <div className="flex items-center flex-wrap md:flex-nowrap gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by property name, bedroom, place..."
              className="w-full pl-10 py-2 pr-3 bg-transparent outline-none text-sm border-none focus:ring-0"
            />
          </div>
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-10">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ) : properties && properties.length > 0 ? (
          properties.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg shadow-sm overflow-hidden w-full max-w-[360px] mx-auto relative"
              style={{ backgroundColor: "#E7F1FF" }}
            >
              {/* Property Image */}
              <div className="relative">
                <img
                  src={
                    property.photos && property.photos.length > 0
                      ? `https://landouse-backend.onrender.com/${property.photos[0]?.replace(/\\/g, "/")}`
                      : "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={property.property_type || "Property"}
                  className="w-full h-36 object-cover"
                />
                <div className="absolute top-2 left-2 bg-[#EAF2FF] text-xs text-gray-600 font-semibold px-2 py-1 rounded cursor-pointer hover:bg-[#D5E3FF]">
                  Price: ₹{property.property_price?.toLocaleString() || 'N/A'}
                </div>
              </div>

              {/* Property Details */}
              <div className="p-3 space-y-2">
                <h2 className="text-sm font-semibold text-gray-700">
                  {property.property_type || "Untitled Property"} - {property.maxrooms || "N/A"} Rooms
                </h2>
                <div className="text-sm text-gray-500 flex flex-wrap gap-1">
                  <span>{property.beds || "N/A"} Beds</span> |
                  <span>{property.baths || "N/A"} Baths</span> |
                  <span>{property.area || "N/A"} sqft</span>
                </div>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <MdLocationOn className="text-base text-gray-400" />
                  {property.address || "No address provided"}
                </p>
                <div className="flex justify-end">
                  <Link
                    to="/vendor/prop-details-vendor"
                    state={{ property }}
                    className={`px-3 py-1 bg-[#5A85BFB2] text-white text-sm rounded hover:bg-indigo-700 transition-colors ${
                      isLoading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No properties available</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm">
          <Download className="mr-2 w-4 h-4" />
          Download
        </button>

        <div className="flex items-center">
          <button className="p-2 text-gray-500">
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex space-x-2 mx-2">
            <button className="w-8 h-8 rounded-md bg-blue-500 text-white flex items-center justify-center text-sm">1</button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">2</button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">3</button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">4</button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">5</button>
            <span className="flex items-center justify-center text-gray-500">...</span>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">19</button>
          </div>

          <button className="p-2 text-gray-500">
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="ml-4 flex items-center border-l border-gray-200 pl-4">
            <button className="w-8 h-8 rounded-md bg-white text-gray-600 flex items-center justify-center text-sm shadow-sm">10</button>
          </div>
        </div>
        </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}