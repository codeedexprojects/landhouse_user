import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAffiliates, updateAffiliate } from '../../services/allApi/adminAllApis';
import { toast } from 'react-hot-toast';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import 'jspdf-autotable';

export default function Affiliates() {
  const navigate = useNavigate();
  const [affiliatesData, setAffiliatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleAddAffliates = () => {
    navigate('/admin/create-coupon');
  };

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        const data = await getAffiliates();
        setAffiliatesData(data.affiliates || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch affiliates');
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliates();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = affiliatesData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(affiliatesData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (id, currentAmount) => {
    setEditingId(id);
    setEditAmount(currentAmount);
  };

  const handleAmountChange = (e) => {
    setEditAmount(e.target.value);
  };

  const handleApprovalToggle = async (id, currentStatus) => {
    try {
      const updatedData = { isApproved: !currentStatus };
      const response = await updateAffiliate(id, updatedData);
      
      if (response) {
        setAffiliatesData(prev => 
          prev.map(item => 
            item._id === id ? { ...item, isApproved: !currentStatus } : item
          )
        );
        toast.success(`Affiliate ${!currentStatus ? 'approved' : 'disapproved'} successfully`);
      }
    } catch (error) {
      toast.error('Failed to update approval status');
      console.error('Update error:', error);
    }
  };

  const handleSaveClick = async (id) => {
    if (!editAmount || isNaN(editAmount)) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      const updatedData = { amount: Number(editAmount) };
      const response = await updateAffiliate(id, updatedData);
      
      if (response) {
        setAffiliatesData(prev => 
          prev.map(item => 
            item._id === id ? { ...item, amount: Number(editAmount) } : item
          )
        );
        toast.success('Amount updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update amount');
      console.error('Update error:', error);
    } finally {
      setEditingId(null);
      setEditAmount('');
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditAmount('');
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    doc.text("Affiliates Report", 14, 15);
    
    const tableData = affiliatesData.map(affiliate => [
      affiliate.name || "N/A",
      affiliate.referralId || "N/A",
      affiliate.userCount || "0",
      affiliate.isApproved ? "Approved" : "Pending",
      affiliate.amount ? `₹${affiliate.amount.toLocaleString()}` : "₹0"
    ]);

    autoTable(doc, {
      head: [['Name', 'Referral ID', 'User Count', 'Status', 'Amount']],
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

    doc.save(`affiliates_report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  if (loading) {
    return <div className="bg-blue-50 min-h-screen p-4 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="bg-blue-50 min-h-screen p-4 flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      {/* Header with navigation and button */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-blue-500">Affiliates</span>

          <div className="ml-auto flex items-center space-x-3">
            <button 
              onClick={handleAddAffliates} 
              className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-2 rounded-md"
            >
              Add Affiliates
            </button>
          </div>
        </div>
      </div>

      {/* Content card */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Card header */}
        <div className="p-5 border-b">
          <h2 className="text-lg font-medium">Affiliates</h2>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-6 gap-2 p-4 border-b">
          <div className="font-medium">SI No</div>
          <div className="font-medium">Affiliates</div>
          <div className="font-medium">Referral ID</div>
          <div className="font-medium">User count</div>
          <div className="font-medium">Status</div>
          <div className="font-medium">Amount</div>
        </div>

        {/* Table Rows */}
        {currentItems.length > 0 ? (
          currentItems.map((row, index) => (
            <div key={row._id} className="grid grid-cols-6 gap-2 p-4 border-b items-center">
              <div className="text-gray-500">{(currentPage - 1) * itemsPerPage + index + 1}</div>
              <div className="text-gray-600">{row.name}</div>
              <div className="text-gray-600">{row.referralId}</div>
              <div className="text-gray-600">{row.userCount}</div>
              <div>
                <button
                  onClick={() => handleApprovalToggle(row._id, row.isApproved)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    row.isApproved 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                >
                  {row.isApproved ? 'Approved' : 'Pending'}
                </button>
              </div>
              <div>
                {editingId === row._id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editAmount}
                      onChange={handleAmountChange}
                      className="w-24 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                    />
                    <button
                      onClick={() => handleSaveClick(row._id)}
                      className="p-1 text-green-600 hover:text-green-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
                      ₹{row.amount || 0}
                    </span>
                    <button
                      onClick={() => handleEditClick(row._id, row.amount)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No affiliates found</div>
        )}

        {/* Pagination */}
        
      </div>
      <div className="flex justify-between items-center p-4 border-t">
          <button 
            onClick={downloadAsPDF}
            className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm"
          >
            <Download className="mr-2 w-4 h-4" />
            Download
          </button>

          <div className="flex items-center">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 text-gray-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            <div className="flex space-x-2 mx-2">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`w-8 h-8 rounded-md ${
                      currentPage === pageNumber 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-500'
                    } flex items-center justify-center text-sm shadow-sm`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="flex items-center justify-center text-gray-500">...</span>
                  <button
                    onClick={() => paginate(totalPages)}
                    className={`w-8 h-8 rounded-md ${
                      currentPage === totalPages 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-500'
                    } flex items-center justify-center text-sm shadow-sm`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 text-gray-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="ml-4 flex items-center border-l border-gray-200 pl-4">
              <button className="w-8 h-8 rounded-md bg-white text-gray-600 flex items-center justify-center text-sm shadow-sm">
                {itemsPerPage}
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}