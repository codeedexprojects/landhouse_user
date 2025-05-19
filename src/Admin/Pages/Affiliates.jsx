import { ArrowLeft, ArrowRight, Download, Eye } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAffiliates, updateAffiliate, getRecentAffliateUsers, } from '../../services/allApi/adminAllApis';
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
  const [showModal, setShowModal] = useState(false);
  const [referredUsers, setReferredUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  const [selectedAffiliateId, setSelectedAffiliateId] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userEditAmount, setUserEditAmount] = useState('');

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

  const handleViewUsers = async (id, name) => {
    setLoadingUsers(true);
    setSelectedAffiliate(name);
    setSelectedAffiliateId(id);
    try {
      const response = await getRecentAffliateUsers(id);
      if (response && response.referredUsers) {
        // Find the current affiliate to get userAmounts
        const currentAffiliate = affiliatesData.find(a => a._id === id);

        // Enhance users with their assigned amounts if available
        const enhancedUsers = response.referredUsers.map(user => {
          const userAmount = currentAffiliate?.userAmounts?.[user._id] || 0;

          return {
            ...user,
            assignedAmount: userAmount
          };
        });

        setReferredUsers(enhancedUsers);
        setShowModal(true);
      } else {
        toast.error('Failed to fetch referred users');
      }
    } catch (error) {
      console.error('Error fetching referred users:', error);
      toast.error('Failed to fetch referred users');
    } finally {
      setLoadingUsers(false);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = affiliatesData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(affiliatesData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (id, currentAmount) => {
    setEditingId(id);
    setEditAmount(currentAmount || '');
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

  // New function to handle editing a specific user's amount
  const handleEditUserAmount = (userId, currentAmount) => {
    setEditingUserId(userId);
    setUserEditAmount(currentAmount || '');
  };

  // New function to handle canceling edit of user amount
  const handleCancelUserEdit = () => {
    setEditingUserId(null);
    setUserEditAmount('');
  };

  // New function to save a specific user's amount
  const handleSaveUserAmount = async (userId) => {
    if (!userEditAmount || isNaN(userEditAmount)) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      // Make API call to update specific user amount
      const response = await updateAffiliate(selectedAffiliateId, {
        userId,
        amount: Number(userEditAmount)
      });

      if (response) {
        // Update referred users list with new amount
        setReferredUsers(prev =>
          prev.map(user =>
            user._id === userId ? { ...user, assignedAmount: Number(userEditAmount) } : user
          )
        );

        // Update the main affiliates data with new total
        if (response.details && response.affiliate) {
          setAffiliatesData(prev =>
            prev.map(item =>
              item._id === selectedAffiliateId ? {
                ...item,
                amount: response.details.totalAffiliatePayout,
                userAmounts: {
                  ...item.userAmounts,
                  [userId]: Number(userEditAmount)
                }
              } : item
            )
          );
        }

        toast.success('User amount updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update user amount');
      console.error('Update error:', error);
    } finally {
      setEditingUserId(null);
      setUserEditAmount('');
    }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
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
        <div className="grid grid-cols-8 gap-2 p-4 border-b">
          <div className="font-medium">SI No</div>
          <div className="font-medium">Affiliates</div>
          <div className="font-medium">Number</div>
          <div className="font-medium">Referral ID</div>
          <div className="font-medium">User count</div>
          <div className="font-medium">View Users</div>
          <div className="font-medium">Status</div>
          <div className="font-medium">Total Amount</div>
        </div>

        {/* Table Rows */}
        {currentItems.length > 0 ? (
          currentItems.map((row, index) => (
            <div key={row._id} className="grid grid-cols-8 gap-2 p-4 border-b items-center">
              <div className="text-gray-500">{(currentPage - 1) * itemsPerPage + index + 1}</div>
              <div className="text-gray-600">{row.name}</div>
              <div className="text-gray-600">{row.number || '—'}</div>
              <div className="text-gray-600">{row.referralId}</div>
              <div className="text-gray-600">{row.userCount || 0}</div>
              <div>
                <button
                  onClick={() => handleViewUsers(row._id, row.name)}
                  className="flex items-center justify-center p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleApprovalToggle(row._id, row.isApproved)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${row.isApproved
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                    }`}
                >
                  {row.isApproved ? 'Approved' : 'Pending'}
                </button>
              </div>
              <div>
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
                  ₹{row.amount || 0}
                </span>
              </div>

            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No affiliates found</div>
        )}
      </div>

      {/* Pagination */}
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
                  className={`w-8 h-8 rounded-md ${currentPage === pageNumber
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
                  className={`w-8 h-8 rounded-md ${currentPage === totalPages
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

      {/* Modal for viewing users */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Users referred by {selectedAffiliate}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {loadingUsers ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : referredUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined On</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {referredUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.referralId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {editingUserId === user._id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={userEditAmount}
                                onChange={(e) => setUserEditAmount(e.target.value)}
                                className="w-20 p-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                              />
                              <button
                                onClick={() => handleSaveUserAmount(user._id)}
                                className="p-1 text-green-600 hover:text-green-800"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <button
                                onClick={handleCancelUserEdit}
                                className="p-1 text-red-600 hover:text-red-800"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md">
                                ₹{user.assignedAmount || 0}
                              </span>
                              <button
                                onClick={() => handleEditUserAmount(user._id, user.assignedAmount)}
                                className="p-1 text-blue-600 hover:text-blue-800"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-10 text-center text-gray-500">
                No users found for this affiliate.
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}