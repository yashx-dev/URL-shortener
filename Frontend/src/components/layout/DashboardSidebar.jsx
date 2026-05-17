import { NavLink, useLocation } from "react-router-dom";
import {
  LinkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import useAuth from "../../hooks/useAuth";

const DashboardSidebar = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: ChartBarIcon, exact: true },
    {
      name: "My Links",
      href: "/dashboard?tab=urls",
      icon: LinkIcon,
      exact: false,
    },
    {
      name: "Profile",
      href: "/dashboard?tab=profile",
      icon: UserCircleIcon,
      exact: false,
    },
  ];

  const isActive = (item) => {
    if (item.exact)
      return location.pathname === item.href.split("?")[0] && !location.search;
    const tab = new URLSearchParams(location.search).get("tab");
    if (item.href.includes("tab=urls")) return tab === "urls";
    if (item.href.includes("tab=profile")) return tab === "profile";
    return false;
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      {/* User Profile Summary */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <UserCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={() => onNavigate?.()}
            className={`
              group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${
                isActive(item)
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              }
            `}
          >
            <item.icon
              className={`
              h-5 w-5 shrink-0 transition-colors
              ${isActive(item) ? "text-blue-600 dark:text-blue-400" : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"}
            `}
            />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
