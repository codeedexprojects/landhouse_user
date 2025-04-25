import React from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, Phone } from 'lucide-react';
import image from "../../../assets/house1.jpg"

const Dashboard = () => {
  const statsCards = [
    { title: 'Properties for you', value: '556', color: 'blue', percentage: 60 },
    { title: 'Properties for vendor', value: '156', color: 'green', percentage: 30 },
    { title: 'Total user', value: '856', color: 'purple', percentage: 75 },
    { title: 'Total vendor', value: '210', color: 'pink', percentage: 45 },
  ];

  const months = [...Array(13).keys()];
  
  const barValues = [0.2, 0.5, 0.9, 2.5, 1.8, 1.6, 2.2, 1.8, 2.4, 2.6, 2.4, 2.8];
  
  const users = [
    { name: 'Brooklyn Simmons', referredBy: 'Krishtin' },
    { name: 'Musafir', referredBy: 'Mashi' },
    { name: 'Shafeek ali', referredBy: 'Fathima' },
    { name: 'Shafeek ali', referredBy: 'Fathima' },
  ];
  
  const agents = [
    { name: 'Brooklyn Simmons', referredBy: 'Krishtin' },
    { name: 'Musafir', referredBy: 'Mashi' },
    { name: 'Shafeek ali', referredBy: 'Fathima' },
    { name: 'abhilash', referredBy: 'Fathima' },
    { name: 'Aravind', referredBy: 'Fathima' },
  ];

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
        <div className="bg-white p-4 rounded-lg shadow-sm lg:col-span-2">
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
            <div className="flex items-end h-full space-x-2 px-2">
              {months.map((month, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-500 rounded-sm" 
                    style={{ height: index === 0 ? '5%' : `${barValues[index-1] * 25}%` }}
                  />
                  <span className="text-xs mt-1 text-gray-500">{index}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-4">Recent User</h3>
          <div className="space-y-4">
            {users.map((user, index) => (
              <div key={index} className="flex items-center">
                <img 
                  src="/api/placeholder/40/40" 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">Referred by {user.referredBy}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="text-blue-500 text-sm w-full text-center mt-4">
            See All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-4">Recent Property</h3>
          <div className="relative">
            <img 
              src={image} 
              alt="Property" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="mt-2">
              <h4 className="font-medium">Single Family Residency</h4>
              <p className="text-sm text-gray-600">2 BHK  Palakkad, Kerala</p>
              <div className="flex mt-2">
                <button className="flex items-center bg-blue-100 text-blue-500 py-1 px-2 rounded text-xs mr-2">
                  <MessageSquare size={14} className="mr-1" /> 4
                </button>
                <button className="flex items-center bg-blue-100 text-blue-500 py-1 px-2 rounded text-xs">
                  <Phone size={14} className="mr-1" /> 4
                </button>
              </div>
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2">
              <button className="bg-white rounded-full p-1 shadow">
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2">
              <button className="bg-white rounded-full p-1 shadow">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">User and referral user</h3>
            <div className="bg-gray-100 text-xs px-2 py-1 rounded">
              <span className="font-medium">36</span>
              <span className="text-gray-500"> 33.3%</span>
            </div>
          </div>
          <div className="relative h-56 w-56 mx-auto">
            <div className="w-full h-full rounded-full" style={{ 
              background: 'conic-gradient(#8B5CF6 72deg, #06B6D4 72deg 360deg)' 
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white w-32 h-32 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold">72</p>
                  <p className="text-xs text-gray-500">66.7%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-sm mr-2" />
              <span className="text-sm">Referred user</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cyan-500 rounded-sm mr-2" />
              <span className="text-sm">user</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-4">Recent Agent</h3>
          <div className="space-y-4">
            {agents.map((agent, index) => (
              <div key={index} className="flex items-center">
                <img 
                  src="/api/placeholder/40/40" 
                  alt={agent.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{agent.name}</p>
                  <p className="text-xs text-gray-500">Referred by {agent.referredBy}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="text-blue-500 text-sm w-full text-center mt-4">
            See All
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;