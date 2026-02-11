import React, { useState, useEffect } from "react";
import {
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  QrCode,
  Search,
  Clock,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/auth/authSlice";

interface Booking {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  departmentName: string;
  scheduleDate: string;
  scheduleTime: string;
  qrCode: string;
  status: "Upcoming" | "Attended" | "Missed";
  verifiedAt?: string;
}

const Bookings = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Upcoming" | "Attended" | "Missed"
  >("All");
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [searchTerm, filterStatus, bookings]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const mockBookings: Booking[] = [
        {
          id: 1,
          userId: 101,
          userName: "John Doe",
          userEmail: "john@example.com",
          departmentName: "General Services",
          scheduleDate: "2025-02-15",
          scheduleTime: "09:00 - 12:00",
          qrCode: "QR123456789",
          status: "Upcoming",
        },
        {
          id: 2,
          userId: 102,
          userName: "Alice Smith",
          userEmail: "alice@example.com",
          departmentName: "Medical Consultation",
          scheduleDate: "2025-02-14",
          scheduleTime: "14:00 - 16:00",
          qrCode: "QR987654321",
          status: "Attended",
          verifiedAt: "2025-02-14 14:05",
        },
        {
          id: 3,
          userId: 103,
          userName: "Bob Johnson",
          userEmail: "bob@example.com",
          departmentName: "Support Team",
          scheduleDate: "2025-02-13",
          scheduleTime: "10:00 - 12:00",
          qrCode: "QR555555555",
          status: "Missed",
        },
        {
          id: 4,
          userId: 104,
          userName: "Sarah Williams",
          userEmail: "sarah@example.com",
          departmentName: "General Services",
          scheduleDate: "2025-02-16",
          scheduleTime: "10:00 - 13:00",
          qrCode: "QR111111111",
          status: "Upcoming",
        },
      ];
      setBookings(mockBookings);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    if (filterStatus !== "All") {
      filtered = filtered.filter((b) => b.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (b) =>
          b.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.qrCode.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredBookings(filtered);
  };

  const handleVerifyBooking = async (id: number) => {
    try {
      const booking = bookings.find((b) => b.id === id);
      if (!booking) return;

      const updatedBookings = bookings.map((b) =>
        b.id === id
          ? {
              ...b,
              status: "Attended" as const,
              verifiedAt: new Date().toLocaleString(),
            }
          : b,
      );

      setBookings(updatedBookings);
      setSuccess(`Booking verified for ${booking.userName}`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to verify booking");
    }
  };

  const handleMarkMissed = async (id: number) => {
    try {
      const booking = bookings.find((b) => b.id === id);
      if (!booking) return;

      const updatedBookings = bookings.map((b) =>
        b.id === id ? { ...b, status: "Missed" as const } : b,
      );

      setBookings(updatedBookings);
      setSuccess(`Booking marked as missed for ${booking.userName}`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update booking");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "Attended":
        return "bg-green-100 text-green-800";
      case "Missed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Attended":
        return <CheckCircle className="w-4 h-4" />;
      case "Missed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Verify Bookings
              </h1>
              <p className="text-gray-600 text-sm">
                Verify and track customer bookings
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-green-700">{success}</p>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <p className="text-gray-600 text-sm">Upcoming</p>
                <p className="text-2xl font-bold text-blue-600">
                  {bookings.filter((b) => b.status === "Upcoming").length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <p className="text-gray-600 text-sm">Attended</p>
                <p className="text-2xl font-bold text-green-600">
                  {bookings.filter((b) => b.status === "Attended").length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <p className="text-gray-600 text-sm">Missed</p>
                <p className="text-2xl font-bold text-red-600">
                  {bookings.filter((b) => b.status === "Missed").length}
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or QR code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Attended">Attended</option>
                <option value="Missed">Missed</option>
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Loading bookings...</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Schedule
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-8 text-center text-gray-600"
                        >
                          No bookings found
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {booking.userName}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {booking.userEmail}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {booking.departmentName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <p>
                              {new Date(
                                booking.scheduleDate,
                              ).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {booking.scheduleTime}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  booking.status,
                                )}`}
                              >
                                {getStatusIcon(booking.status)}
                                {booking.status}
                              </span>
                              {booking.verifiedAt && (
                                <span className="text-xs text-gray-600">
                                  {booking.verifiedAt}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm space-x-2">
                            <button
                              onClick={() => {
                                setSelectedBooking(booking);
                                setShowQRModal(true);
                              }}
                              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-flex items-center gap-1"
                            >
                              <QrCode className="w-4 h-4" />
                              QR Code
                            </button>
                            {booking.status === "Upcoming" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleVerifyBooking(booking.id)
                                  }
                                  className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg transition inline-flex items-center gap-1"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Verify
                                </button>
                                <button
                                  onClick={() => handleMarkMissed(booking.id)}
                                  className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition inline-flex items-center gap-1"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Missed
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 p-8">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
            >
              <XCircle className="w-6 h-6" />
            </button>

            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-4">QR Code</h2>
              <div className="bg-gray-100 p-6 rounded-lg mb-4">
                <div className="w-full aspect-square bg-gray-300 rounded-lg flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-gray-400" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Code: {selectedBooking.qrCode}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {selectedBooking.userName}
              </p>
              <button
                onClick={() => setShowQRModal(false)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
