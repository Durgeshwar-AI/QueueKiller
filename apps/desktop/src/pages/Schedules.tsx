import React, { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  CheckCircle,
  Clock,
  Copy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/auth/authSlice";
import Sidebar from "../components/Sidebar";

interface Schedule {
  id: number;
  departmentName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "Available" | "Locked" | "Booked";
  bookingCount: number;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

const Schedules = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [departments, setDepartments] = useState<
    { id: number; name: string }[]
  >([]);
  const [formData, setFormData] = useState({
    departmentId: "",
    date: "",
    status: "Available",
  });
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: "1", startTime: "", endTime: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filterDept, setFilterDept] = useState("");

  useEffect(() => {
    fetchSchedules();
    fetchDepartments();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const mockSchedules: Schedule[] = [
        {
          id: 1,
          departmentName: "General Services",
          date: "2025-02-15",
          startTime: "09:00",
          endTime: "12:00",
          status: "Available",
          bookingCount: 5,
        },
        {
          id: 2,
          departmentName: "Medical Consultation",
          date: "2025-02-15",
          startTime: "14:00",
          endTime: "16:00",
          status: "Booked",
          bookingCount: 3,
        },
        {
          id: 3,
          departmentName: "Support Team",
          date: "2025-02-16",
          startTime: "10:00",
          endTime: "12:00",
          status: "Available",
          bookingCount: 2,
        },
      ];
      setSchedules(mockSchedules);
    } catch (err) {
      setError("Failed to load schedules");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const mockDepts = [
        { id: 1, name: "General Services" },
        { id: 2, name: "Medical Consultation" },
        { id: 3, name: "Support Team" },
      ];
      setDepartments(mockDepts);
    } catch (err) {
      setError("Failed to load departments");
    }
  };

  const handleAddTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      startTime: "",
      endTime: "",
    };
    setTimeSlots([...timeSlots, newSlot]);
  };

  const handleRemoveTimeSlot = (id: string) => {
    if (timeSlots.length > 1) {
      setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
    } else {
      setError("You must have at least one time slot");
    }
  };

  const handleUpdateTimeSlot = (
    id: string,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setTimeSlots(
      timeSlots.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot,
      ),
    );
  };

  const handleDuplicateTimeSlot = (id: string) => {
    const slotToDuplicate = timeSlots.find((slot) => slot.id === id);
    if (slotToDuplicate) {
      const newSlot: TimeSlot = {
        id: Date.now().toString(),
        startTime: slotToDuplicate.startTime,
        endTime: slotToDuplicate.endTime,
      };
      setTimeSlots([...timeSlots, newSlot]);
    }
  };

  const validateTimeSlots = (): boolean => {
    for (const slot of timeSlots) {
      if (!slot.startTime || !slot.endTime) {
        setError("All time slots must have start and end times");
        return false;
      }
      if (slot.startTime >= slot.endTime) {
        setError("Start time must be before end time");
        return false;
      }
    }
    return true;
  };

  const handleAddSchedules = async () => {
    if (!formData.departmentId || !formData.date) {
      setError("Department and date are required");
      return;
    }

    if (!validateTimeSlots()) {
      return;
    }

    try {
      const dept = departments.find(
        (d) => d.id.toString() === formData.departmentId,
      );

      const newSchedules: Schedule[] = timeSlots.map((slot) => ({
        id: Math.max(...schedules.map((s) => s.id), 0) + 1,
        departmentName: dept?.name || "",
        date: formData.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        status: formData.status as "Available" | "Locked" | "Booked",
        bookingCount: 0,
      }));

      setSchedules([...schedules, ...newSchedules]);
      setSuccess(
        `${newSchedules.length} schedule(s) created successfully`,
      );
      resetForm();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to create schedules");
    }
  };

  const handleUpdateSchedule = async () => {
    if (!formData.departmentId || !formData.date) {
      setError("Department and date are required");
      return;
    }

    if (!validateTimeSlots()) {
      return;
    }

    try {
      const dept = departments.find(
        (d) => d.id.toString() === formData.departmentId,
      );

      const firstSlot = timeSlots[0];
      setSchedules(
        schedules.map((s) =>
          s.id === editingSchedule?.id
            ? {
                ...s,
                departmentName: dept?.name || "",
                date: formData.date,
                startTime: firstSlot.startTime,
                endTime: firstSlot.endTime,
                status: formData.status as "Available" | "Locked" | "Booked",
              }
            : s,
        ),
      );
      setSuccess("Schedule updated successfully");
      resetForm();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update schedule");
    }
  };

  const handleDeleteSchedule = async (id: number) => {
    if (confirm("Are you sure you want to delete this schedule?")) {
      try {
        setSchedules(schedules.filter((s) => s.id !== id));
        setSuccess("Schedule deleted successfully");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Failed to delete schedule");
      }
    }
  };

  const handleEditSchedule = (schedule: Schedule) => {
    const dept = departments.find((d) => d.name === schedule.departmentName);
    setEditingSchedule(schedule);
    setFormData({
      departmentId: dept?.id.toString() || "",
      date: schedule.date,
      status: schedule.status,
    });
    setTimeSlots([
      {
        id: "1",
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      },
    ]);
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      departmentId: "",
      date: "",
      status: "Available",
    });
    setTimeSlots([{ id: "1", startTime: "", endTime: "" }]);
    setEditingSchedule(null);
    setShowAddModal(false);
    setError("");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const filteredSchedules = filterDept
    ? schedules.filter((s) => s.departmentName === filterDept)
    : schedules;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Booked":
        return "bg-blue-100 text-blue-800";
      case "Locked":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Schedules</h1>
                <p className="text-gray-600 text-sm">
                  Manage your service schedules
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingSchedule(null);
                  resetForm();
                  setShowAddModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Plus className="w-5 h-5" />
                Add Schedule
              </button>
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

            {/* Filter */}
            <div className="mb-6 flex gap-4">
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Loading schedules...</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Bookings
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredSchedules.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-8 text-center text-gray-600"
                        >
                          No schedules found
                        </td>
                      </tr>
                    ) : (
                      filteredSchedules.map((schedule) => (
                        <tr key={schedule.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {schedule.departmentName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(schedule.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {schedule.startTime} - {schedule.endTime}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                schedule.status,
                              )}`}
                            >
                              {schedule.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {schedule.bookingCount}
                          </td>
                          <td className="px-6 py-4 text-sm space-x-2">
                            <button
                              onClick={() => handleEditSchedule(schedule)}
                              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-flex items-center gap-1"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSchedule(schedule.id)}
                              className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition inline-flex items-center gap-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
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

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingSchedule ? "Edit Schedule" : "Add New Schedules"}
                </h2>
                {!editingSchedule && (
                  <p className="text-sm text-gray-600 mt-1">
                    Add multiple time slots for a single date and department
                  </p>
                )}
              </div>
              <button
                onClick={resetForm}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        departmentId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    disabled={editingSchedule !== null}
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    disabled={editingSchedule !== null}
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Available">Available</option>
                  <option value="Locked">Locked</option>
                  <option value="Booked">Booked</option>
                </select>
              </div>

              {/* Time Slots */}
              <div className="pt-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Time Slots {timeSlots.length > 1 && `(${timeSlots.length})`}
                  </label>
                  {!editingSchedule && (
                    <button
                      onClick={handleAddTimeSlot}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add Time Slot
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {timeSlots.map((slot, index) => (
                    <div
                      key={slot.id}
                      className="flex gap-3 items-end p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) =>
                            handleUpdateTimeSlot(
                              slot.id,
                              "startTime",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) =>
                            handleUpdateTimeSlot(
                              slot.id,
                              "endTime",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      {!editingSchedule && (
                        <>
                          <button
                            onClick={() => handleDuplicateTimeSlot(slot.id)}
                            className="p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
                            title="Duplicate time slot"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleRemoveTimeSlot(slot.id)}
                            disabled={timeSlots.length === 1}
                            className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            title={
                              timeSlots.length === 1
                                ? "Cannot remove last slot"
                                : "Remove time slot"
                            }
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t mt-6">
              <button
                onClick={resetForm}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={
                  editingSchedule ? handleUpdateSchedule : handleAddSchedules
                }
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                {editingSchedule ? "Update" : "Add Schedules"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedules;