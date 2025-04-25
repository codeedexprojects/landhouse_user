import { User, Heart, Mail, LogOut } from 'lucide-react';

export default function ProfileSidebar({ activeTab, handleTabChange }) {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full">
        {/* User Profile Summary */}
        <div className="p-6 flex flex-col items-center border-b border-gray-200">
          <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">JD</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
          <p className="text-sm text-gray-500">john.doe@example.com</p>
        </div>

        {/* Navigation Options */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => handleTabChange('profile')}
                className={`w-full flex items-center p-3 rounded-md ${
                  activeTab === 'profile' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                } transition-colors`}
              >
                <User size={20} className="mr-3" />
                <span>Profile</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleTabChange('favorites')}
                className={`w-full flex items-center p-3 rounded-md ${
                  activeTab === 'favorites' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                } transition-colors`}
              >
                <Heart size={20} className="mr-3" />
                <span>Favorites</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleTabChange('contact')}
                className={`w-full flex items-center p-3 rounded-md ${
                  activeTab === 'contact' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                } transition-colors`}
              >
                <Mail size={20} className="mr-3" />
                <span>Contact Us</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <button 
            className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            onClick={() => console.log('Logout clicked')}
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}