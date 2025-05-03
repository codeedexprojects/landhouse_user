import { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  Filter,
  ArrowLeft,
  ArrowRight,
  Download,
  Heart,
} from "lucide-react";
import image from "../../assets/house1.jpg";
import { Link } from "react-router-dom";
import { getAllProperties } from "../../services/allApi/adminAllApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PropertyListingPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = (id) => {
    const filtered = properties.filter((p) => p._id !== id);
    setProperties(filtered);
    toast.success("Property deleted successfully!");
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getAllProperties();
      console.log("Fetched properties:", data);
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

          <div className="ml-auto">
            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <img
                src={image}
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-md shadow-sm p-3 mb-4">
        <div className="flex items-center flex-wrap md:flex-nowrap">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by property name, bedroom, place..."
              className="w-full pl-10 py-2 pr-3 bg-transparent outline-none text-sm border-none focus:ring-0"
            />
          </div>
          <div className="flex items-center border-l border-gray-200 px-4">
            <span className="text-sm text-gray-500 mr-2">Show:</span>
            <button className="flex items-center text-sm">
              All
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center border-l border-gray-200 px-4">
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <button className="flex items-center text-sm">
              Default
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center border-l border-gray-200 pl-4">
            <button className="text-gray-700">
              <Filter className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center border-l border-gray-200 pl-4">
            <button className="flex items-center text-sm">
              Name
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">
            Loading properties...
          </p>
        ) : properties && properties.length > 0 ? (
          properties.map((property, index) => (
            <Link
              key={index}
              to="/admin/property-details"
              state={{
                property
              }}
            >
              {" "}
              <div className="relative">
                <img
                  src={
                    property.photos &&
                    `https://landouse-backend.onrender.com/${property.photos[0]}`
                  }
                  alt="Property"
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-2 left-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-md text-xs">
                  <span className="text-xs">📍{property.location}</span>
                </button>
                <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
                  <Heart className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-blue-500 font-medium text-sm mb-3">
                  {property.title}
                </h3>
                <div className="flex justify-between text-xs text-gray-500">
                  <div className="text-center">
                    <div className="font-semibold text-blue-500">
                      {property.beds}
                    </div>
                    <div>Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-500">
                      {property.baths}
                    </div>
                    <div>Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-500">
                      {property.area}
                    </div>
                    <div>Sqft</div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No properties available.
          </p>
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
            <button className="w-8 h-8 rounded-md bg-blue-500 text-white flex items-center justify-center text-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">
              2
            </button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">
              3
            </button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">
              4
            </button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">
              5
            </button>
            <span className="flex items-center justify-center text-gray-500">
              ...
            </span>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">
              19
            </button>
          </div>

          <button className="p-2 text-gray-500">
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="ml-4 flex items-center border-l border-gray-200 pl-4">
            <button className="w-8 h-8 rounded-md bg-white text-gray-600 flex items-center justify-center text-sm shadow-sm">
              10
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
