import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getLoanEnquiries } from '../../services/allApi/adminAllApis';

export default function HomeLoanEnquiry() {
  const [enquiryData, setEnquiryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const enquiriesPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLoanEnquiries();
      setEnquiryData(data);
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(enquiryData.length / enquiriesPerPage);
  const indexOfLastEnquiry = currentPage * enquiriesPerPage;
  const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;
  const currentEnquiries = enquiryData.slice(indexOfFirstEnquiry, indexOfLastEnquiry);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      {/* Breadcrumb */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-blue-500">Home Loan Enquiry</span>
          <div className="ml-auto">
            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <img src="/api/placeholder/32/32" alt="User profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="grid grid-cols-6 gap-2 p-4 border-b">
          <div className="font-medium">Name</div>
          <div className="font-medium">Enquired Property</div>
          <div className="font-medium">Occupation</div>
          <div className="font-medium">Type of Loan</div>
          <div className="font-medium">Salary</div>
          <div className="font-medium">Contact Number</div>
        </div>

        {currentEnquiries.map((row, index) => (
          <div key={index} className="grid grid-cols-6 gap-2 p-4 border-b">
            <div className="text-gray-500">{row.name}</div>
            <div className="text-blue-500">
              {row.propertyId
                ? `${row.propertyId.property_type}, ${row.propertyId.cent} Cent`
                : 'N/A'}
            </div>
            <div className="text-gray-500">{row.occupation}</div>
            <div className="text-gray-500">{row.typeOfLoan}</div>
            <div className="text-gray-500">{row.monthlySalary}</div>
            <div className="bg-green-100 text-green-800 rounded px-2 py-1">{row.number}</div>
          </div>
        ))}

        {enquiryData.length === 0 && (
          <div className="text-center text-gray-500 p-4">No enquiries found.</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm">
          <Download className="mr-2 w-4 h-4" />
          Download
        </button>

        <div className="flex items-center">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="p-2 text-gray-500 disabled:opacity-50">
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex space-x-2 mx-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageClick(i + 1)}
                className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${
                  currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 shadow-sm'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-2 text-gray-500 disabled:opacity-50">
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
