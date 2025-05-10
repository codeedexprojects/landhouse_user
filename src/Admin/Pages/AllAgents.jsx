import { useState, useEffect } from 'react';
import { Download, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getVendors } from '../../services/allApi/adminAllApis';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import 'jspdf-autotable';

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

  // PDF Download function
  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(16);
    doc.text('Agents Report', 14, 15);
    
    // Current date
    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${date}`, 14, 22);
    
    // Table data
    const tableData = agents.map((agent) => [
      agent.name || 'N/A',
      agent.email || 'N/A',
      agent.number || 'N/A',
      agent.city || 'N/A',
      agent.role || 'N/A',
      agent.aboutVendor ? agent.aboutVendor.substring(0, 50) + (agent.aboutVendor.length > 50 ? '...' : '') : 'N/A'
    ]);

    // AutoTable
    autoTable(doc, {
      head: [['Name', 'Email', 'Phone', 'Location', 'Role', 'Description']],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 9,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Name
        1: { cellWidth: 35 }, // Email
        2: { cellWidth: 20 }, // Phone
        3: { cellWidth: 20 }, // Location
        4: { cellWidth: 15 }, // Role
        5: { cellWidth: 45 }  // Description
      }
    });

    // Save the PDF
    doc.save(`agents_report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  if (loading) {
    return (
      <div className="p-4 bg-blue-100 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-blue-100 min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  const handleAddAgent=()=>{
    navigate('/admin/add-agent')
  }

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4 flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <span>Agent</span>
          <span className="mx-2">/</span>
          <span className="text-blue-500">agent list</span>
        </div>
        <button onClick={handleAddAgent} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm">
          Add Agent
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {currentAgents.map((agent, index) => (
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
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors"
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
        <button 
          onClick={downloadPDF}
          className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm hover:bg-gray-50"
        >
          <Download className="mr-2 w-4 h-4" />
          Download PDF
        </button>

        <div className="flex items-center">
          <button
            className={`p-2 text-gray-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} rounded`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex space-x-2 mx-2">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              // Show only first, last, and pages around current page
              if (
                pageNumber === 1 || 
                pageNumber === totalPages || 
                Math.abs(pageNumber - currentPage) <= 1
              ) {
                return (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${
                      currentPage === pageNumber 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-500 shadow-sm hover:bg-gray-50'
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              }
              // Show ellipsis when skipping pages
              if (
                (pageNumber === 2 && currentPage > 3) || 
                (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return (
                  <span key={index} className="flex items-center justify-center text-gray-500">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            className={`p-2 text-gray-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} rounded`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="ml-4 flex items-center border-l border-gray-200 pl-4">
            <span className="text-sm text-gray-600">{agentsPerPage} per page</span>
          </div>
        </div>
      </div>
    </div>
  );
}