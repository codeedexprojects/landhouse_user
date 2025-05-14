import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, Banknote, FileText, Copy } from 'lucide-react';
import { toast } from 'react-toastify';
import { getGraphData, getProfile, getRecentUser } from '../../../services/allApi/affiliateAllApi';

export default function AffiliateDashboard() {
  const [activeTimeframe, setActiveTimeframe] = useState('monthly');
  const [profileData, setProfileData] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    claimedAmount: 0,
    weeklyGrowth: 0
  });

  // Get affiliate ID from localStorage
  const affiliateId = localStorage.getItem('affiliateId');

  useEffect(() => {
    if (affiliateId) {
      fetchDashboardData();
    }
  }, [affiliateId, activeTimeframe]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch profile data
      const profileResponse = await getProfile(affiliateId);
      if (profileResponse && profileResponse.affiliate) {
        setProfileData(profileResponse.affiliate);
        setStats(prev => ({
          ...prev,
          claimedAmount: profileResponse.affiliate.amount || 0,
          referralId: profileResponse.affiliate.referralId
        }));
      }

      // Fetch recent users
      const recentUsersResponse = await getRecentUser(affiliateId);
      if (recentUsersResponse && recentUsersResponse.referredUsers) {
        setRecentUsers(recentUsersResponse.referredUsers);
        setStats(prev => ({
          ...prev,
          totalUsers: recentUsersResponse.referredUsers.length
        }));
      }

      // Fetch graph data based on active timeframe
      const graphResponse = await getGraphData(`${affiliateId}?period=${activeTimeframe}`);
      if (graphResponse && graphResponse.referredUsers) {
        // Transform the data for the chart
        const transformedData = transformGraphData(graphResponse.referredUsers, activeTimeframe);
        setChartData(transformedData);
        setStats(prev => ({
          ...prev,
          weeklyGrowth: graphResponse.referredCount || 0
        }));
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Transform API data to chart format
  const transformGraphData = (users, timeframe) => {
    // Group by time period (month, week, etc.)
    const groupedData = users.reduce((acc, user) => {
      const date = new Date(user.createdAt);
      let periodKey;
      
      if (timeframe === 'monthly') {
        periodKey = date.toLocaleString('default', { month: 'short' }).toLowerCase();
      } else if (timeframe === 'weekly') {
        // Get week number
        const oneJan = new Date(date.getFullYear(), 0, 1);
        const weekNumber = Math.ceil(((date - oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
        periodKey = `week ${weekNumber}`;
      } else { // yearly
        periodKey = date.getFullYear();
      }
      
      if (!acc[periodKey]) {
        acc[periodKey] = 0;
      }
      acc[periodKey]++;
      return acc;
    }, {});

    // Convert to array format for Recharts
    return Object.entries(groupedData).map(([name, users]) => ({
      name,
      users
    }));
  };

  // Function to copy referral ID
 const copyReferralId = () => {
  if (profileData?.referralId) {
    const referralLink = `https://landouse.com/register?referralCode=${profileData.referralId}`;
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied to clipboard!');
  }
};


  if (loading) {
    return (
      <div className="bg-blue-50 min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-blue-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Users Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-bold">{stats.totalUsers}</h2>
            <p className="text-gray-600 mt-1">Users from your referral</p>
            <p className="text-gray-400 text-sm mt-1">
              {stats.weeklyGrowth} user(s) added this {activeTimeframe}
            </p>
          </div>
          <div className="bg-blue-400 p-4 rounded-full">
            <Building2 size={24} color="white" />
          </div>
        </div>

        {/* Amount Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-bold">₹{stats.claimedAmount?.toLocaleString() || '0'}</h2>
            <p className="text-gray-600 mt-1">Claimed</p>
            <p className="text-gray-400 text-sm mt-1">
              From {stats.totalUsers} referred users
            </p>
          </div>
          <div className="bg-blue-400 p-4 rounded-full">
            <Banknote size={24} color="white" />
          </div>
        </div>

        {/* Referral ID Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-bold">{profileData?.referralId || 'N/A'}</h2>
            <p className="text-gray-600 mt-1">Referral ID</p>
            <div 
              className="flex items-center text-blue-500 text-sm mt-1 cursor-pointer"
              onClick={copyReferralId}
            >
              <span>Copy your referral ID</span>
              <Copy size={16} className="ml-1" />
            </div>
          </div>
          <div className="bg-blue-400 p-4 rounded-full">
            <FileText size={24} color="white" />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Total referred users</h2>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs mr-2">
                i
              </div>
              <span className="text-xs text-gray-500">
                {stats.weeklyGrowth} this {activeTimeframe}
              </span>
            </div>
            <div className="flex bg-gray-100 rounded-full p-1">
              {['weekly', 'monthly', 'yearly'].map(timeframe => (
                <button
                  key={timeframe}
                  className={`px-4 py-1 rounded-full text-sm capitalize ${
                    activeTimeframe === timeframe 
                      ? 'bg-white text-blue-500 shadow-sm' 
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTimeframe(timeframe)}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-64">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  domain={[0, 'dataMax + 10']} 
                />
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#4596e6" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                  dot={{ r: 4 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No data available for the selected period
            </div>
          )}
        </div>
      </div>

      {/* Recently Joined Users */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Recently joined users</h2>
        {recentUsers.length > 0 ? (
          <div className="space-y-4">
            {recentUsers.map(user => (
              <div key={user._id} className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  {user.firstName?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Joined on {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-4">
            No recently joined users
          </div>
        )}
      </div>
    </div>
  );
}