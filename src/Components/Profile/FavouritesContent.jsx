export default function FavoritesContent() {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Favorites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border border-gray-200 rounded-md p-4 flex">
              <div className="w-24 h-24 bg-gray-200 rounded-md mr-4"></div>
              <div>
                <h3 className="font-medium">Property {item}</h3>
                <p className="text-sm text-gray-500">Location {item}</p>
                <p className="text-sm font-semibold mt-2">$1,200,000</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }