import { useState } from "react";
import {
  BarChart3,
  Users,
  Calendar,
  Clock,
  Settings,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import DepartmentsTab from "../components/Dashboard/DepartmentsTab";
import SchedulesTab from "../components/Dashboard/SchedulesTab";
import BookingsTab from "../components/Dashboard/BookingsTab";
import SettingsTab from "../components/Dashboard/SettingsTab";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { logout } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

type TabType = "departments" | "schedules" | "bookings" | "settings";

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<object>;
}

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("departments");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name } = useAppSelector((s) => s.auth);

  const tabs: TabConfig[] = [
    {
      id: "departments",
      label: "Departments",
      icon: <Users size={20} />,
      component: DepartmentsTab,
    },
    {
      id: "schedules",
      label: "Schedules",
      icon: <Calendar size={20} />,
      component: SchedulesTab,
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: <Clock size={20} />,
      component: BookingsTab,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      component: SettingsTab,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/company/login");
  };

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Company Dashboard
                </h1>
                <p className="text-slate-600 mt-1">{name || "Welcome"}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 font-medium transition-all relative group ${
                  activeTab === tab.id
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {ActiveComponent && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ActiveComponent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CompanyDashboard;
