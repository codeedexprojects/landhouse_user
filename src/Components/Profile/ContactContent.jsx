export default function ContactContent() {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="How can we help you?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              className="w-full p-2 border border-gray-300 rounded-md h-32" 
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>
    );
  }