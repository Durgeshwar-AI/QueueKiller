import React, { useEffect, useState } from "react";

type TimeSlot = {
  id: string | number;
  startTime: string;
  endTime: string;
  date?: string;
  status?: "available" | "booked" | "cancelled";
  bookedBy?: string;
};

const CreatedTimeSlots = () => {
  const [createdTimeSlots, setCreatedTimeSlots] = useState<TimeSlot[]>([
    {
      id: 1,
      startTime: "09:00",
      endTime: "09:30",
      date: "2025-09-15",
      status: "available",
    },
    {
      id: 2,
      startTime: "09:30",
      endTime: "10:00",
      date: "2025-09-15",
      status: "booked",
      bookedBy: "John Doe",
    },
    {
      id: 3,
      startTime: "10:00",
      endTime: "10:30",
      date: "2025-09-15",
      status: "available",
    },
    {
      id: 4,
      startTime: "10:30",
      endTime: "11:00",
      date: "2025-09-15",
      status: "booked",
      bookedBy: "Jane Smith",
    },
    {
      id: 5,
      startTime: "11:00",
      endTime: "11:30",
      date: "2025-09-15",
      status: "cancelled",
    },
    {
      id: 6,
      startTime: "14:00",
      endTime: "14:30",
      date: "2025-09-15",
      status: "available",
    },
  ]);

  const [filter, setFilter] = useState<
    "all" | "available" | "booked" | "cancelled"
  >("all");

  useEffect(() => {
    // const fetchCreatedTimeSlots = async () => {
    //   try {
    //     const response = await fetch('/api/created-time-slots');
    //     const data = await response.json();
    //     setCreatedTimeSlots(data);
    //   } catch (error) {
    //     console.error('Error fetching created time slots:', error);
    //   }
    // };
    // fetchCreatedTimeSlots();
  }, []);

  const filteredSlots = createdTimeSlots.filter((slot) =>
    filter === "all" ? true : slot.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "booked":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return (
          <svg
            className="w-4 h-4 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "booked":
        return (
          <svg
            className="w-4 h-4 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
          </svg>
        );
      case "cancelled":
        return (
          <svg
            className="w-4 h-4 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleDelete = (id: string | number) => {
    setCreatedTimeSlots((prev) => prev.filter((slot) => slot.id !== id));
  };

  const handleStatusChange = (
    id: string | number,
    newStatus: "available" | "booked" | "cancelled"
  ) => {
    setCreatedTimeSlots((prev) =>
      prev.map((slot) =>
        slot.id === id ? { ...slot, status: newStatus } : slot
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {(["all", "available", "booked", "cancelled"] as const).map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                filter === status
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded-full">
                {status === "all"
                  ? createdTimeSlots.length
                  : createdTimeSlots.filter((s) => s.status === status).length}
              </span>
            </button>
          )
        )}
      </div>

      {/* Time Slots List */}
      <div className="space-y-3">
        {filteredSlots.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No time slots found
            </h3>
            <p className="text-gray-500">
              {filter === "all"
                ? "Create your first time slot to get started."
                : `No ${filter} time slots available.`}
            </p>
          </div>
        ) : (
          filteredSlots.map((slot) => (
            <div
              key={slot.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(slot.status || "available")}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">
                          {slot.startTime} - {slot.endTime}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                            slot.status || "available"
                          )}`}
                        >
                          {slot.status}
                        </span>
                      </div>
                      {slot.date && (
                        <p className="text-sm text-gray-600 mt-1">
                          📅 {new Date(slot.date).toLocaleDateString()}
                        </p>
                      )}
                      {slot.bookedBy && (
                        <p className="text-sm text-blue-600 mt-1">
                          👤 Booked by: {slot.bookedBy}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Status Change Dropdown */}
                  <select
                    value={slot.status}
                    onChange={(e) =>
                      handleStatusChange(
                        slot.id,
                        e.target.value as "available" | "booked" | "cancelled"
                      )
                    }
                    className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  {/* Edit Button */}
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(slot.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {createdTimeSlots.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-blue-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-blue-800">
              Showing {filteredSlots.length} of {createdTimeSlots.length} time
              slots
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatedTimeSlots;
