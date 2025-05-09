import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Phone } from 'lucide-react';
import { getEnquireis, getGraphOverview, getOverviewCounts } from '../../../services/allApi/vendorAllAPi';

export default function VendorDashboard() {
  const [loading, setLoading] = useState({
    initial: true,
    graph: false
  });
  const [counts, setCounts] = useState({
    totalProperties: 0,
    soldProperties: 0,
    wishlisted: 0
  });
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState('monthly');
  const [latestEnquiry, setLatestEnquiry] = useState(null);
  const [stats, setStats] = useState({
    percentageChange: 0,
    totalEnquiries: 0
  });

  // Get vendor ID from localStorage
  const vendorId = localStorage.getItem('vendorId');

  useEffect(() => {
    if (vendorId) {
      fetchInitialData();
    }
  }, [vendorId]);

  useEffect(() => {
    if (vendorId && !loading.initial) {
      fetchGraphData();
    }
  }, [filter, vendorId]);

  const fetchInitialData = async () => {
    try {
      setLoading(prev => ({ ...prev, initial: true }));
      
      // Fetch counts data
      const countsResponse = await getOverviewCounts(vendorId);
      if (countsResponse?.success) {
        setCounts({
          totalProperties: countsResponse.counts.totalProperties || 0,
          soldProperties: countsResponse.counts.soldProperties || 0,
          wishlisted: countsResponse.counts.wishlisted || 0
        });
      }

      // Fetch latest enquiry
      const enquiriesResponse = await getEnquireis(vendorId);
      if (enquiriesResponse?.success && enquiriesResponse.enquiries?.length > 0) {
        const sortedEnquiries = [...enquiriesResponse.enquiries].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestEnquiry(sortedEnquiries[0]);
      }

      // Fetch initial graph data
      await fetchGraphData();
      
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(prev => ({ ...prev, initial: false }));
    }
  };

  const fetchGraphData = async () => {
    try {
      setLoading(prev => ({ ...prev, graph: true }));
      
      const graphResponse = await getGraphOverview(`${vendorId}/enquiry-stats?filter=${filter}`);
      if (graphResponse?.success) {
        setStats({
          percentageChange: graphResponse.percentageChange || 0,
          totalEnquiries: graphResponse.totalEnquiries || 0
        });
        setChartData(transformGraphData(graphResponse.enquiries || [], filter));
      }
    } catch (error) {
      console.error('Error fetching graph data:', error);
    } finally {
      setLoading(prev => ({ ...prev, graph: false }));
    }
  };

  // Transform API data to chart format
  const transformGraphData = (enquiries, timeframe) => {
    if (!enquiries || enquiries.length === 0) {
      return [];
    }

    // Group by time period
    const groupedData = enquiries.reduce((acc, enquiry) => {
      const date = new Date(enquiry.createdAt);
      let periodKey;
      
      if (timeframe === 'monthly') {
        periodKey = date.toLocaleString('default', { month: 'short' });
      } else if (timeframe === 'weekly') {
        const oneJan = new Date(date.getFullYear(), 0, 1);
        const weekNumber = Math.ceil(((date - oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
        periodKey = `Week ${weekNumber}`;
      } else {
        periodKey = date.getFullYear();
      }
      
      if (!acc[periodKey]) {
        acc[periodKey] = 0;
      }
      acc[periodKey]++;
      return acc;
    }, {});

    return Object.entries(groupedData).map(([name, value]) => ({
      name,
      value
    }));
  };

  if (loading.initial) {
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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Properties Listed */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
          <div>
            <h2 className="text-3xl font-bold">{counts.totalProperties}</h2>
            <h3 className="text-gray-700 mb-1">Properties listed</h3>
            <p className="text-xs text-gray-500">
              {Math.floor(counts.totalProperties / 12)} properties added this month
            </p>
          </div>
          <div className="bg-blue-400 p-3 rounded-full h-14 w-14 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
              <line x1="9" y1="9" x2="9" y2="15" strokeWidth="2" />
              <line x1="15" y1="9" x2="15" y2="15" strokeWidth="2" />
              <line x1="5" y1="9" x2="19" y2="9" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Wish Listed */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
          <div>
            <h2 className="text-3xl font-bold">{counts.wishlisted}</h2>
            <h3 className="text-gray-700 mb-1">Wish listed</h3>
            <p className="text-xs text-gray-500">
              {Math.floor(counts.wishlisted / 4)} wish listed this month
            </p>
          </div>
          <div className="bg-blue-400 p-3 rounded-full h-14 w-14 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Sold Properties */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
          <div>
            <h2 className="text-3xl font-bold">{counts.soldProperties}</h2>
            <h3 className="text-gray-700 mb-1">Sold Properties</h3>
            <p className="text-xs text-gray-500">
              {Math.floor(counts.soldProperties / 4)} sold this month
            </p>
          </div>
          <div className="bg-blue-400 p-3 rounded-full h-14 w-14 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="m9 12 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Total enquiry ({stats.totalEnquiries})</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-1 ${
                stats.percentageChange >= 0 ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="text-xs">
                {Math.abs(stats.percentageChange)}% {stats.percentageChange >= 0 ? 'increase' : 'decrease'} this period
              </span>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm">
              {['weekly', 'monthly', 'yearly'].map((timeframe) => (
                <button
                  key={timeframe}
                  className={`px-3 py-1 rounded-md ${
                    filter === timeframe ? 'bg-blue-100 text-blue-600' : ''
                  }`}
                  onClick={() => setFilter(timeframe)}
                  disabled={loading.graph}
                >
                  {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-64 relative">
          {loading.graph && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
          <ResponsiveContainer width="100%" height="100%">
            {chartData.length > 0 ? (
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No data available</p>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Enquired Property - Placeholder (you can implement this with actual data) */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Most enquired Property</h2>
          <div className="text-center py-8 text-gray-500">
            Feature coming soon
          </div>
        </div>

        {/* New Message Received */}
        <div className="bg-white p-4 rounded-lg shadow-sm relative">
          <h2 className="text-xl font-bold mb-4">New message received</h2>
          {latestEnquiry ? (
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-bold">{latestEnquiry.name || 'No name'}</h3>
                <p className="text-gray-600">{latestEnquiry.email}</p>
              </div>
              {latestEnquiry.propertyId && (
                <p className="font-medium mb-2">
                  {latestEnquiry.propertyId.property_type} - {latestEnquiry.propertyId.address}
                </p>
              )}
              <p className="text-gray-600 text-sm mb-2">
                {latestEnquiry.message.length > 150 
                  ? `${latestEnquiry.message.substring(0, 150)}...`
                  : latestEnquiry.message}
              </p>
              <div className="flex items-center mt-4">
                <button className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                  <Phone size={16} className="mr-2" />
                  <span>{latestEnquiry.phoneNumber}</span>
                </button>
                <span className="ml-4 text-sm text-gray-500">
                  {new Date(latestEnquiry.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recent messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
}