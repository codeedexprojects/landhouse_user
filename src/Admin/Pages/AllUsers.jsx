import { Download, ArrowLeft, ArrowRight, MoreVertical } from 'lucide-react';

export default function UserListingPage() {
  const users = [
    {
      id: 1,
      name: "Customer name",
      email: "customer@gmail.com",
      phone: "958562259",
      location: "Kerala",
      status: "Active"
    },
    {
      id: 2,
      name: "Customer name",
      email: "customer@gmail.com",
      phone: "958562259",
      location: "Kerala",
      status: "Active"
    },
    {
      id: 3,
      name: "Customer name",
      email: "customer@gmail.com",
      phone: "958562259",
      location: "Kerala",
      status: "Active"
    },
    {
      id: 4,
      name: "Customer name",
      email: "customer@gmail.com",
      phone: "958562259",
      location: "Kerala",
      status: "Active"
    },
  ];

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      {/* Top Breadcrumb Header */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span>Users</span>
          <span className="mx-2">/</span>
          <span className="text-blue-500">All Users</span>

          <div className="ml-auto">
            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <img src="/api/placeholder/32/32" alt="User profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Table and Filters */}
      <div className="overflow-x-auto bg-white rounded-md shadow-sm">
        {/* Top inside table - Title + Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Total Users</h2>

          <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
            <input
              type="text"
              placeholder="Search Users"
              className="border rounded-md px-3 py-2 text-sm w-48"
            />
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>Short by : Newest</option>
            </select>
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>Filter by : State</option>
            </select>
          </div>
        </div>

        {/* Table */}
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
              <th className="py-3 px-4 font-semibold">Location</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  {user.name}
                </td>
                <td className="py-3 px-4">{user.phone}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.location}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    {user.status}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <button>
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination and Download */}
      <div className="flex justify-between items-center mt-6">
        <button className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm">
          <Download className="mr-2 w-4 h-4" />
          Download
        </button>

        <div className="flex items-center">
          <button className="p-2 text-gray-500">
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex space-x-2 mx-2">
            <button className="w-8 h-8 rounded-md bg-blue-500 text-white flex items-center justify-center text-sm">1</button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">2</button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">3</button>
            <span className="flex items-center justify-center text-gray-500">...</span>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">10</button>
          </div>

          <button className="p-2 text-gray-500">
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="ml-4 flex items-center border-l border-gray-200 pl-4">
            <button className="w-8 h-8 rounded-md bg-white text-gray-600 flex items-center justify-center text-sm shadow-sm">10</button>
          </div>
        </div>
      </div>
    </div>
  );
}
