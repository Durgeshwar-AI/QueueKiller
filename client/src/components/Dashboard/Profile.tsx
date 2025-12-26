import { useState } from "react";
import {
  User,
  Users,
  TrendingUp,
  CalendarCheck,
  Calendar,
  Clock,
  Building2,
  QrCode,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppSelector } from "../../hooks/reduxHooks";
import Navbar from "../Navbar";

interface Appointment {
  id: string;
  department: string;
  company: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

// Mock data - replace with actual data from API
const mockAppointments: Appointment[] = [
  {
    id: "1",
    department: "Human Resources",
    company: "TechCorp Solutions",
    date: "Oct 28, 2025",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    id: "2",
    department: "IT Support",
    company: "TechCorp Solutions",
    date: "Oct 30, 2025",
    time: "2:30 PM",
    status: "upcoming",
  },
  {
    id: "3",
    department: "Finance",
    company: "TechCorp Solutions",
    date: "Oct 15, 2025",
    time: "11:00 AM",
    status: "completed",
  },
];

const Profile = () => {
  const { name } = useAppSelector((s) => s.auth);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);

  // Calculate stats
  const totalAppointments = mockAppointments.length;
  const upcomingAppointments = mockAppointments.filter(
    (a) => a.status === "upcoming"
  ).length;
  const completedAppointments = mockAppointments.filter(
    (a) => a.status === "completed"
  ).length;

  const handleViewQRCode = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowQRModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-indigo-600 text-white";
      case "completed":
        return "bg-green-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-indigo-600 rounded-2xl flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {name || "John Doe"}
                </h1>
                <p className="text-gray-500">a@a.c</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-gray-500 text-sm">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    {totalAppointments}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-gray-500 text-sm">Upcoming</p>
                  <p className="text-xl font-bold text-gray-900">
                    {upcomingAppointments}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <p className="text-xl font-bold text-gray-900">
                    {completedAppointments}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Appointments Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upcoming Appointments
            </h2>

            <div className="space-y-4">
              {mockAppointments
                .filter((a) => a.status === "upcoming")
                .map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Department Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {appointment.department}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {appointment.company}
                          </p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    {/* Divider */}
                    <hr className="my-4 border-gray-100" />

                    {/* Date, Time and QR Button */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">Date</p>
                            <p className="font-medium text-gray-900">
                              {appointment.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">Time</p>
                            <p className="font-medium text-gray-900">
                              {appointment.time}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleViewQRCode(appointment)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                      >
                        <QrCode className="w-5 h-5" />
                        View QR Code
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Completed Appointments Section */}
          {completedAppointments > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Completed Appointments
              </h2>

              <div className="space-y-4">
                {mockAppointments
                  .filter((a) => a.status === "completed")
                  .map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg p-6 opacity-75"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Department Info */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {appointment.department}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {appointment.company}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </div>

                      {/* Divider */}
                      <hr className="my-4 border-gray-100" />

                      {/* Date and Time */}
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">Date</p>
                            <p className="font-medium text-gray-900">
                              {appointment.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">Time</p>
                            <p className="font-medium text-gray-900">
                              {appointment.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* QR Code Modal */}
        <AnimatePresence>
          {showQRModal && selectedAppointment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowQRModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Appointment QR Code
                  </h3>
                  <button
                    onClick={() => setShowQRModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center mb-4">
                  {/* Placeholder QR Code - replace with actual QR code library */}
                  <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <QrCode className="w-24 h-24 text-gray-400" />
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-medium text-gray-900">
                    {selectedAppointment.department}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {selectedAppointment.date} at {selectedAppointment.time}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Profile;
