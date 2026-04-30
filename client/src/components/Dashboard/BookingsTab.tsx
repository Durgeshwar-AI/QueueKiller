import { useCallback, useEffect, useState } from "react";
import { Clock, CheckCircle, AlertCircle, QrCode, X } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import QRScanner from "./QRScanner";

interface Booking {
  id: number;
  status: string;
  qrCode: string;
  user: {
    name: string;
    email: string;
  };
  schedules: {
    date: string;
    startTime: string;
    department: {
        name: string;
    }
  };
}

interface VerificationResult {
  success: boolean;
  message: string;
  booking?: Booking;
}

const API_BASE = process.env.API_URL || "http://localhost:8000";

const BookingsTab = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE}/api/company/bookings/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data.bookings);
    } catch (err) {
      setError(`Failed to fetch bookings: ${err}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleScanSuccess = async (decodedText: string) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${API_BASE}/api/company/bookings/verify`, 
            { qrCode: decodedText },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setVerificationResult({ success: true, message: res.data.message, booking: res.data.booking });
        setShowScanner(false);
        fetchBookings();
    } catch (err: unknown) {
        let message = "Verification failed";
        if (axios.isAxiosError(err) && err.response?.data?.message) {
            message = err.response.data.message;
        }
        setVerificationResult({ success: false, message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Booking Management</h2>
            <p className="text-slate-600 mt-1">Verify and manage customer check-ins</p>
        </div>
        <button
            onClick={() => setShowScanner(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
        >
            <QrCode size={20} />
            Scan QR Code
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
             <div className="col-span-full py-12 text-center">Loading bookings...</div>
        ) : bookings.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No bookings yet</p>
            </div>
        ) : (
            bookings.map((booking) => (
                <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:border-blue-300 transition-all group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                            <Clock className="text-blue-600" size={24} />
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                            booking.status === 'Attended' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                            {booking.status}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{booking.user.name}</h3>
                    <p className="text-sm text-slate-500 mb-4">{booking.schedules.department.name}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700 border-t pt-4">
                        <CheckCircle size={16} className="text-green-500" />
                        {new Date(booking.schedules.date).toLocaleDateString()} at {new Date(booking.schedules.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </motion.div>
            ))
        )}
      </div>

      {/* Scanner Modal */}
      <AnimatePresence>
        {showScanner && (
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
                <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
                    <button 
                        onClick={() => setShowScanner(false)}
                        className="absolute right-6 top-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={24} className="text-slate-400" />
                    </button>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-6 pr-12">Verify Booking QR</h3>
                    <QRScanner onScanSuccess={handleScanSuccess} />
                    <p className="text-center text-slate-500 mt-6 text-sm">Position the customer's QR code within the frame</p>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Verification Result Toast/Modal */}
      <AnimatePresence>
        {verificationResult && (
            <motion.div
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60]"
            >
                <div className={`px-8 py-4 rounded-2xl shadow-2xl border flex items-center gap-4 ${
                    verificationResult.success ? 'bg-green-600 border-green-700 text-white' : 'bg-red-600 border-red-700 text-white'
                }`}>
                    {verificationResult.success ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                    <div>
                        <p className="font-bold">{verificationResult.success ? 'Success!' : 'Error'}</p>
                        <p className="text-sm opacity-90">{verificationResult.message}</p>
                    </div>
                    <button onClick={() => setVerificationResult(null)} className="ml-4 opacity-70 hover:opacity-100"><X size={20}/></button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingsTab;
