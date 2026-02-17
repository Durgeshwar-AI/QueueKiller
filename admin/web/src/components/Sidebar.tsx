import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { logout } from "../redux/auth/authSlice";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      path: "/dashboard",
    },
    {
      id: "companies",
      label: "Companies",
      icon: "🏢",
      path: "/companies",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      className={`${isExpanded ? "w-64" : "w-20"} bg-linear-to-b from-slate-900 to-slate-800 text-white h-screen flex flex-col transition-all duration-300 shadow-xl`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {isExpanded && (
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
            QueueKiller
          </h1>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? "◀" : "▶"}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors text-left group"
              title={!isExpanded ? item.label : ""}
            >
              <span className="text-2xl shrink-0">{item.icon}</span>
              {isExpanded && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Divider */}
      <div className="border-t border-slate-700 mx-2"></div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-700 space-y-3">
        {isExpanded && (
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Admin User</p>
              <p className="text-xs text-slate-400 truncate">
                admin@example.com
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors text-left"
          title={!isExpanded ? "Logout" : ""}
        >
          <span className="text-xl shrink-0">🚪</span>
          {isExpanded && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
