export default function ProfileContent() {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              defaultValue="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              defaultValue="john.doe@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              defaultValue="+1 234 567 8900"
            />
          </div>
          <div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }