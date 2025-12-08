import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Calendar from "../components/Calender";

interface Schedule {
  id: string;
  start: string;
  end: string;
  booked: boolean;
}

const demoSchedule: Schedule[] = [
  {
    id: "1",
    start: "09:00",
    end: "10:00",
    booked: false,
  },
  {
    id: "2",
    start: "10:00",
    end: "11:00",
    booked: true,
  },
  {
    id: "3",
    start: "11:00",
    end: "12:00",
    booked: false,
  },
  {
    id: "4",
    start: "14:00",
    end: "15:00",
    booked: false,
  },
  {
    id: "5",
    start: "15:00",
    end: "16:00",
    booked: true,
  }
];

const URL = import.meta.env.VITE_API_URL;

const getISODate = (d = new Date()) => d.toISOString().split("T")[0];

const BookSchedule = () => {
  const [company, setCompany] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(new Date());

  const { id } = useParams();

  const fetchData = async (dateStr: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${URL}/schedule/`, {
        params: { date: dateStr },
      });

      setCompany(res.data.company);
      setDepartment(res.data.department);
      const schedulesData = res.data.schedule || res.data.schedules || [];
      const sorted = schedulesData.sort((a: Schedule, b: Schedule) =>
        a.start.localeCompare(b.start)
      );
      setSchedules(sorted);
      // Remove this line in production - only for demo
      setSchedules(demoSchedule);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setSchedules([]);
        setError(null);
      } else {
        setError("Failed to load schedules. Please try again.");
        setSchedules([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(getISODate(date));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const book = async (scheduleId: string) => {
    try {
      setBookingId(scheduleId);
      setError(null);
      setSuccess(null);

      await axios.put(`${URL}/schedule/book`, {
        date: getISODate(date),
        id: scheduleId,
        cid: id || "66f4d8e9c2c7a2f8b4d3c123",
      });

      setSuccess("Schedule booked successfully!");
      await fetchData(getISODate(date));

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Failed to book schedule. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setBookingId(null);
    }
  };

  const formatTime = (time: string) => {
    try {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return time;
    }
  };

  const isPast = (checkDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const check = new Date(checkDate);
    check.setHours(0, 0, 0, 0);
    return check < today;
  };

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    fetchData(getISODate(newDate));
    setError(null);
    setSuccess(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Your Appointment</h1>
            <p className="text-lg text-gray-600">
              Select a date and choose your preferred time slot
            </p>
            {(company || department) && (
              <div className="mt-4 inline-flex items-center space-x-4 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
                {company && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{company}</span>
                  </div>
                )}
                {department && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{department}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="mb-6 mx-auto max-w-2xl bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="ml-auto flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400 hover:text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 mx-auto max-w-2xl bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{success}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar Component */}
            <Calendar 
              selectedDate={date}
              onDateChange={handleDateChange}
              minDate={new Date()}
            />

            {/* Time Slots */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Available Time Slots
                </h2>
                <p className="text-gray-600">
                  {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                  <p className="mt-4 text-gray-600">Loading time slots...</p>
                </div>
              ) : schedules.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    No slots available
                  </h3>
                  <p className="text-gray-500">
                    Please select a different date.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className={`
                        flex items-center justify-between p-4 rounded-xl transition-all border-2
                        ${schedule.booked
                          ? "bg-gray-50 border-gray-200"
                          : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:shadow-md hover:scale-[1.02]"
                        }
                      `}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`
                            flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center
                            ${schedule.booked
                              ? "bg-gray-200"
                              : "bg-gradient-to-br from-blue-500 to-purple-600"
                            }
                          `}
                        >
                          <svg
                            className={`h-6 w-6 ${schedule.booked ? "text-gray-500" : "text-white"}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-base font-semibold text-gray-900">
                            {formatTime(schedule.start)} - {formatTime(schedule.end)}
                          </p>
                          <p className={`text-sm font-medium ${schedule.booked ? "text-gray-500" : "text-blue-600"}`}>
                            {schedule.booked ? "Already Booked" : "Available Now"}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => book(schedule.id)}
                        disabled={schedule.booked || bookingId === schedule.id || isPast(date)}
                        className={`
                          px-6 py-2.5 rounded-xl text-sm font-semibold transition-all
                          ${schedule.booked || isPast(date)
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : bookingId === schedule.id
                            ? "bg-blue-400 text-white cursor-wait"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105"
                          }
                        `}
                      >
                        {bookingId === schedule.id ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Booking...
                          </span>
                        ) : schedule.booked ? "Booked" : "Book Now"}
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