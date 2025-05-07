import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Home, Users, User, Link, ChevronDown, ChevronUp, X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [isPropertyOpen, setPropertyOpen] = useState(false);
  const [isAgentOpen, setAgentOpen] = useState(false);

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/vendor/dashboard',
    },
    {
      name: 'Property',
      icon: <Home size={20} />,
      dropdown: true,
      isOpen: isPropertyOpen,
      toggle: () => setPropertyOpen(!isPropertyOpen),
      children: [
        { name: 'Add Property', path: '/vendor/add-prop-vendor' },
        { name: 'All Properties', path: '/vendor/prop-vendor' },

      ],
    },

  ];

  const footerItems = [

    { name: 'Logout', path: '/vendor/login' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`bg-white border-r border-gray-200 w-64 flex flex-col fixed inset-y-0 z-30
      transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
    >
      {/* Mobile close button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 md:hidden text-gray-500"
      >
        <X size={20} />
      </button>

      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <span className="ml-2 text-blue-500 font-bold text-lg">LANDHOUSE</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="px-4 py-2">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-2">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={item.toggle}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left ${item.children.some((child) => isActive(child.path))
                          ? 'bg-blue-50 text-blue-500 border-l-4 border-blue-500'
                          : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      {item.isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {item.isOpen && (
                      <ul className="pl-12 mt-1">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <RouterLink
                              to={child.path}
                              onClick={toggleSidebar}
                              className={`block py-2 text-sm rounded ${isActive(child.path)
                                  ? 'text-blue-600 font-medium'
                                  : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                              {child.name}
                            </RouterLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <RouterLink
                    to={item.path}
                    onClick={toggleSidebar}
                    className={`flex items-center px-4 py-3 rounded-lg ${isActive(item.path)
                        ? 'bg-blue-50 text-blue-500 border-l-4 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </RouterLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4">
        <ul>
          {footerItems.map((item, index) => (
            <li key={index} className="mb-2">
              <RouterLink
                to={item.path}
                onClick={() => {
                  localStorage.removeItem("vendorId");
                  localStorage.removeItem("vendorToken");
                }}
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <span>{item.name}</span>
              </RouterLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
