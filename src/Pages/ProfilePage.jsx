import { FiEdit3 } from 'react-icons/fi';
import Header from '../Components/Header';

export default function ProfilePage() {
    return (
        <div>
            <Header />

            <div className="bg-white font-urbanist px-4 pt-8 min-h-screen">
                {/* Profile Card */}
                <div className="w-full max-w-5xl mx-auto border border-gray-300 rounded-lg p-8 relative mt-4">

                    {/* Edit icon */}
                    <button className="absolute top-6 right-6 text-gray-600 hover:text-indigo-600">
                        <FiEdit3 className="w-5 h-5" />
                    </button>

                    {/* Heading inside the box */}
                    <h2 className="text-3xl font-semibold text-indigo-900 mb-6">Profile</h2>

                    {/* Content */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                        {/* Profile Image */}
                        <img
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            alt="Profile"
                            className="w-32 h-32 rounded-lg object-cover border border-gray-300"
                        />

                        {/* Info */}
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-black">ZIYAD KUNHEEN</h3>
                            <p className="text-md text-gray-500 mt-1">ID : 011221</p>
                            <p className="text-lg text-gray-700 mt-2 leading-relaxed">
                                Palakkad bypass junction, Palakkad, Kerala, 679553
                            </p>

                            {/* Contact Info */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                <div className="px-5 py-2 border border-gray-300 rounded text-black text-sm" style={{ backgroundColor: "#D7E8FF" }}>
                                    9956542465
                                </div>
                                <div
                                    className="px-5 py-2 border border-gray-300 rounded text-black text-sm"
                                    style={{ backgroundColor: "#D7E8FF" }}
                                >
                                    ziyad.skywaytravels@icloud.om
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
