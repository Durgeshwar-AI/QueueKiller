import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Calendar from "../components/Calender";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { bookSchedule, verifyPayment } from "../redux/bookingsSlice";
import axios from "axios";

import type { ISchedule, IRazorpayResponse } from "../types";

interface PaymentBreakdownModalProps {
  isOpen: boolean;
  bookingPrice: number;
  platformFee: number;
  totalAmount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const PaymentBreakdownModal = ({
  isOpen,
  bookingPrice,
  platformFee,
  totalAmount,
  onConfirm,
  onCancel,
}: PaymentBreakdownModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Payment Breakdown
        </h2>

        <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Booking Price:</span>
            <span className="text-lg font-semibold text-slate-900">
              ₹{bookingPrice}
            </span>
          </div>
          <div className="border-t border-slate-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-600">
                Platform Fee (5% cap ₹100):
              </span>
              <span className="text-lg font-semibold text-blue-600">
                ₹{platformFee}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              5% of booking price, maximum ₹100
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-900 font-bold text-lg">
                Total Amount:
              </span>
              <span className="text-2xl font-bold text-green-600">
                ₹{totalAmount}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-slate-200 text-slate-900 font-bold rounded-lg hover:bg-slate-300 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-md"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

// Use VITE_ prefixed environment variables or fall back
const API_BASE =
  (import.meta.env.VITE_API_URL as string) ||
  process.env.API_URL ||
  "http://localhost:8000";

const BookSchedule = () => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingPaymentData, setPendingPaymentData] = useState<{
    scheduleId: number;
    orderId: string;
    amount: number;
    currency: string;
    bookingPrice: number;
    platformFee: number;
    totalAmount: number;
  } | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth);

  const [query] = useSearchParams();
  const deptId = query.get("deptId");

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      console.log(
        "Fetch triggered - deptId:",
        deptId,
        "date:",
        date,
        "token:",
        token ? "exists" : "missing",
      );

      if (!deptId) {
        console.log("No deptId provided");
        setSchedules([]);
        setError("Department ID is required");
        setLoading(false);
        return;
      }

      if (!token) {
        console.log("No token, user not authenticated");
        setError("Please login first");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        // Get local date components to avoid timezone shifts
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;
        console.log("Selected date:", date);
        console.log("Formatted dateStr:", dateStr);
        console.log(
          "Fetching schedules from:",
          `${API_BASE}/api/user/schedules/${deptId}?date=${dateStr}`,
        );

        const res = await axios.get(
          `${API_BASE}/api/user/schedules/${deptId}?date=${dateStr}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log("Schedules fetched:", res.data.schedules);
        setSchedules(res.data.schedules);
        setError(null);
      } catch (err: unknown) {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.message
          : "Failed to load schedules";
        console.error("Error fetching schedules:", err);
        setError(message || "Failed to load schedules");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [deptId, date, token]);

  const handleBooking = async (scheduleId: number) => {
    try {
      setBookingId(scheduleId);
      const res = await loadRazorpay();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setBookingId(null);
        return;
      }

      const resultAction = await dispatch(bookSchedule(scheduleId));
      if (bookSchedule.fulfilled.match(resultAction)) {
        const orderData = resultAction.payload;

        // Store payment data and show modal
        setPendingPaymentData({
          scheduleId,
          orderId: orderData.orderId,
          amount: orderData.amount,
          currency: orderData.currency,
          bookingPrice: orderData.bookingPrice,
          platformFee: orderData.platformFee,
          totalAmount: orderData.totalAmount,
        });
        setShowPaymentModal(true);
      }
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setBookingId(null);
    }
  };

  const handleConfirmPayment = async () => {
    if (!pendingPaymentData) return;

    const {
      scheduleId,
      orderId,
      amount,
      currency,
      bookingPrice,
      platformFee,
      totalAmount,
    } = pendingPaymentData;

    const options = {
      key: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
      amount,
      currency,
      name: "QueueKiller",
      description: "Slot Booking Fee",
      order_id: orderId,
      handler: async (response: IRazorpayResponse) => {
        const verifyRes = await dispatch(
          verifyPayment({
            ...response,
            scheduleId,
            bookingPrice,
            platformFee,
            totalAmount,
          }),
        );
        if (verifyPayment.fulfilled.match(verifyRes)) {
          alert("Booking Confirmed!");
          setShowPaymentModal(false);
          setPendingPaymentData(null);
          navigate("/profile"); // Redirect to bookings page
        }
      },
      prefill: {
        name: user.name,
        email: user.email || "user@example.com",
      },
      theme: {
        color: "#3b82f6",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setShowPaymentModal(false);
  };

  return (
    <>
      <Navbar />
      <PaymentBreakdownModal
        isOpen={showPaymentModal}
        bookingPrice={pendingPaymentData?.bookingPrice || 0}
        platformFee={pendingPaymentData?.platformFee || 0}
        totalAmount={pendingPaymentData?.totalAmount || 0}
        onConfirm={handleConfirmPayment}
        onCancel={() => {
          setShowPaymentModal(false);
          setPendingPaymentData(null);
        }}
      />
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Book Appointment
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Secure your slot in just a few clicks
            </p>
          </div>

          {error && (
            <div className="max-w-md mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl relative flex items-center gap-3">
              <span className="font-bold">Error:</span>
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
              <Calendar
                selectedDate={date}
                onDateChange={setDate}
                minDate={new Date()}
              />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                All Slots
              </h2>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : schedules.length === 0 ? (
                <p className="text-slate-500 text-center py-12">
                  No slots available for this date.
                </p>
              ) : (
                <div className="space-y-4">
                  {schedules.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div>
                        <p className="font-bold text-slate-900">
                          {new Date(s.startTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-sm text-slate-500">
                          {s.status === "Available"
                            ? "Available for booking"
                            : `Status: ${s.status}`}
                        </p>
                      </div>
                      <button
                        onClick={() => handleBooking(s.id)}
                        disabled={s.status !== "Available" || bookingId === s.id}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${
                          s.status === "Available"
                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        {bookingId === s.id ? "Processing..." : s.status === "Available" ? "Book Now" : s.status}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookSchedule;
