import axios from "axios";
import React, { useState } from "react";

const CreateSchedule = () => {
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (start > end) {
      alert("Start time must be before end time");
      return;
    }

    setIsLoading(true);
    setSuccess(false);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/schedule/create",
        {
          start,
          end,
        }
      );
      console.log(res.data);
      setStart("");
      setEnd("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      console.error("Error creating schedule:", err);
      alert("Failed to create schedule. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-indigo-600"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Schedule
          </h1>
          <p className="text-gray-600">
            Set up your time slots for appointments
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            Schedule created successfully!
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Start Time Input - entire row clickable */}
              <div className="space-y-2">
                <label
                  className="group block cursor-pointer text-sm font-semibold text-gray-700"
                  htmlFor="start"
                >
                  <div className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 transition">
                    <span className="select-none">Start Time</span>
                    <input
                      type="time"
                      id="start"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                      required
                      className="ml-4 w-auto min-w-[120px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-900 bg-white"
                    />
                  </div>
                </label>
              </div>

              {/* End Time Input - entire row clickable */}
              <div className="space-y-2">
                <label
                  className="group block cursor-pointer text-sm font-semibold text-gray-700"
                  htmlFor="end"
                >
                  <div className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 transition">
                    <span className="select-none">End Time</span>
                    <input
                      type="time"
                      id="end"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                      required
                      className="ml-4 w-auto min-w-[120px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-900 bg-white"
                    />
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !start || !end}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Creating Schedule...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    Create Schedule
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Make sure the start time is before the end time
            </p>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-blue-500 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Quick Tips</h3>
              <p className="mt-1 text-sm text-gray-600">
                Create time slots for your appointments. You can create multiple
                schedules for different time periods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSchedule;
