import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Download, Check } from 'lucide-react';
import { getEnquireis, markAsReadVendorEnquiry } from '../../services/allApi/vendorAllAPi';
import { Toast } from '../../Components/Toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

export default function EnquireVendor() {
  const [enquiries, setEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const enquiriesPerPage = 10;

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const vendorId = localStorage.getItem('vendorId');
        if (!vendorId) {
          setToast({ message: 'Vendor ID not found.', type: 'error' });
          return;
        }

        const response = await getEnquireis(vendorId);
        if (response && response.success && response.enquiries) {
          setEnquiries(response.enquiries); // Changed from response.data.enquiries to response.enquiries
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

  const indexOfLastEnquiry = currentPage * enquiriesPerPage;
  const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;
  const currentEnquiries = enquiries.slice(indexOfFirstEnquiry, indexOfLastEnquiry);
  const totalPages = Math.ceil(enquiries.length / enquiriesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsReadVendorEnquiry(id);
      setEnquiries((prev) =>
        prev.map((enq) => (enq._id === id ? { ...enq, isRead: true } : enq))
      );
      setToast({ message: 'Marked as read.', type: 'success' });
    } catch (error) {
      console.error(error);
      setToast({ message: 'Failed to mark as read.', type: 'error' });
    }
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(16);
    doc.text('Vendor Enquiries Report', 14, 15);
    
    // Current date
    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${date}`, 14, 22);
    
    // Table data
    const tableData = enquiries.map((enq) => [
      enq.name || 'N/A',
      enq.phoneNumber || 'N/A',
      enq.email || 'N/A',
      enq.propertyId 
        ? `${enq.propertyId.property_type}, ₹${enq.propertyId.property_price}` 
        : 'N/A',
      enq.message ? enq.message.substring(0, 50) + (enq.message.length > 50 ? '...' : '') : 'N/A',
      enq.isRead ? 'Read' : 'Unread'
    ]);

    // AutoTable
    doc.autoTable({
      head: [['Name', 'Phone', 'Email', 'Property', 'Message', 'Status']],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 9,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Name
        1: { cellWidth: 20 }, // Phone
        2: { cellWidth: 35 }, // Email
        3: { cellWidth: 30 }, // Property
        4: { cellWidth: 45 }, // Message
        5: { cellWidth: 15 }  // Status
      }
    });

    // Save the PDF
    doc.save(`vendor_enquiries_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

   const handlePropertyClick = (property) => {
    if (property) {
      navigate('/vendor/prop-details-vendor', { state: { property } });
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

      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-blue-500 font-semibold">Vendor Enquiries</span>
          <div className="ml-auto">
            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <img
                src="/api/placeholder/32/32"
                alt="Vendor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-md shadow-sm mb-6 overflow-hidden">
        <div className="grid grid-cols-5 gap-2 p-4 border-b">
          <div className="font-medium">Name</div>
          <div className="font-medium">Phone / Email</div>
          <div className="font-medium">Property</div>
          <div className="font-medium">Message</div>
          <div className="font-medium text-center">Status</div>
        </div>

        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading enquiries...</div>
        ) : currentEnquiries.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No enquiries found.</div>
        ) : (
          currentEnquiries.map((enq) => (
            <div
              key={enq._id}
              className="grid grid-cols-5 gap-2 p-4 border-b items-center"
            >
              <div className="text-gray-500 font-medium">{enq.name}</div>
              <div className="text-gray-500">
                {enq.phoneNumber} <br /> {enq.email}
              </div>
              <div>
                {/* 🟢 Modified property display to make it clickable */}
                {enq.propertyId ? (
                  <button 
                    className="text-blue-500 hover:text-blue-700 hover:underline focus:outline-none"
                    onClick={() => handlePropertyClick(enq.propertyId)}
                  >
                    {enq.propertyId.address}
                  </button>
                ) : (
                  <span className="text-gray-500">No property</span>
                )}
              </div>
              <div className="text-gray-500 truncate max-w-[150px]">
                {enq.message}
              </div>

              <div className="text-center">
                {enq.isRead ? (
                  <span className="inline-flex items-center text-green-500 text-sm">
                    <Check className="w-4 h-4 mr-1" /> Read
                  </span>
                ) : (
                  <button
                    onClick={() => handleMarkAsRead(enq._id)}
                    className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination & Download */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm hover:bg-gray-50"
          onClick={downloadAsPDF}
        >
          <Download className="mr-2 w-4 h-4" />
          Download PDF
        </button>

        <div className="flex items-center">
          <button
            className={`p-2 text-gray-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} rounded`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex space-x-2 mx-2">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              // Show only first, last, and pages around current page
              if (
                pageNumber === 1 || 
                pageNumber === totalPages || 
                Math.abs(pageNumber - currentPage) <= 1
              ) {
                return (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${
                      currentPage === pageNumber 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-500 shadow-sm hover:bg-gray-50'
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              }
              // Show ellipsis when skipping pages
              if (
                (pageNumber === 2 && currentPage > 3) || 
                (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return (
                  <span key={index} className="flex items-center justify-center text-gray-500">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            className={`p-2 text-gray-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} rounded`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="ml-4 flex items-center border-l border-gray-200 pl-4">
            <span className="text-sm text-gray-600">{enquiriesPerPage} per page</span>
          </div>
        </div>
      </div>
    </div>
  );
}