import { useState, useEffect } from 'react';
import { Download, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getVendors } from '../../services/allApi/adminAllApis';

export default function AgentListingPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
   const [currentPage, setCurrentPage] = useState(1);
   const agentsPerPage = 10;

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await getVendors();
        setAgents(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load agents.");
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

   // Calculate pagination
   const indexOfLastAgent = currentPage * agentsPerPage;
   const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
   const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);
   const totalPages = Math.ceil(agents.length / agentsPerPage);
 
   const handlePageChange = (pageNumber) => {
     if (pageNumber >= 1 && pageNumber <= totalPages) {
       setCurrentPage(pageNumber);
     }
   };

  const handleViewClick = (vendorId) => {
    navigate(`/admin/agent-details/${vendorId}`);
  };

  if (loading) {
    return <div>Loading agents...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
          <div key={agent._id} className="bg-white rounded-md p-5 shadow-sm">
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
                <p className="text-gray-500 text-sm">{agent.role}</p>
                <p className="text-sm mt-2 text-gray-700">{agent.aboutVendor || "No description available"}</p>

                <div className="mt-4">
                  <div className="flex mb-2">
                    <span className="text-sm text-gray-600 w-20">Email :</span>
                    <span className="text-sm">{agent.email}</span>
                  </div>
                  <div className="flex mb-2">
                    <span className="text-sm text-gray-600 w-20">Phone :</span>
                    <span className="text-sm">{agent.number}</span>
                  </div>
                  <div className="flex mb-4">
                    <span className="text-sm text-gray-600 w-20">Location :</span>
                    <span className="text-sm">{agent.city}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleViewClick(agent._id)} 
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md text-sm"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
              <button className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm">
                <Download className="mr-2 w-4 h-4" />
                Download
              </button>
      
              <div className="flex items-center">
                <button
                  className="p-2 text-gray-500"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
      
                <div className="flex space-x-2 mx-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`w-8 h-8 rounded-md ${
                        currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 shadow-sm'
                      } flex items-center justify-center text-sm`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
      
                <button
                  className="p-2 text-gray-500"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
      
                <div className="ml-4 flex items-center border-l border-gray-200 pl-4">
                  <button className="w-8 h-8 rounded-md bg-white text-gray-600 flex items-center justify-center text-sm shadow-sm">
                    {agentsPerPage}
                  </button>
                </div>
              </div>
            </div>
    </div>
  );
}
