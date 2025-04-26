import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Phone } from 'lucide-react';

export default function VendorDashboard() {
  // Chart data for total enquiries
  const chartData = [
    { month: 'Jan', value: 50 },
    { month: 'Feb', value: 58 },
    { month: 'Mar', value: 45 },
    { month: 'Apr', value: 55 },
    { month: 'May', value: 48 },
    { month: 'Jun', value: 48 },
    { month: 'Jul', value: 55 },
    { month: 'Aug', value: 62 },
    { month: 'Sep', value: 48 },
    { month: 'Oct', value: 60 },
    { month: 'Nov', value: 52 },
    { month: 'Dec', value: 55 }
  ];

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Properties Listed */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
          <div>
            <h2 className="text-3xl font-bold">50</h2>
            <h3 className="text-gray-700 mb-1">Properties listed</h3>
            <p className="text-xs text-gray-500">2 properties added in this week</p>
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
            <h2 className="text-3xl font-bold">120</h2>
            <h3 className="text-gray-700 mb-1">wish listed</h3>
            <p className="text-xs text-gray-500">15 wish listed property in this week</p>
          </div>
          <div className="bg-blue-400 p-3 rounded-full h-14 w-14 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="9" r="4" strokeWidth="2" />
              <path d="M20 20c0-3.866-3.582-7-8-7s-8 3.134-8 7" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Sold Properties */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
          <div>
            <h2 className="text-3xl font-bold">20</h2>
            <h3 className="text-gray-700 mb-1">Sold Properties</h3>
            <p className="text-xs text-gray-500">15 Properties sold in this week</p>
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
      </div>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Total enquiry</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-blue-500 rounded-full mr-1"></div>
              <span className="text-xs">12% increased this day</span>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm">
              <button className="bg-blue-100 px-3 py-1 rounded-md">Week</button>
              <button className="px-3 py-1">Monthly</button>
              <button className="px-3 py-1">Yearly</button>
            </div>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Enquired Property */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Most enquired Property</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <img 
                src="/api/placeholder/300/200" 
                alt="Property" 
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-bold">Single Family Residency</h3>
                <p className="text-gray-600 text-sm">2 BHK</p>
                <p className="text-gray-600 text-sm">Palakkad, Kerala</p>
              </div>
              <div className="flex items-center mt-4">
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md mr-2">Sale</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md">New</span>
                <div className="ml-auto">
                  <span className="text-lg font-bold">120</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Message Received */}
        <div className="bg-white p-4 rounded-lg shadow-sm relative">
          <div className="absolute top-4 right-4 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            <span>?</span>
          </div>
          <h2 className="text-xl font-bold mb-4">New message recieved</h2>
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-bold">Shafeek ali n</h3>
              <p className="text-gray-600">Shafeek785@gmail.com</p>
            </div>
            <p className="font-medium mb-2">Single Family Residency</p>
            <p className="text-gray-600 text-sm mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              <span className="text-blue-400 ml-1">Read more</span>
            </p>
            <div className="flex items-center mt-4">
              <button className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                <Phone size={16} className="mr-2" />
                <span>9989767876</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}