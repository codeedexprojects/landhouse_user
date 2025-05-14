import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Download, Check } from 'lucide-react';
import { getEnquireis, markAsReadEnquiry } from '../../services/allApi/adminAllApis';
import { Toast } from '../../Components/Toast';
import { useNavigate } from 'react-router-dom';

export default function MessageList() {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'read', 'unread'
  const navigate = useNavigate();

  const enquiriesPerPage = 10;

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await getEnquireis();
        if (response && response.data && response.data.enquiries) {
          setEnquiries(response.data.enquiries);
          setFilteredEnquiries(response.data.enquiries);
        } else {
          setToast({ message: 'Failed to load enquiries.', type: 'error' });
        }
      } catch (error) {
        console.error(error);
        setToast({ message: 'Error fetching enquiries.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  // Apply filters whenever statusFilter or enquiries change
  useEffect(() => {
    let filtered = [...enquiries];
    
    if (statusFilter === 'read') {
      filtered = filtered.filter(enquiry => enquiry.isRead);
    } else if (statusFilter === 'unread') {
      filtered = filtered.filter(enquiry => !enquiry.isRead);
    }
    
    setFilteredEnquiries(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [statusFilter, enquiries]);

  // Pagination calculation
  const indexOfLastEnquiry = currentPage * enquiriesPerPage;
  const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;
  const currentEnquiries = filteredEnquiries.slice(indexOfFirstEnquiry, indexOfLastEnquiry);
  const totalPages = Math.ceil(filteredEnquiries.length / enquiriesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsReadEnquiry(id);
      // Update enquiries locally
      setEnquiries(prevEnquiries =>
        prevEnquiries.map(enq =>
          enq._id === id ? { ...enq, isRead: true } : enq
        )
      );
      setToast({ message: 'Enquiry marked as read.', type: 'success' });
    } catch (error) {
      console.error(error);
      setToast({ message: 'Failed to mark as read.', type: 'error' });
    }
  };

  const handlePropertyClick = (property) => {
    if (property) {
      navigate('/admin/property-details', { state: { property } });
    } else {
      setToast({ message: 'Property details not available', type: 'error' });
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-blue-500">Messages</span>
          <div className="ml-auto flex items-center space-x-4">
            {/* Status Filter Dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Messages</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <img src="/api/placeholder/32/32" alt="User profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Message table card */}
      <div className="bg-white rounded-md shadow-sm mb-6 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-2 p-4 border-b">
          <div className="font-medium">Name</div>
          <div className="font-medium">Phone number / E-mail</div>
          <div className="font-medium">Enquired Property</div>
          <div className="font-medium">Message</div>
          <div className="font-medium text-center">Status</div>
        </div>

        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading enquiries...</div>
        ) : currentEnquiries.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No {statusFilter === 'all' ? '' : statusFilter} enquiries found.
          </div>
        ) : (
          currentEnquiries.map((enquiry) => (
            <div key={enquiry._id} className="grid grid-cols-5 gap-2 p-4 border-b items-center">
              <div className="text-gray-500">
                {enquiry.name || `${enquiry.userId?.firstName} ${enquiry.userId?.lastName}`}
              </div>
              <div className="text-gray-500">
                {enquiry.phoneNumber} / {enquiry.email}
              </div>
              <div>
                {enquiry.propertyId ? (
                  <button 
                    className="text-blue-500 hover:text-blue-700 hover:underline focus:outline-none"
                    onClick={() => handlePropertyClick(enquiry.propertyId)}
                  >
                    {enquiry.propertyId.address}
                  </button>
                ) : (
                  <span className="text-gray-500">No property</span>
                )}
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 truncate max-w-[150px]">{enquiry.message}</span>
              </div>

              <div className="text-center">
                {enquiry.isRead ? (
                  <span className="inline-flex items-center text-green-500">
                    <Check className="w-4 h-4 mr-1" /> Read
                  </span>
                ) : (
                  <button
                    className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                    onClick={() => handleMarkAsRead(enquiry._id)}
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm">
          <Download className="mr-2 w-4 h-4" />
          Download
        </button>

        <div className="flex items-center">
          <button
            className="p-2 text-gray-500"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex space-x-2 mx-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-md ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 shadow-sm'
                } flex items-center justify-center text-sm`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className="p-2 text-gray-500"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="ml-4 flex items-center border-l border-gray-200 pl-4">
            <button className="w-8 h-8 rounded-md bg-white text-gray-600 flex items-center justify-center text-sm shadow-sm">
              {enquiriesPerPage}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}