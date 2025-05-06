import { useEffect, useState } from 'react';
import { Download, ArrowLeft, ArrowRight, MoreVertical } from 'lucide-react';
import { getUserList } from '../../services/allApi/adminAllApis';
import { useNavigate } from 'react-router-dom';



export default function UserListingPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;


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

  const handleSearchAndFilter = () => {
    let updatedUsers = [...users];

    // Search
    if (searchTerm) {
      updatedUsers = updatedUsers.filter(
        (u) =>
          u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
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
              placeholder="Search Users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm w-48"
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
              <th className="p-4">
                <input type="checkbox" />
              </th>
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
              <tr key={user._id} className="border-t">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
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
                <td className="py-3 px-4 text-center">
  <button onClick={() => handleUserClick(user._id)}>
    <MoreVertical size={18} className="cursor-pointer" />
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>

    


      </div>
          {/* Pagination */}
          <div className="flex justify-between items-center p-4">
  <button className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm">
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
