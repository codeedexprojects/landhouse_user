import { ArrowLeft, ArrowRight, Download, Eye, EyeOff, Filter } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getLoanEnquiries, homeLoanMarkAs } from '../../services/allApi/adminAllApis';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import 'jspdf-autotable';
import { toast } from 'react-hot-toast';

export default function HomeLoanEnquiry() {
  const [enquiryData, setEnquiryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [readFilter, setReadFilter] = useState('all'); // 'all', 'read', 'unread'
  const enquiriesPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLoanEnquiries();
        setEnquiryData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching loan enquiries:', error);
        toast.error('Failed to load enquiries');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Apply filters whenever readFilter or enquiryData changes
  useEffect(() => {
    let filtered = enquiryData;
    if (readFilter === 'read') {
      filtered = enquiryData.filter(enquiry => enquiry.isRead);
    } else if (readFilter === 'unread') {
      filtered = enquiryData.filter(enquiry => !enquiry.isRead);
    }
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [readFilter, enquiryData]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / enquiriesPerPage);
  const indexOfLastEnquiry = currentPage * enquiriesPerPage;
  const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;
  const currentEnquiries = filteredData.slice(indexOfFirstEnquiry, indexOfLastEnquiry);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Mark as read/unread function
  const toggleReadStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await homeLoanMarkAs(id, newStatus);

      // Update the local state
      setEnquiryData(prev => prev.map(enquiry =>
        enquiry._id === id ? { ...enquiry, isRead: newStatus } : enquiry
      ));

      toast.success(`Marked as ${newStatus ? 'read' : 'unread'}`);
    } catch (error) {
      console.error('Error updating read status:', error);
      toast.error('Failed to update status');
    }
  };

  // PDF Download function
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text('Home Loan Enquiries Report', 14, 15);

    // Current date and filter status
    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${date}`, 14, 22);
    doc.text(`Filter: ${readFilter === 'all' ? 'All' : readFilter === 'read' ? 'Read' : 'Unread'}`, 14, 28);

    // Table data
    const tableData = filteredData.map((enquiry) => [
      enquiry.name || 'N/A',
      enquiry.propertyId
        ? `${enquiry.propertyId.property_type}, ${enquiry.propertyId.cent} Cent`
        : 'N/A',
      enquiry.occupation || 'N/A',
      enquiry.typeOfLoan || 'N/A',
      enquiry.monthlySalary || 'N/A',
      enquiry.number || 'N/A',
      enquiry.isRead ? 'Read' : 'Unread'
    ]);

    // AutoTable
    autoTable(doc, {
      head: [['Name', 'Property', 'Occupation', 'Loan Type', 'Salary', 'Contact', 'Status']],
      body: tableData,
      startY: 35,
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
        0: { cellWidth: 20 }, // Name
        1: { cellWidth: 30 }, // Property
        2: { cellWidth: 20 }, // Occupation
        3: { cellWidth: 15 }, // Loan Type
        4: { cellWidth: 15 }, // Salary
        5: { cellWidth: 20 }, // Contact
        6: { cellWidth: 15 }  // Status
      }
    });

    // Save the PDF
    doc.save(`home_loan_enquiries_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  if (loading) {
    return (
      <div className="bg-blue-50 min-h-screen p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      {/* Breadcrumb */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-blue-500">Home Loan Enquiry</span>
          <div className="ml-auto flex items-center space-x-4">
            {/* Filter dropdown */}
            <div className="relative">
              <select
                value={readFilter}
                onChange={(e) => setReadFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Enquiries</option>
                <option value="read">Read Only</option>
                <option value="unread">Unread Only</option>
              </select>
              <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <img src="/api/placeholder/32/32" alt="User profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 gap-2 p-4 border-b">
          <div className="font-medium">Name</div>
          <div className="font-medium">Enquired Property</div>
          <div className="font-medium">Occupation</div>
          <div className="font-medium">Type of Loan</div>
          <div className="font-medium">Salary</div>
          <div className="font-medium">Contact Number</div>
          <div className="font-medium">Status</div>
        </div>

        {currentEnquiries.map((row, index) => (
          <div key={index} className="grid grid-cols-7 gap-2 p-4 border-b items-center">
            <div className="text-gray-500">{row.name}</div>
            <div className="text-blue-500">
              {row.propertyId
                ? `${row.propertyId.property_type}, ${row.propertyId.cent} Cent`
                : 'N/A'}
            </div>
            <div className="text-gray-500">{row.occupation}</div>
            <div className="text-gray-500">{row.typeOfLoan}</div>
            <div className="text-gray-500">{row.monthlySalary}</div>
            <div className="bg-green-100 text-green-800 rounded px-2 py-1 text-center">
              {row.number}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => toggleReadStatus(row._id, row.isRead)}
                className={`cursor-pointer px-4 py-1 rounded-md text-sm font-medium ${row.isRead ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}
                title={row.isRead ? 'Mark as unread' : 'Mark as read'}
              >
                {row.isRead ? 'Read' : 'Unread'}
              </button>
            </div>

          </div>
        ))}

        {filteredData.length === 0 && (
          <div className="text-center text-gray-500 p-4">
            No {readFilter === 'all' ? '' : readFilter} enquiries found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={downloadPDF}
          className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm hover:bg-gray-50"
        >
          <Download className="mr-2 w-4 h-4" />
          Download PDF
        </button>

        <div className="flex items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-2 text-gray-500 disabled:opacity-50 hover:bg-gray-100 rounded"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex space-x-2 mx-2">
            {[...Array(totalPages)].map((_, i) => {
              const pageNumber = i + 1;
              // Show only first, last, and pages around current page
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                Math.abs(pageNumber - currentPage) <= 1
              ) {
                return (
                  <button
                    key={i}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${currentPage === pageNumber
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-500 shadow-sm hover:bg-gray-50'
                      }`}
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
                  <span key={i} className="flex items-center justify-center text-gray-500">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-500 disabled:opacity-50 hover:bg-gray-100 rounded"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="ml-4 flex items-center border-l border-gray-200 pl-4">
            <span className="text-sm text-gray-600">
              Showing {filteredData.length > 0 ? indexOfFirstEnquiry + 1 : 0}-{Math.min(indexOfLastEnquiry, filteredData.length)} of {filteredData.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}