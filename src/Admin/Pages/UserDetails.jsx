import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../services/baseUrl';

export default function UserDetailsPage() {
  const { id } = useParams(); 
  // console.log(id);
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('admintoken');
      try {
        const response = await axios.get(`${BASE_URL}/admin/user/view/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user); // Assuming the API returns full user object
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to load user details");
      }
    };

    fetchUser();
  }, [id]);

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!user) return <div className="p-4">Loading...</div>;

  // Dummy fallback data (until you implement dynamic versions)
  const recentlyViewed = {
    title: "Single Family Residency, 4 Cent",
    location: "Palakkad, Kerala",
    bedrooms: 4,
    bathrooms: 2,
    sqft: 25544
  };

  const referrals = [
    { name: "Brooklyn Simmons", referredBy: "Krishtin", imgIndex: 1 },
    { name: "Musafir", referredBy: "Mashi", imgIndex: 2 },
    { name: "Shafeek ali", referredBy: "Fathima", imgIndex: 3 },
    { name: "Abhilash", referredBy: "Fathima", imgIndex: 4 },
    { name: "Aravind", referredBy: "Fathima", imgIndex: 5 }
  ];

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
              <img src="/api/placeholder/32/32" alt="User profile" className="w-full h-full object-cover" />
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
  </h3>                <p className="text-gray-500 text-sm">ID-{user?._id || "N/A"}</p>
                <p className="text-gray-600 mt-2 text-sm">{user?.address || "No address available"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md shadow-sm">
            <h2 className="text-lg font-medium p-4">Personal Information</h2>
            <div className="p-4 border-t border-gray-100 grid grid-cols-1 gap-4">
              <div>
                <p className="text-gray-500 text-sm">User Name</p>
                <p className="font-medium">  {(user?.firstName || "Unnamed") + " " + (user?.lastName || "")}</p>
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
                <p className="text-gray-500 text-sm">Location</p>
                <p className="font-medium">{user?.address || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Address</p>
                <p className="font-medium">{user?.address || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Recently Viewed & Referred */}
        <div className="w-full lg:w-5/12">
          {/* Recently Viewed */}
          <div className="bg-white rounded-md shadow-sm mb-4">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-medium">Recently Viewed</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm flex items-center">
                  Newest <ChevronDown className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100">
              <div className="flex">
                <div className="flex-grow pr-4">
                  <h3 className="text-blue-500 text-sm font-medium">{recentlyViewed.title}</h3>
                  <p className="text-blue-500 text-sm">{recentlyViewed.location}</p>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <div className="text-center">
                      <span className="text-blue-500 font-medium">{recentlyViewed.bathrooms}</span> 🛁
                    </div>
                    <div className="text-center">
                      <span className="text-blue-500 font-medium">{recentlyViewed.bedrooms}</span> 🛏️
                    </div>
                    <div className="text-center">
                      <span className="text-blue-500 font-medium">{recentlyViewed.sqft}</span> sqft
                    </div>
                  </div>
                  <button className="mt-3 bg-blue-500 text-white w-full py-2 rounded-md text-sm">
                    View Property
                  </button>
                </div>
                <div className="w-24 h-24">
                  <img src="/api/placeholder/100/100" alt="Property" className="w-full h-full object-cover rounded-md" />
                </div>
              </div>
            </div>
          </div>

          {/* Referred Users */}
          <div className="bg-white rounded-md shadow-sm">
            <h2 className="text-lg font-medium p-4">Referred</h2>
            <div className="p-4 border-t border-gray-100 space-y-4">
              {referrals.map((ref, index) => (
                <div key={index} className="flex items-center">
                  <img
                    src={`/api/placeholder/${30 + index}/${30 + index}`}
                    alt={ref.name}
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium text-sm">{ref.name}</p>
                    <p className="text-gray-500 text-xs">Referred by {ref.referredBy}</p>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <button className="text-blue-500 text-sm font-medium">See All</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
