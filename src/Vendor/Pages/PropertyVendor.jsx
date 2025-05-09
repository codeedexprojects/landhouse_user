import { useEffect, useState } from "react";
import { Search, ChevronDown, Filter, Download, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {  } from "../../services/allApi/adminAllApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdLocationOn } from "react-icons/md";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";
import { getAllVendorProperties } from "../../services/allApi/vendorAllAPi";

export default function PropertyListingPage() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceSort: "",
    beds: "",
    baths: "",
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);

  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers for display
  const getDisplayedPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 7) {
      // If there are 7 or fewer pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push("...");
      }
      
      // Show current page and surrounding pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    applyFilters(value, filters);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });

    applyFilters(searchTerm, { ...filters, [name]: value });
  };

  // Apply all filters
  const applyFilters = (searchValue, filterSettings) => {
    let filtered = [...properties];

    // Apply search filter
    if (searchValue) {
      filtered = filtered.filter(
        (property) =>
          property.property_type?.toLowerCase().includes(searchValue.toLowerCase()) ||
          property.address?.toLowerCase().includes(searchValue.toLowerCase()) ||
          String(property.beds).includes(searchValue)
      );
    }

    // Apply bedroom filter
    if (filterSettings.beds) {
      filtered = filtered.filter(
        (property) => property.beds && property.beds >= parseInt(filterSettings.beds)
      );
    }

    // Apply bathroom filter
    if (filterSettings.baths) {
      filtered = filtered.filter(
        (property) => property.baths && property.baths >= parseInt(filterSettings.baths)
      );
    }

    // Apply price sorting
    if (filterSettings.priceSort === "lowToHigh") {
      filtered.sort((a, b) => (a.property_price || 0) - (b.property_price || 0));
    } else if (filterSettings.priceSort === "highToLow") {
      filtered.sort((a, b) => (b.property_price || 0) - (a.property_price || 0));
    }

    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset to first page when filters change
    setTotalPages(Math.ceil(filtered.length / propertiesPerPage));
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      priceSort: "",
      beds: "",
      baths: "",
    });
    setFilteredProperties(properties);
    setCurrentPage(1);
    setTotalPages(Math.ceil(properties.length / propertiesPerPage));
  };

  // Download as PDF
  const downloadAsPDF = () => {
    try {
      // Initialize jsPDF
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text("Property Listing Report", 14, 15);
      
      // Prepare table data
      const tableData = filteredProperties.map(property => [
        property.property_type || "N/A",
        property.address || "N/A",
        property.beds || "N/A",
        property.baths || "N/A",
        property.area ? `${property.area} sqft` : "N/A",
        property.property_price ? `₹${property.property_price.toLocaleString()}` : "N/A"
      ]);
  
      // Add the table using jspdf-autotable
      autoTable(doc, {
        head: [['Type', 'Address', 'Beds', 'Baths', 'Area', 'Price']],
        body: tableData,
        startY: 25,
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [93, 133, 191],
          textColor: 255,
          fontStyle: 'bold'
        }
      });
  
      // Save the PDF
      doc.save(`property_listing_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const handleDelete = (id) => {
    const filtered = properties.filter((p) => p._id !== id);
    setProperties(filtered);
    setFilteredProperties(filtered);
    setTotalPages(Math.ceil(filtered.length / propertiesPerPage));
    toast.success("Property deleted successfully!");
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getAllVendorProperties();
      setProperties(data);
      setFilteredProperties(data);
      setTotalPages(Math.ceil(data.length / propertiesPerPage));
      setLoading(false);
    };

    fetchProperties();
  }, [propertiesPerPage]);

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
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button 
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button 
            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md"
            onClick={downloadAsPDF}
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Sort</label>
              <select
                name="priceSort"
                value={filters.priceSort}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">None</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Beds</label>
              <select
                name="beds"
                value={filters.beds}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Baths</label>
              <select
                name="baths"
                value={filters.baths}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-sm"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
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
        ) : currentProperties && currentProperties.length > 0 ? (
          currentProperties.map((property) => (
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
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
                <div className="absolute top-2 left-2 bg-[#EAF2FF] text-xs text-gray-600 font-semibold px-2 py-1 rounded cursor-pointer hover:bg-[#D5E3FF]">
                  Price: ₹{property.property_price?.toLocaleString() || 'N/A'}
                </div>
              </div>

              {/* Property Details */}
              <div className="p-3 space-y-2">
                <h2 className="text-sm font-semibold text-gray-700">
                  {property.property_type || "Untitled Property"} - {property.maxrooms || property.beds || "N/A"} Rooms
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
            <button 
              onClick={resetFilters}
              className="mt-2 text-blue-500 hover:text-blue-700 text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProperties.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <button 
            className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm"
            onClick={downloadAsPDF}
          >
            <Download className="mr-2 w-4 h-4" />
            Download
          </button>

          <div className="flex items-center">
            <button 
              className={`p-2 text-gray-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            <div className="flex space-x-2 mx-2">
              {getDisplayedPageNumbers().map((pageNumber, index) => (
                pageNumber === "..." ? (
                  <span key={`ellipsis-${index}`} className="flex items-center justify-center text-gray-500">...</span>
                ) : (
                  <button
                    key={pageNumber}
                    className={`w-8 h-8 rounded-md ${
                      currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
                    } flex items-center justify-center text-sm shadow-sm`}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              ))}
            </div>

            <button 
              className={`p-2 text-gray-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="ml-4 flex items-center border-l border-gray-200 pl-4">
              <button className="w-8 h-8 rounded-md bg-white text-gray-600 flex items-center justify-center text-sm shadow-sm">
                {propertiesPerPage}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}