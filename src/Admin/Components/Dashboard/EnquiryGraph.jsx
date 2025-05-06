import React, { useEffect, useState } from 'react';
import { getOverviewGraph } from '../../../services/allApi/adminAllApis';

// EnquiryGraph Component
const EnquiryGraph = () => {
  const [graphData, setGraphData] = useState({
    values: Array(12).fill(0),
    total: 0,
    percentChange: "0.0"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRange, setSelectedRange] = useState('yearly');
  
  // Labels for different time ranges
  const timeLabels = {
    weekly: [...Array(7)].map((_, i) => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return days[i];
    }),
    monthly: [...Array(30)].map((_, i) => i + 1),
    yearly: [...Array(12)].map((_, i) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months[i];
    })
  };

  // Fetch graph data
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        setLoading(true);
        const response = await getOverviewGraph(selectedRange);
        setGraphData({
          values: response.data,
          total: response.total,
          percentChange: response.percentChange
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load enquiry data');
        setLoading(false);
      }
    };

    fetchGraphData();
  }, [selectedRange]);

  // Get max value for scaling the graph
  const maxValue = Math.max(...graphData.values, 1); // Ensure at least 1 to avoid division by zero

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Get appropriate labels based on range
  const currentLabels = timeLabels[selectedRange] || timeLabels.yearly;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm lg:col-span-2">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-medium">Total Enquiry</h3>
          <p className="text-xl font-bold">{formatNumber(graphData.total)}</p>
        </div>
        <div className="flex items-center">
          <span className={`text-xs px-2 py-1 rounded mr-2 ${
            parseFloat(graphData.percentChange) >= 0 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-red-100 text-red-600'
          }`}>
            {parseFloat(graphData.percentChange) >= 0 ? '+' : ''}{graphData.percentChange}% from last {
              selectedRange === 'weekly' ? 'week' : 
              selectedRange === 'monthly' ? 'month' : 'year'
            }
          </span>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 text-xs ${
                selectedRange === 'weekly' 
                  ? 'bg-gray-100 text-gray-700' 
                  : 'text-gray-500 hover:bg-gray-100'
              } rounded`}
              onClick={() => setSelectedRange('weekly')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 text-xs ${
                selectedRange === 'monthly' 
                  ? 'bg-gray-100 text-gray-700' 
                  : 'text-gray-500 hover:bg-gray-100'
              } rounded`}
              onClick={() => setSelectedRange('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`px-3 py-1 text-xs ${
                selectedRange === 'yearly' 
                  ? 'bg-gray-100 text-gray-700' 
                  : 'text-gray-500 hover:bg-gray-100'
              } rounded`}
              onClick={() => setSelectedRange('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="mt-6 h-48 flex items-center justify-center">
          <p className="text-gray-500">Loading graph data...</p>
        </div>
      ) : error ? (
        <div className="mt-6 h-48 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="mt-6 h-48">
          <div className="flex items-end h-full space-x-1 px-2">
            {graphData.values.map((value, index) => {
              // Only show number of bars appropriate for the selected range
              if (
                (selectedRange === 'weekly' && index >= 7) ||
                (selectedRange === 'monthly' && index >= 30) ||
                (selectedRange === 'yearly' && index >= 12)
              ) {
                return null;
              }
              
              // Calculate height as percentage of max value (minimum 2px for visibility)
              const height = value > 0 ? Math.max((value / maxValue) * 100, 5) : 2;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`w-full ${value > 0 ? 'bg-blue-500' : 'bg-gray-200'} rounded-t-sm relative group`}
                    style={{ height: `${height}%`, minHeight: '2px' }}
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap transition-opacity duration-200">
                      {value} enquiries
                    </div>
                  </div>
                  <span className="text-xs mt-1 text-gray-500">
                    {currentLabels[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryGraph;