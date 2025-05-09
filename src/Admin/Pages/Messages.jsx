import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Download, Check } from 'lucide-react'; // 🟢 added Check icon
import { getEnquireis, markAsReadEnquiry } from '../../services/allApi/adminAllApis'; // 🟢 import API
import { Toast } from '../../Components/Toast';

export default function MessageList() {
  const [enquiries, setEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const enquiriesPerPage = 10;

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await getEnquireis();
        if (response && response.data && response.data.enquiries) {
          setEnquiries(response.data.enquiries);
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

  // Pagination calculation
  const indexOfLastEnquiry = currentPage * enquiriesPerPage;
  const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;
  const currentEnquiries = enquiries.slice(indexOfFirstEnquiry, indexOfLastEnquiry);
  const totalPages = Math.ceil(enquiries.length / enquiriesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // 🟢 NEW: function to mark enquiry as read
  const handleMarkAsRead = async (id) => {
    try {
      await markAsReadEnquiry(id);
      // Update enquiries locally
      setEnquiries((prevEnquiries) =>
        prevEnquiries.map((enq) =>
          enq._id === id ? { ...enq, isRead: true } : enq
        )
      );
      setToast({ message: 'Enquiry marked as read.', type: 'success' });
    } catch (error) {
      console.error(error);
      setToast({ message: 'Failed to mark as read.', type: 'error' });
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
          <div className="ml-auto">
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
          {/* 🟢 added extra column */}
          <div className="font-medium">Name</div>
          <div className="font-medium">Phone number / E-mail</div>
          <div className="font-medium">Enquired Property</div>
          <div className="font-medium">Message</div>
          <div className="font-medium text-center">Status</div>
        </div>

        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading enquiries...</div>
        ) : currentEnquiries.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No enquiries found.</div>
        ) : (
          currentEnquiries.map((enquiry) => (
            <div key={enquiry._id} className="grid grid-cols-5 gap-2 p-4 border-b items-center">
              <div className="text-gray-500">
                {enquiry.name || `${enquiry.userId?.firstName} ${enquiry.userId?.lastName}`}
              </div>
              <div className="text-gray-500">
                {enquiry.phoneNumber} / {enquiry.email}
              </div>
              <div className="text-blue-500">
                {enquiry.propertyId ? enquiry.propertyId.address : 'No property'}
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 truncate max-w-[150px]">{enquiry.message}</span>
                {/* <a href="#" className="text-blue-400 ml-1">read more...</a> */}
              </div>

              {/* 🟢 NEW status/action column */}
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
