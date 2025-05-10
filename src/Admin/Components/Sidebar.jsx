import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Users,
  User,
  Link,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import image from '../../assets/logo.png'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [isPropertyOpen, setPropertyOpen] = useState(false);
  const [isAgentOpen, setAgentOpen] = useState(false);


  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      name: "Property",
      icon: <Home size={20} />,
      dropdown: true,
      isOpen: isPropertyOpen,
      toggle: () => setPropertyOpen(!isPropertyOpen),
      children: [
        // { name: "Add Property", path: "/admin/property" },
        { name: "All Properties", path: "/admin/view-property" },
        { name: "Home Loan", path: "/admin/loan-enquiry" },
      ],
    },
    {
      name: "Agents",
      icon: <Users size={20} />,
       path: "/admin/view-agent",
      // dropdown: true,
      // isOpen: isAgentOpen,
      // toggle: () => setAgentOpen(!isAgentOpen),
      // children: [
      //   { name: "Add Agent", path: "/admin/add-agent" },
      //   { name: "All Agents", path: "/admin/view-agent" },
      // ],
    },
    {
      name: "User",
      icon: <User size={20} />,
      path: "/admin/user-list",
    },
    {
      name: "Referral",
      icon: <Link size={20} />,
      path: "/admin/referrels",
    },
  ];


  const footerItems = [
    { name: "Logout", path: "/admin/login" },
  ];


  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`bg-white border-r border-gray-200 w-64 flex flex-col fixed inset-y-0 z-30
      transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
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
          <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden">
            <img
              src={image} // replace with your image path
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="ml-2 text-blue-500 font-bold text-lg">
            LANDOUSE
          </span>
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
                        ? "bg-blue-50 text-blue-500 border-l-4 border-blue-500"
                        : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      {item.isOpen ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                    {item.isOpen && (
                      <ul className="pl-12 mt-1">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <RouterLink
                              to={child.path}
                              className={`block py-2 text-sm rounded ${isActive(child.path) ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-800"
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
                      ? "bg-blue-50 text-blue-500 border-l-4 border-blue-500"
                      : "text-gray-600 hover:bg-gray-100"
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
                  localStorage.removeItem("adminId");
                  localStorage.removeItem("adminToken");
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
