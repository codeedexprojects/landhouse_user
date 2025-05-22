import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CheckCircle2, XCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { approveProperty, getPendingProperties } from '../../services/allApi/adminAllApis';

const PropertyApprovalPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 10;

  useEffect(() => {
    fetchPendingProperties();
  }, []);

  const fetchPendingProperties = async () => {
    try {
      setLoading(true);
      const data = await getPendingProperties();
      // Fix: Extract properties from the response
      setProperties(data.properties || data || []);
    } catch (error) {
      toast.error('Failed to fetch pending properties');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveProperty(id, true);
      toast.success('Property approved successfully');
      fetchPendingProperties(); // Refresh the list
    } catch (error) {
      toast.error('Failed to approve property');
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await approveProperty(id, false);
      toast.success('Property rejected successfully');
      fetchPendingProperties(); // Refresh the list
    } catch (error) {
      toast.error('Failed to reject property');
      console.error(error);
    }
  };

  // Filter properties by search term
  const filteredProperties = properties.filter(property =>
    property.property_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.productCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Property Approvals</h1>
              <p className="text-gray-600">
                {filteredProperties.length} properties awaiting approval
              </p>
            </div>
            
            {/* Search */}
            <div className="relative mt-4 md:mt-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {/* Property Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : currentProperties.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created By
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProperties.map((property) => (
                    <tr key={property._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={property.photos?.[0]?.replace(/\\/g, "/") || "https://via.placeholder.com/150"}
                              alt="Property"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/150";
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {property.property_type || "Untitled Property"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {/* Handle null values gracefully */}
                              {property.beds ? `${property.beds} Beds` : 'Area'} 
                              {property.baths ? `, ${property.baths} Baths` : property.area ? `: ${property.area} sq ft` : ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {property.productCode || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {property.address || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{property.property_price?.toLocaleString() || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="text-sm font-medium text-gray-900">
                          {property.created_by?.name || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.created_by?.role || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(property._id)}
                            className="flex items-center text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(property._id)}
                            className="flex items-center text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  {searchTerm ? "No matching properties found" : "No properties pending approval"}
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredProperties.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstProperty + 1} to {Math.min(indexOfLastProperty, filteredProperties.length)} of {filteredProperties.length} properties
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-md text-sm ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'border border-gray-300'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                {totalPages > 5 && (
                  <span className="px-2 py-1">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-8 h-8 rounded-md text-sm ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'border border-gray-300'}`}
                >
                  {totalPages}
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyApprovalPage;