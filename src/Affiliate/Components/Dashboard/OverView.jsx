import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, Banknote, FileText, Copy } from 'lucide-react';

export default function AffiliateDashboard() {
  const [activeTimeframe, setActiveTimeframe] = useState('Yearly');

  // Mock data for the chart
  const chartData = [
    { name: 'jan', users: 28 },
    { name: 'feb', users: 72 },
    { name: 'mar', users: 32 },
    { name: 'apr', users: 67 },
    { name: 'may', users: 25 },
    { name: 'jun', users: 25 },
    { name: 'jul', users: 62 },
    { name: 'aug', users: 85 },
    { name: 'sep', users: 30 },
    { name: 'oct', users: 75 },
    { name: 'nov', users: 47 },
    { name: 'dec', users: 76 }
  ];

  // Mock data for recently joined users
  const recentUsers = [
    { id: 1, name: 'Brooklyn Simmons', avatar: '/api/placeholder/40/40' },
    { id: 2, name: 'Musafir', avatar: '/api/placeholder/40/40' },
    { id: 3, name: 'Shafeek ali', avatar: '/api/placeholder/40/40' },
    { id: 4, name: 'abhilash', avatar: '/api/placeholder/40/40' },
    { id: 5, name: 'Aravind', avatar: '/api/placeholder/40/40' }
  ];

  // Function to copy referral ID
  const copyReferralId = () => {
    navigator.clipboard.writeText('jugfds@33');
    alert('Referral ID copied to clipboard!');
  };

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Users Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-bold">5000</h2>
            <p className="text-gray-600 mt-1">User your referral</p>
            <p className="text-gray-400 text-sm mt-1">22 user added in this week</p>
          </div>
          <div className="bg-blue-400 p-4 rounded-full">
            <Building2 size={24} color="white" />
          </div>
        </div>

        {/* Amount Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-bold">₹98098</h2>
            <p className="text-gray-600 mt-1">Claimed</p>
            <p className="text-gray-400 text-sm mt-1">15 wish listed property in this week</p>
          </div>
          <div className="bg-blue-400 p-4 rounded-full">
            <Banknote size={24} color="white" />
          </div>
        </div>

        {/* Referral ID Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-bold">jugfds@33</h2>
            <p className="text-gray-600 mt-1">referral ID</p>
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
          <h2 className="text-xl font-semibold">Total referred user</h2>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs mr-2">
                i
              </div>
              <span className="text-xs text-gray-500">12% This last day</span>
            </div>
            <div className="flex bg-gray-100 rounded-full p-1">
              {['Week', 'Monthly', 'Yearly'].map(timeframe => (
                <button
                  key={timeframe}
                  className={`px-4 py-1 rounded-full text-sm ${
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
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                domain={[0, 100]} 
                ticks={[0, 10, 29, 38, 48, 57, 67, 77, 86, 95]} 
              />
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#4596e6" 
                activeDot={{ r: 8 }} 
                dot={{ r: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recently Joined Users */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Recently joined user</h2>
        <div className="space-y-4">
          {recentUsers.map(user => (
            <div key={user.id} className="flex items-center">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full mr-3" 
              />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">Referred by you</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}