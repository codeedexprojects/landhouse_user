import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, Phone } from 'lucide-react';
import { getUserList, getVendors, overviewCounts, getAllProperties } from '../../../services/allApi/adminAllApis';
import EnquiryGraph from './EnquiryGraph';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const referredUsers = stats?.referredUsers || 0;
  const totalUsers = stats?.totalUsers || 1; // Avoid division by zero
  const referredPercentage = Math.round((referredUsers / totalUsers) * 100);
  const directUsers = totalUsers - referredUsers;
  const BASE_URL = "https://landouse-backend.onrender.com"
  const navigate = useNavigate()

  // Calculate degrees for conic-gradient
  const referredDegrees = (referredPercentage / 100) * 360;
  const [agents, setAgents] = useState([]);

  const handleSeeAllClick = () => {
    navigate('/admin/user-list')
  }

  const handleSeeRecentAgent = () => {
    navigate('/admin/view-agent')
  }

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesData = await getAllProperties();
        // Sort by latest created_at first
        propertiesData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setProperties(propertiesData);
      } catch (err) {
        setError('Failed to load properties');
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await getVendors();
        let agentData = response.data;

        // Sort by latest createdAt first
        agentData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setAgents(agentData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load agents');
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await overviewCounts();
        setStats(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const users = await getUserList();
        // Sort users by createdAt date (newest first)
        const sortedUsers = users.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt));
        setRecentUsers(sortedUsers.slice(0, 4));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchRecentUsers();
  }, []);

  const statsCards = [
    {
      title: 'Total Properties',
      value: stats?.totalProperties || '0',
      color: 'blue',
      percentage: stats ? Math.min(100, (stats.totalProperties / 50) * 100) : 0
    },
    {
      title: 'Vendor Properties',
      value: stats?.vendorProperties || '0',
      color: 'green',
      percentage: stats ? Math.min(100, (stats.vendorProperties / stats.totalProperties) * 100) : 0
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || '0',
      color: 'purple',
      percentage: stats ? Math.min(100, (stats.totalUsers / 20) * 100) : 0
    },
    {
      title: 'Total Vendors',
      value: stats?.totalVendors || '0',
      color: 'pink',
      percentage: stats ? Math.min(100, (stats.totalVendors / 10) * 100) : 0
    },
  ];

  const months = [...Array(13).keys()];
  const barValues = [0.2, 0.5, 0.9, 2.5, 1.8, 1.6, 2.2, 1.8, 2.4, 2.6, 2.4, 2.8];

  // Navigation functions for property carousel
  const nextProperty = () => {
    if (properties.length > 0) {
      setCurrentPropertyIndex((prevIndex) =>
        prevIndex === properties.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevProperty = () => {
    if (properties.length > 0) {
      setCurrentPropertyIndex((prevIndex) =>
        prevIndex === 0 ? properties.length - 1 : prevIndex - 1
      );
    }
  };

  // Format the property address
  const formatAddress = (address) => {
    if (!address) return "";
    return address.length > 30 ? address.substring(0, 30) + "..." : address;
  };

  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto bg-blue-100 p-4">
        <div className="flex justify-center items-center h-64">
          <p>Loading dashboard data...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 overflow-y-auto bg-blue-100 p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading dashboard: {error}
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto bg-blue-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {statsCards.map((card, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-gray-600 mb-1">{card.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{card.value}</span>
              <div
                className="w-12 h-12 rounded-full border-4 flex items-center justify-center"
                style={{
                  borderColor: card.color === 'blue' ? '#3B82F6' :
                    card.color === 'green' ? '#10B981' :
                      card.color === 'purple' ? '#8B5CF6' :
                        '#EC4899',
                  borderRightColor: 'transparent',
                  transform: `rotate(${card.percentage * 3.6}deg)`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* <div className="bg-white p-4 rounded-lg shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-medium">Total Enquiry</h3>
              <p className="text-xl font-bold">2345</p>
            </div>
            <div className="flex items-center">
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mr-2">
                1.2% from last day
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded">
                  Week
                </button>
                <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded">
                  Monthly
                </button>
                <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                  Yearly
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 h-48">
            <div className="flex items-end h-full space-x-1 px-2">
              {months.slice(1).map((_, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t-sm"
                    style={{
                      height: `${barValues[index] * 40}px`,
                      minHeight: '2px'
                    }}
                  />
                  <span className="text-xs mt-1 text-gray-500">{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        <EnquiryGraph />
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-4">Recent Users</h3>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : (
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user._id} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                    {user.firstName.charAt(0)}{user.lastName?.charAt(0) || ''}
                  </div>
                  <div>
                    <p className="font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.invitedBy ?
                        `Referred by ${user.invitedBy.referralCode}` :
                        'Direct signup'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button onClick={handleSeeAllClick} className="text-blue-500 text-sm w-full text-center mt-4 cursor-pointer">
            See All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-4">Recent Property</h3>
          {properties.length > 0 ? (
            <div className="relative">
              <img
                src={properties[currentPropertyIndex]?.photos?.[0]?.replace(/\\/g, '/') || '/api/placeholder/400/200'}
                alt="Property"
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/api/placeholder/400/200";
                }}
              />


              <div className="mt-2">
                <h4 className="font-medium">{properties[currentPropertyIndex]?.property_type || 'Property'}</h4>
                <p className="text-sm text-gray-600">
                  {properties[currentPropertyIndex]?.beds || 0} BHK · {formatAddress(properties[currentPropertyIndex]?.address)}
                </p>
                <p className="text-sm font-medium text-blue-600 mt-1">
                  ₹{properties[currentPropertyIndex]?.property_price?.toLocaleString() || '0'}
                </p>
                {/* <div className="flex mt-2">
                  <button className="flex items-center bg-blue-100 text-blue-500 py-1 px-2 rounded text-xs mr-2">
                    <MessageSquare size={14} className="mr-1" /> {Math.floor(Math.random() * 10)}
                  </button>
                  <button className="flex items-center bg-blue-100 text-blue-500 py-1 px-2 rounded text-xs">
                    <Phone size={14} className="mr-1" /> {Math.floor(Math.random() * 10)}
                  </button>
                </div> */}
              </div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2">
                <button
                  className="bg-white rounded-full p-1 shadow"
                  onClick={prevProperty}
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2">
                <button
                  className="bg-white rounded-full p-1 shadow"
                  onClick={nextProperty}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No properties available
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">User and referral user</h3>
            <div className="bg-gray-100 text-xs px-2 py-1 rounded">
              <span className="font-medium">{referredUsers}</span>
              <span className="text-gray-500"> {referredPercentage}%</span>
            </div>
          </div>

          <div className="relative h-56 w-56 mx-auto">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `conic-gradient(
              #8B5CF6 0deg ${referredDegrees}deg, 
              #06B6D4 ${referredDegrees}deg 360deg
            )`
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white w-32 h-32 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold">{referredUsers}</p>
                  <p className="text-xs text-gray-500">{referredPercentage}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-sm mr-2" />
              <span className="text-sm">
                Referred user ({referredUsers})
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cyan-500 rounded-sm mr-2" />
              <span className="text-sm">
                Direct user ({directUsers})
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-4">Recent Agent</h3>
          <div className="space-y-4">
            {agents.slice(0, 4).map((agent) => (
              <div key={agent._id} className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                  {agent.name.charAt(0)}{agent.name?.charAt(0) || ''}
                </div>
                <div>
                  <p className="font-medium">{agent.name}</p>
                  <p className="text-xs text-gray-500">Referred by Admin</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleSeeRecentAgent} className="cursor-pointer text-blue-500 text-sm w-full text-center mt-4">
            See All
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;