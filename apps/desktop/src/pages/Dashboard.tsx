import React, { useState, useEffect } from "react";
import {
  Clock,
  Users,
  TrendingUp,
  Settings,
  BarChart3,
  LogOut,
  Building2,
  Plus,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/auth/authSlice";
import Sidebar from "../components/Sidebar";

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  color: string;
}

interface RecentActivity {
  id: number;
  type: "booking" | "schedule" | "department";
  message: string;
  time: string;
  icon: React.ReactNode;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { companyName, companyId } = useSelector(
    (state: RootState) => state.auth,
  );
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<StatCard[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dashboard data
    const mockStats: StatCard[] = [
      {
        icon: <Users className="w-6 h-6" />,
        label: "Total Bookings",
        value: "324",
        trend: "+12% from last week",
        color: "blue",
      },
      {
        icon: <Clock className="w-6 h-6" />,
        label: "Upcoming Slots",
        value: "48",
        trend: "+5 today",
        color: "green",
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        label: "Occupancy Rate",
        value: "78%",
        trend: "Above target",
        color: "purple",
      },
      {
        icon: <Building2 className="w-6 h-6" />,
        label: "Departments",
        value: "5",
        color: "orange",
      },
    ];

    const mockActivity: RecentActivity[] = [
      {
        id: 1,
        type: "booking",
        message: "New booking from John Doe",
        time: "2 minutes ago",
        icon: <CheckCircle className="w-4 h-4 text-green-600" />,
      },
      {
        id: 2,
        type: "schedule",
        message: "Schedule updated for General Department",
        time: "1 hour ago",
        icon: <Calendar className="w-4 h-4 text-blue-600" />,
      },
      {
        id: 3,
        type: "booking",
        message: "Booking cancelled by Alice Smith",
        time: "3 hours ago",
        icon: <AlertCircle className="w-4 h-4 text-red-600" />,
      },
      {
        id: 4,
        type: "department",
        message: "Health Department opened",
        time: "1 day ago",
        icon: <Building2 className="w-4 h-4 text-purple-600" />,
      },
    ];

    setStats(mockStats);
    setRecentActivity(mockActivity);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 text-sm">{companyName}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/settings")}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Settings"
              >
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
                >
                  <div className={`text-${stat.color}-600 mb-2`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  {stat.trend && (
                    <p className="text-xs text-gray-500 mt-2">{stat.trend}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Quick Actions
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => navigate("/schedules")}
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
                    >
                      <Calendar className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                        Manage Schedules
                      </span>
                    </button>
                    <button
                      onClick={() => navigate("/departments")}
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition group"
                    >
                      <Building2 className="w-8 h-8 text-gray-400 group-hover:text-green-600 mb-2" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">
                        Departments
                      </span>
                    </button>
                    <button
                      onClick={() => navigate("/bookings")}
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition group"
                    >
                      <Users className="w-8 h-8 text-gray-400 group-hover:text-purple-600 mb-2" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">
                        Verify Bookings
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3 text-sm">
                      <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.message}</p>
                        <p className="text-gray-500 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
