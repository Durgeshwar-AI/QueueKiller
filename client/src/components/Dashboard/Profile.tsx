import { useEffect, useState } from "react";
import {
  User,
  Users,
  TrendingUp,
  CalendarCheck,
  Calendar,
  Clock,
  Building2,
  QrCode as QrIcon,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { fetchUserBookings } from "../../redux/bookingsSlice";
import Navbar from "../Navbar";
import { QRCodeSVG } from "qrcode.react";
import type { IBooking } from "../../types";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { name, email } = useAppSelector((s) => s.auth);
  const { bookings, loading } = useAppSelector((s) => s.bookings);
  
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  const handleViewQRCode = (booking: IBooking) => {
    setSelectedBooking(booking);
    setShowQRModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-indigo-600 text-white";
      case "attended":
        return "bg-green-500 text-white";
      case "missed":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const upcomingBookings = bookings.filter(b => b.status === "Upcoming");
  const pastBookings = bookings.filter(b => b.status !== "Upcoming");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-indigo-600 rounded-2xl flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{name || "User"}</h1>
                <p className="text-gray-500">{email || "No email provided"}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-gray-500 text-sm">Total</p>
                  <p className="text-xl font-bold text-gray-900">{bookings.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-gray-500 text-sm">Upcoming</p>
                  <p className="text-xl font-bold text-gray-900">{upcomingBookings.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-gray-500 text-sm">Attended</p>
                  <p className="text-xl font-bold text-gray-900">{bookings.filter(b => b.status === "Attended").length}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bookings */}
          {loading ? (
             <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
             </div>
          ) : (
            <>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
                <div className="space-y-4">
                  {upcomingBookings.length === 0 && <p className="text-gray-500">No upcoming appointments.</p>}
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.schedules?.department?.name || "Department"}</h3>
                            <p className="text-gray-500 text-sm">{booking.schedules?.department?.company?.name || "Company"}</p>
                          </div>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-indigo-600" />
                            <p className="font-medium text-gray-900">
                                {booking.schedules ? new Date(booking.schedules.date).toLocaleDateString() : "Date N/A"}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-green-600" />
                            <p className="font-medium text-gray-900">
                                {booking.schedules 
                                    ? new Date(booking.schedules.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                                    : "Time N/A"}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewQRCode(booking)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                        >
                          <QrIcon className="w-5 h-5" />
                          View QR Code
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {pastBookings.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Past Appointments</h2>
                  <div className="space-y-4 opacity-75">
                    {pastBookings.map((booking) => (
                      <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900">{booking.schedules?.department?.name}</h3>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${getStatusColor(booking.status)}`}>
                                {booking.status}
                            </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* QR Modal */}
        <AnimatePresence>
          {showQRModal && selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowQRModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-sm w-full text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold text-gray-900">Your Booking QR</h3>
                   <X className="cursor-pointer" onClick={() => setShowQRModal(false)} />
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-inner inline-block border-2 border-indigo-100 mb-6">
                    <QRCodeSVG value={selectedBooking.qrCode} size={200} />
                </div>
                <p className="text-gray-500 text-sm">Show this QR code at the counter for verification.</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Profile;
