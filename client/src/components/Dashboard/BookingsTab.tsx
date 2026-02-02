import { useCallback, useEffect, useState } from "react";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import axios, { AxiosError } from "axios";
import { motion } from "motion/react";

interface Booking {
  id: string;
  customer_name: string;
  department_id: string;
  booking_date: string;
  booking_time: string;
  status: "confirmed" | "cancelled" | "pending";
  queue_number: number;
}

type FilterStatus = "all" | "confirmed" | "pending" | "cancelled";

const BookingsTab = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/company/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }> | Error;
      if (error instanceof AxiosError && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to fetch bookings");
      }
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="text-green-600" size={20} />;
      case "cancelled":
        return <XCircle className="text-red-600" size={20} />;
      case "pending":
        return <Clock className="text-yellow-600" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 border-green-200 hover:border-green-300";
      case "cancelled":
        return "bg-red-50 border-red-200 hover:border-red-300";
      case "pending":
        return "bg-yellow-50 border-yellow-200 hover:border-yellow-300";
      default:
        return "bg-slate-50 border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-slate-200 p-4 animate-pulse"
            >
              <div className="h-4 bg-slate-200 rounded w-2/3 mb-2" />
              <div className="h-6 bg-slate-200 rounded w-1/2" />
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-slate-200 p-4 animate-pulse"
            >
              <div className="h-6 bg-slate-200 rounded w-1/3 mb-2" />
              <div className="h-4 bg-slate-100 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3"
        >
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">Error</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </motion.div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-slate-900">Bookings</h2>
        <p className="text-slate-600 text-sm mt-1">
          View and manage all customer bookings
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "confirmed", "pending", "cancelled"] as const).map(
          (status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === status
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "bg-slate-200 text-slate-900 hover:bg-slate-300"
              }`}
            >
              {status === "all"
                ? "All"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </motion.button>
          ),
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total",
            count: bookings.length,
            color: "bg-slate-100 text-slate-900",
          },
          {
            label: "Confirmed",
            count: bookings.filter((b) => b.status === "confirmed").length,
            color: "bg-green-100 text-green-700",
          },
          {
            label: "Pending",
            count: bookings.filter((b) => b.status === "pending").length,
            color: "bg-yellow-100 text-yellow-700",
          },
          {
            label: "Cancelled",
            count: bookings.filter((b) => b.status === "cancelled").length,
            color: "bg-red-100 text-red-700",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`${stat.color} rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow`}
          >
            <p className="text-xs font-medium opacity-75">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.count}</p>
          </motion.div>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-lg border border-dashed border-slate-300"
          >
            <Clock size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600 font-medium">No bookings found</p>
            <p className="text-slate-500 text-sm mt-1">
              Bookings will appear here once customers make reservations
            </p>
          </motion.div>
        ) : (
          filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-lg border-2 p-5 hover:shadow-md hover:scale-[1.01] transition-all duration-200 ${getStatusColor(booking.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {getStatusIcon(booking.status)}
                    <h3 className="font-semibold text-slate-900 text-lg">
                      {booking.customer_name}
                    </h3>
                    <span className="text-xs px-3 py-1 bg-slate-200 rounded-full text-slate-700 font-medium">
                      Queue #{booking.queue_number}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Department ID:{" "}
                    <span className="font-medium">{booking.department_id}</span>
                  </p>
                  <div className="flex gap-6 text-sm flex-wrap">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <Clock size={16} />
                      {booking.booking_date} at {booking.booking_time}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingsTab;
