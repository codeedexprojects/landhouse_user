// components/Toast.js
import { useEffect } from 'react';

export const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' 
    ? 'bg-green-500 text-white' 
    : 'bg-red-500 text-white';

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-md shadow-lg ${bgColor} flex items-center space-x-4 animate-fade-in`}>
      <div className="flex-1 text-center">
        {message}
      </div>
      <button 
        onClick={onClose}
        className="text-white hover:text-gray-200 text-lg font-bold"
      >
        &times;
      </button>
    </div>
  );
};