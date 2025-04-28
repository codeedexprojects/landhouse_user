import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReferralAffiliates() {
    const navigate=useNavigate()
    const handleAddAffliates=()=>{
        navigate('/admin/create-coupon')
    }
    // Sample data for the table
    const affiliatesData = [
        { affiliate: "Kadar muhammed", referralId: "ysdgc2626", userCount: "150", amount: "50000" },
        { affiliate: "Kadar muhammed", referralId: "f9565651", userCount: "200", amount: "50000" },
        { affiliate: "Kadar muhammed", referralId: "afegvzd62", userCount: "66", amount: "50000" },
        { affiliate: "Kadar muhammed", referralId: "fds6516565", userCount: "965", amount: "50000" },
        { affiliate: "Kadar muhammed", referralId: "afed69f566", userCount: "681", amount: "50000" },
    ];

    return (
        <div className="bg-blue-50 min-h-screen p-4">
            {/* Header with navigation and button */}
            <div className="bg-white p-3 rounded-md shadow-sm mb-4">
                <div className="flex items-center text-sm text-gray-500">
                    <span className="text-blue-500">Referrals</span>

                    <div className="ml-auto flex items-center space-x-3">
                        <button onClick={handleAddAffliates} className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-2 rounded-md">
                            Add Affiliates
                        </button>
                       
                    </div>
                </div>
            </div>

            {/* Content card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Card header */}
                <div className="p-5 border-b">
                    <h2 className="text-lg font-medium">Referral</h2>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-5 gap-2 p-4 border-b">
                    <div className="font-medium">SI No</div>
                    <div className="font-medium">Affiliates</div>
                    <div className="font-medium">Referal ID</div>
                    <div className="font-medium">User count</div>
                    <div className="font-medium">Add amount</div>
                </div>

                {/* Table Rows */}
                {affiliatesData.map((row, index) => (
                    <div key={index} className="grid grid-cols-5 gap-2 p-4 border-b">
                        <div className="text-gray-500">{index + 1}</div>
                        <div className="text-gray-600">{row.affiliate}</div>
                        <div className="text-gray-600">{row.referralId}</div>
                        <div className="text-gray-600">{row.userCount}</div>
                        <div>
                            <button className="bg-green-100 text-green-800 px-6 py-2 rounded-md w-32 text-center">
                                {row.amount}
                            </button>
                        </div>
                    </div>
                ))}

                {/* Pagination */}
                
            </div>
            <div className="flex justify-between items-center mt-6">
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