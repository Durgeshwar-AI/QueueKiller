import { useState, type FC } from "react";
import {
  BarChart3,
  Users,
  DollarSign,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: FC<{ className?: string }>;
  color: string;
  bgColor: string;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  status: "active" | "completed" | "inactive";
}

const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState("today");

  const metrics = [
    {
      label: "Revenue",
      value: "$24,530",
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      label: "Active Users",
      value: "3,240",
      change: "+8.2%",
      trend: "up" as const,
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      label: "System Health",
      value: "99.2%",
      change: "+0.4%",
      trend: "up" as const,
      icon: BarChart3,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  const userActivity = [
    {
      id: 1,
      user: "John Smith",
      action: "Joined queue",
      time: "2 min ago",
      status: "active" as const,
    },
    {
      id: 2,
      user: "Emma Davis",
      action: "Completed service",
      time: "8 min ago",
      status: "completed" as const,
    },
    {
      id: 3,
      user: "Michael Chen",
      action: "Joined queue",
      time: "15 min ago",
      status: "active" as const,
    },
    {
      id: 4,
      user: "Sarah Johnson",
      action: "Exited queue",
      time: "22 min ago",
      status: "inactive" as const,
    },
    {
      id: 5,
      user: "Alex Rivera",
      action: "Joined queue",
      time: "31 min ago",
      status: "active" as const,
    },
  ];

  const systemMetrics = [
    {
      label: "API Response Time",
      value: "145ms",
      target: "<200ms",
      status: "good",
    },
    { label: "Server Load", value: "62%", target: "<80%", status: "good" },
    {
      label: "Database Query Time",
      value: "89ms",
      target: "<100ms",
      status: "good",
    },
    {
      label: "Queue Processing",
      value: "2,847 items/hr",
      target: ">2000/hr",
      status: "good",
    },
  ];

  const revenueData = [
    { name: "Mon", amount: 3200 },
    { name: "Tue", amount: 2800 },
    { name: "Wed", amount: 4100 },
    { name: "Thu", amount: 3900 },
    { name: "Fri", amount: 5200 },
    { name: "Sat", amount: 4800 },
    { name: "Sun", amount: 3530 },
  ];

  const maxRevenue = Math.max(...revenueData.map((d) => d.amount));

  const MetricCard: FC<{ metric: Metric }> = ({ metric }) => {
    const Icon = metric.icon;
    const isUp = metric.trend === "up";

    return (
      <div className="border border-indigo-200 rounded-lg p-6 bg-white hover:border-indigo-300 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
            <p className="text-3xl font-semibold text-gray-900 mt-2">
              {metric.value}
            </p>
            <div
              className={`flex items-center gap-1 mt-3 text-sm font-medium ${isUp ? "text-green-600" : "text-red-600"}`}
            >
              {isUp ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              {metric.change}
            </div>
          </div>
          <div className={`p-3 ${metric.bgColor} rounded-lg`}>
            <Icon className={`w-6 h-6 ${metric.color}`} />
          </div>
        </div>
      </div>
    );
  };

  const ActivityItem: FC<{ activity: Activity }> = ({ activity }) => {
    const statusColors: Record<Activity["status"], string> = {
      active: "bg-indigo-100 text-indigo-700",
      completed: "bg-green-100 text-green-700",
      inactive: "bg-gray-100 text-gray-700",
    };

    return (
      <div className="flex items-center justify-between py-3 border-b border-indigo-100 last:border-b-0">
        <div className="flex-1">
          <p className="text-gray-900 font-medium text-sm">{activity.user}</p>
          <p className="text-gray-600 text-xs mt-1">{activity.action}</p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${statusColors[activity.status]}`}
          >
            {activity.status}
          </span>
          <span className="text-gray-500 text-xs">{activity.time}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-indigo-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">System overview and metrics</p>
            </div>
            <div className="flex gap-2">
              {["today", "week", "month"].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    timeframe === period
                      ? "bg-linear-to-br from-indigo-600 to-indigo-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {metrics.map((metric, idx) => (
            <MetricCard key={idx} metric={metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 border border-indigo-200 rounded-lg p-6 bg-white">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Revenue</h2>
              <p className="text-gray-600 text-sm mt-1">Last 7 days</p>
            </div>

            <div className="flex items-end justify-between gap-2 h-48">
              {revenueData.map((data, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <div className="relative w-full flex justify-center mb-2">
                    <div
                      className="bg-linear-to-b from-indigo-600 to-indigo-800 rounded-t transition-all hover:from-indigo-500 hover:to-indigo-700"
                      style={{
                        height: `${(data.amount / maxRevenue) * 160}px`,
                        width: "100%",
                      }}
                    />
                  </div>
                  <span className="text-gray-600 text-xs font-medium">
                    {data.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-indigo-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Average</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    $
                    {(
                      revenueData.reduce((a, b) => a + b.amount, 0) /
                      revenueData.length
                    ).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    $
                    {revenueData
                      .reduce((a, b) => a + b.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User Activity Summary */}
          <div className="border border-indigo-200 rounded-lg p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              User Activity
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">Active Users</span>
                  <span className="text-gray-900 font-semibold">2,847</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: "87%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">
                    Waiting in Queue
                  </span>
                  <span className="text-gray-900 font-semibold">342</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: "32%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">Served Today</span>
                  <span className="text-gray-900 font-semibold">4,521</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>
            </div>

            <button className="w-full py-2 px-4 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 font-medium text-sm rounded-lg transition-colors">
              View Details
            </button>
          </div>
        </div>

        {/* System Metrics and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Metrics */}
          <div className="border border-indigo-200 rounded-lg p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              System Performance
            </h2>

            <div className="space-y-4">
              {systemMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3 border-b border-indigo-100 last:border-b-0"
                >
                  <div>
                    <p className="text-gray-900 text-sm font-medium">
                      {metric.label}
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      Target: {metric.target}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-semibold text-sm">
                      {metric.value}
                    </span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-indigo-200 flex items-center gap-2 text-green-600 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              All systems operational
            </div>
          </div>

          {/* Recent Activity */}
          <div className="border border-indigo-200 rounded-lg p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Recent Activity
            </h2>

            <div>
              {userActivity.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>

            <button className="w-full mt-6 py-2 px-4 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 font-medium text-sm rounded-lg transition-colors">
              View All Activity
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
