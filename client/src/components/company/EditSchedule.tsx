import axios from "axios";
import { Trash2 } from "lucide-react";

interface Schedule {
  id: string;
  start: string;
  end: string;
  booked: boolean;
}

const EditSchedule = ({
  schedules,
  refresh,
  loading,
  error,
  setError
}: {
  schedules: Schedule[];
  refresh: () => void;
  loading: boolean;
  error: string | null;
  setError : (arg0: string | null) => void
}) => {
  const deleteSchedule = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/schedule/delete/${id}`);
      await refresh()
    } catch (err : any) {
      console.log(err);
      if(err.status == 501) setError("Can't delete a schedule that is already booked!")
      else setError("Failed to delete schedule. Please try again.");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Appointment
          </h1>
          <p className="text-gray-600">
            Choose from available time slots below
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              ></path>
            </svg>
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
              <svg
                className="animate-spin w-6 h-6 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Loading schedules...
            </h3>
            <p className="text-gray-600">
              Please wait while we fetch available time slots
            </p>
          </div>
        ) : (
          /* Schedules Grid */
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-8 py-6">
              {schedules.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No schedules available
                  </h3>
                  <p className="text-gray-600 mb-6">
                    There are currently no time slots.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Available Time Slots
                    </h2>
                  </div>

                  {schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              schedule.booked ? "bg-gray-200" : "bg-green-100"
                            }`}
                          >
                            {schedule.booked ? (
                              <svg
                                className="w-6 h-6 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            ) : (
                              <svg
                                className="w-6 h-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-gray-900">
                              {formatTime(schedule.start)} -{" "}
                              {formatTime(schedule.end)}
                            </span>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                schedule.booked
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {schedule.booked ? "Booked" : "Available"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {schedule.booked
                              ? "This time slot is already taken"
                              : "Click to book this appointment"}
                          </p>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                          <button onClick={() => deleteSchedule(schedule.id)} className="px-8 py-4 flex justify-center items-center"><Trash2/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditSchedule;
