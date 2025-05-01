import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReferralAffiliates() {
    const navigate = useNavigate();
    const handleAddAffliates = () => {
        navigate('/admin/affiliates');
    };
    
    // Updated data for the table based on the provided image
    const referralsData = [
        { 
            agent: "Kadar muhammed", 
            user: "kanha", 
            date: "20-08-2025", 
            referredProperty: "Single Family Residency, 4 Cent Palakkad, Kerala", 
            referralCode: "land3256@" 
        },
        { 
            agent: "Kadar muhammed", 
            user: "kanha", 
            date: "20-08-2025", 
            referredProperty: "Single Family Residency, 4 Cent Palakkad, Kerala", 
            referralCode: "land3256@" 
        },
        { 
            agent: "Kadar muhammed", 
            user: "kanha", 
            date: "20-08-2025", 
            referredProperty: "Single Family Residency, 4 Cent Palakkad, Kerala", 
            referralCode: "land3256@" 
        },
        { 
            agent: "Kadar muhammed", 
            user: "kanha", 
            date: "20-08-2025", 
            referredProperty: "Single Family Residency, 4 Cent Palakkad, Kerala", 
            referralCode: "land3256@" 
        },
        { 
            agent: "Kadar muhammed", 
            user: "kanha", 
            date: "20-08-2025", 
            referredProperty: "Single Family Residency, 4 Cent Palakkad, Kerala", 
            referralCode: "land3256@" 
        },
    ];

    return (
        <div className="bg-blue-50 min-h-screen p-4">
            {/* Header with navigation and button */}
            <div className="bg-white p-3 rounded-md shadow-sm mb-4">
                <div className="flex items-center text-sm text-gray-500">
                    <span className="text-blue-500">Referrals</span>

                    <div className="ml-auto flex items-center space-x-3">
                        <button onClick={handleAddAffliates} className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-2 rounded-md">
                            Affiliates
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
                <div className="grid grid-cols-6 gap-2 p-4 border-b">
                    <div className="font-medium">SI No</div>
                    <div className="font-medium">Agent</div>
                    <div className="font-medium">User</div>
                    <div className="font-medium">Date</div>
                    <div className="font-medium">Referred Property</div>
                    <div className="font-medium">Referral code</div>
                </div>

                {/* Table Rows */}
                {referralsData.map((row, index) => (
                    <div key={index} className="grid grid-cols-6 gap-2 p-4 border-b">
                        <div className="text-gray-500">{index + 1}</div>
                        <div className="text-gray-600">{row.agent}</div>
                        <div className="text-gray-600">{row.user}</div>
                        <div className="text-gray-600">{row.date}</div>
                        <div className="text-gray-600 text-sm">
                            <div>{row.referredProperty.split(',')[0]},</div>
                            <div>{row.referredProperty.split(',')[1]}</div>
                        </div>
                        <div>
                            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">
                                {row.referralCode}
                            </span>
                        </div>
                    </div>
                ))}
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