import { useEffect, useState } from 'react';
import { Download, ArrowLeft, ArrowRight, MoreVertical, Eye, Trash2 } from 'lucide-react';
import { getUserList, deleteUser } from '../../services/allApi/adminAllApis';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import 'jspdf-autotable';

export default function UserListingPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const usersPerPage = 10;

  const downloadAsPDF = () => {
    try {
      const doc = new jsPDF();
  
      // Title
      doc.setFontSize(16);
      doc.text("Users Report", 14, 15);
  
      // Prepare table data
      const tableData = currentUsers.map((user, index) => [
        (indexOfFirstUser + index + 1).toString(), // Sl No
        `${user.firstName} ${user.lastName}` || "N/A", // Customer
        user.phoneNumber || "N/A", // Phone Number
        user.email || "N/A", // Email
        user.address || "N/A", // Address
        user.isActive ? "Active" : "Inactive" // Status
      ]);
  
      // Add table using jspdf-autotable
      autoTable(doc, {
        head: [['Sl No', 'Customer', 'Phone Number', 'Email', 'Address', 'Status']],
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
      doc.save(`users_report_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };
  
  const navigate = useNavigate();

  const handleUserClick = (id) => {
    navigate(`/admin/user-details/${id}`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchTerm, filterStatus, users]);

  const fetchUsers = async () => {
    const data = await getUserList();
    setUsers(data);
    setFilteredUsers(data);
  };

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
    setActiveDropdown(null); // Close dropdown when opening modal
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(userToDelete);
      if (response && response.status === 200) {
        toast.success('User deleted successfully');
        fetchUsers();
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      toast.error('Error deleting user');
      console.error(error);
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const handleSearchAndFilter = () => {
    let updatedUsers = [...users];

    // Search - now includes phone number
    if (searchTerm) {
      updatedUsers = updatedUsers.filter(
        (u) =>
          u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.phoneNumber?.includes(searchTerm) // Add phone number search
      );
    }

    // Filter
    if (filterStatus !== 'All') {
      const isActive = filterStatus === 'Active';
      updatedUsers = updatedUsers.filter((u) => u.isActive === isActive);
    }

    setFilteredUsers(updatedUsers);
    setCurrentPage(1); // Reset to first page on search/filter
  };


  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span>Users</span>
          <span className="mx-2">/</span>
          <span className="text-blue-500">All Users</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-md shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Total Users ({filteredUsers.length})</h2>

        <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm w-48 md:w-64"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="All">Filter by: All</option>
            <option value="Active">Filter by: Active</option>
            <option value="Inactive">Filter by: Inactive</option>
          </select>
        </div>
      </div>

        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 font-semibold">Sl No</th>
              <th className="py-3 px-4 font-semibold">Customer</th>
              <th className="py-3 px-4 font-semibold">Phone Number</th>
              <th className="py-3 px-4 font-semibold">Email</th>
              <th className="py-3 px-4 font-semibold">Address</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{indexOfFirstUser + index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    {user.firstName.charAt(0)}
                  </div>
                  {user.firstName} {user.lastName}
                </td>
                <td className="py-3 px-4">{user.phoneNumber}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.address}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </div>
                </td>
                <td className="py-3 px-4 text-center relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === user._id ? null : user._id)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <MoreVertical size={18} className="cursor-pointer" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {activeDropdown === user._id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleUserClick(user._id);
                            setActiveDropdown(null);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user._id)}
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete User
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
       
      </div>
      <div className="flex justify-between items-center p-4">
          <button onClick={downloadAsPDF} className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm">
            <Download className="mr-2 w-4 h-4" />
            Download
          </button>

          <div className="flex items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 text-gray-500 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex space-x-2 mx-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;

                // Only show first, last, current, and neighbors
                if (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-md ${
                        page === currentPage
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-500'
                      } flex items-center justify-center text-sm shadow-sm`}
                    >
                      {page}
                    </button>
                  );
                }

                // Show ellipsis after first or before last
                if (
                  (page === 2 && currentPage > 3) ||
                  (page === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return (
                    <span
                      key={page}
                      className="flex items-center justify-center text-gray-500"
                    >
                      ...
                    </span>
                  );
                }

                return null;
              })}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="p-2 text-gray-500 disabled:opacity-50"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="ml-4 flex items-center border-l border-gray-200 pl-4">
              <button className="w-8 h-8 rounded-md bg-white text-gray-600 flex items-center justify-center text-sm shadow-sm">
                {usersPerPage}
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}