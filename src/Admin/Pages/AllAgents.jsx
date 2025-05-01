import { useState } from 'react';
import { Download, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AgentListingPage() {
  const agents = [
    {
      id: 1,
      name: "Alexander Hipp",
      email: "alexanderhipp@info",
      phone: "+91 12345 09876",
      location: "Palakkad",
      description: "Senior property agent specializing in residential listings across Palakkad and Malappuram. With over 5 years of experience."
    },
    {
      id: 2,
      name: "Alexander Hipp",
      email: "alexanderhipp@info",
      phone: "+91 12345 09876",
      location: "Palakkad",
      description: "Senior property agent specializing in residential listings across Palakkad and Malappuram. With over 5 years of experience."
    },
    {
      id: 3,
      name: "Alexander Hipp",
      email: "alexanderhipp@info",
      phone: "+91 12345 09876",
      location: "Palakkad",
      description: "Senior property agent specializing in residential listings across Palakkad and Malappuram. With over 5 years of experience."
    },
    {
      id: 4,
      name: "Alexander Hipp",
      email: "alexanderhipp@info",
      phone: "+91 12345 09876",
      location: "Palakkad",
      description: "Senior property agent specializing in residential listings across Palakkad and Malappuram. With over 5 years of experience."
    }
  ];
  const navigate = useNavigate()
  const handleViewClick =()=>{
    navigate('/admin/agent-details')
  }

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span>Agent</span>
          <span className="mx-2">/</span>
          <span className="text-blue-500">All agents</span>
          
          <div className="ml-auto">
            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <img src="/api/placeholder/32/32" alt="User profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {agents.map((agent, index) => (
          <div key={agent.id} className="bg-white rounded-md p-5 shadow-sm">
            <div className="flex">
              <div className="mr-4">
                <img 
                  src={`/api/placeholder/${60 + index}/${60 + index}`}
                  alt={agent.name} 
                  className="w-12 h-12 rounded-md object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{agent.name}</h3>
                <p className="text-gray-500 text-sm">Agent</p>
                <p className="text-sm mt-2 text-gray-700">{agent.description}</p>
                
                <div className="mt-4">
                  <div className="flex mb-2">
                    <span className="text-sm text-gray-600 w-20">Email :</span>
                    <span className="text-sm">{agent.email}</span>
                  </div>
                  <div className="flex mb-2">
                    <span className="text-sm text-gray-600 w-20">Phone :</span>
                    <span className="text-sm">{agent.phone}</span>
                  </div>
                  <div className="flex mb-4">
                    <span className="text-sm text-gray-600 w-20">Location :</span>
                    <span className="text-sm">{agent.location}</span>
                  </div>
                </div>

                <button onClick={handleViewClick} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md text-sm">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
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
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">4</button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">5</button>
            <span className="flex items-center justify-center text-gray-500">...</span>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">19</button>
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