import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../services/baseUrl';

export default function UserDetailsPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL_IMG = "https://landouse-backend.onrender.com"

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('admintoken');
      try {
        const response = await axios.get(`${BASE_URL}/admin/user/view/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!userData) return <div className="p-4">User not found</div>;

  const { user, referredUsers = [], latestEnquiry } = userData;

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span>User</span>
          <span className="mx-2">/</span>
          <span className="text-blue-500">User details</span>
          <div className="ml-auto">
            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <img
                src={user?.profileImage || "/api/placeholder/32/32"}
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left - User Details */}
        <div className="w-full lg:w-7/12">
          <div className="bg-white rounded-md shadow-sm mb-4">
            <h2 className="text-lg font-medium p-4">User Details</h2>
            <div className="p-4 flex items-center border-t border-gray-100">
              <div className="mr-6">
                <img
                  src={user?.profileImage || "/api/placeholder/100/100"}
                  alt="User"
                  className="w-24 h-24 rounded-md object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {(user?.firstName || "Unnamed") + " " + (user?.lastName || "")}
                </h3>
                <p className="text-gray-500 text-sm">Referral ID: {user?.referralId || "N/A"}</p>
                <p className="text-gray-600 mt-2 text-sm">{user?.address || "No address available"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md shadow-sm">
            <h2 className="text-lg font-medium p-4">Personal Information</h2>
            <div className="p-4 border-t border-gray-100 grid grid-cols-1 gap-4">
              <div>
                <p className="text-gray-500 text-sm">User Name</p>
                <p className="font-medium">{(user?.firstName || "Unnamed") + " " + (user?.lastName || "")}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phone Number</p>
                <p className="font-medium">{user?.phoneNumber || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email ID</p>
                <p className="font-medium">{user?.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Referral ID</p>
                <p className="font-medium">{user?.referralId || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Address</p>
                <p className="font-medium">{user?.address || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Latest Enquiry & Referred Users */}
        <div className="w-full lg:w-5/12">
          {/* Latest Enquiry */}
          <div className="bg-white rounded-md shadow-sm mb-4">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-medium">Latest Enquiry</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm flex items-center">
                  Newest <ChevronDown className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>

            {latestEnquiry ? (
              <div className="p-4 border-t border-gray-100">
                <div className="flex">
                  <div className="flex-grow pr-4">
                    <h3 className="text-blue-500 text-sm font-medium">
                      {latestEnquiry.propertyId?.property_type || 'Property'} - {latestEnquiry.propertyId?.address || 'Location'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Enquiry from: {latestEnquiry.name || latestEnquiry.email}
                    </p>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <div className="text-center">
                        <span className="text-blue-500 font-medium">
                          {latestEnquiry.propertyId?.baths || 'N/A'}
                        </span> 🛁
                      </div>
                      <div className="text-center">
                        <span className="text-blue-500 font-medium">
                          {latestEnquiry.propertyId?.beds || 'N/A'}
                        </span> 🛏️
                      </div>
                      <div className="text-center">
                        <span className="text-blue-500 font-medium">
                          {latestEnquiry.propertyId?.area || 'N/A'}
                        </span> sqft
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <p className="text-gray-500">Message:</p>
                      <p className="text-gray-700">{latestEnquiry.message || 'No message provided'}</p>
                    </div>
                    <button className="mt-3 bg-blue-500 text-white w-full py-2 rounded-md text-sm">
                      View Enquiry Details
                    </button>
                  </div>
                  {latestEnquiry.propertyId?.photos?.length > 0 ? (
                    <div className="w-24 h-24">
                      <img
                        src={latestEnquiry.propertyId.photos && latestEnquiry.propertyId.photos.length > 0
                          ? latestEnquiry.propertyId.photos[0].replace(/\\/g, '/')
                          : '/path/to/placeholder.jpg'}
                        alt="Property"
                        className="w-full h-full object-cover rounded-md"
                      />

                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 border-t border-gray-100 text-center text-gray-500">
                No enquiries found
              </div>
            )}
          </div>

          {/* Referred Users */}
          <div className="bg-white rounded-md shadow-sm">
            <h2 className="text-lg font-medium p-4">Referred Users</h2>
            <div className="p-4 border-t border-gray-100 space-y-4">
              {referredUsers.length > 0 ? (
                <>
                  {referredUsers.map((ref, index) => (
                    <div key={ref.id} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-gray-600 text-xs">
                          {ref.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-sm">{ref.name}</p>
                        <p className="text-gray-500 text-xs">
                          {ref.property || 'No property specified'}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {ref.email}
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 text-center">
                    <button className="text-blue-500 text-sm font-medium">
                      See All ({referredUsers.length})
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No referred users found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}