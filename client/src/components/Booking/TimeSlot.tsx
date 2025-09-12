import React, { useState } from "react";

const TimeSlot: React.FC<{ id: string }> = ({ id }) => {
  const [timeslots] = useState<
    { startTime: string; endTime: string; booked: boolean }[]
  >([
    { startTime: "09:00 AM", endTime: "09:30 AM", booked: false },
    { startTime: "10:00 AM", endTime: "10:30 AM", booked: true },
    { startTime: "11:00 AM", endTime: "11:30 AM", booked: false },
    { startTime: "09:00 AM", endTime: "09:30 AM", booked: false },
    { startTime: "10:00 AM", endTime: "10:30 AM", booked: true },
    { startTime: "11:00 AM", endTime: "11:30 AM", booked: false },
  ]);

  // useEffect(() => {
  //   fetch(`/api/timeslots/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => setTimeslots(data))
  //     .catch((error) => console.error("Error fetching timeslots:", error));
  // }, [id]);

  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Select Time Slot
        </h2>
        <p className="text-gray-600">Choose your preferred appointment time</p>
      </div>

      <div className="space-y-3 overflow-y-scroll max-h-96">
        {timeslots.map((slot, idx) => (
          <button
            key={idx}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
              slot.booked
                ? "bg-gray-200 text-gray-500 cursor-not-allowed border-2 border-gray-300"
                : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl border-2 border-transparent"
            }`}
            onClick={() =>
              !slot.booked &&
              alert(`You selected ${slot.startTime} - ${slot.endTime}`)
            }
            disabled={slot.booked}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className={`w-5 h-5 mr-3 ${
                    slot.booked ? "text-gray-400" : "text-white"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  {slot.startTime} - {slot.endTime}
                </span>
              </div>
              {slot.booked && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  Booked
                </span>
              )}
              {!slot.booked && (
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
                Book
            </button>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;
