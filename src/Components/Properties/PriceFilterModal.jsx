import React from 'react';

const PriceFilterModal = ({ 
  minPrice, 
  maxPrice, 
  onMinPriceChange, 
  onMaxPriceChange, 
  onApply, 
  onCancel 
}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Filter by Price
        </h2>
        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="From"
            value={minPrice}
            onChange={onMinPriceChange}
            className="px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="To"
            value={maxPrice}
            onChange={onMaxPriceChange}
            className="px-3 py-2 border rounded-md"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onApply}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilterModal;