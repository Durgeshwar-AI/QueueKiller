import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Trash2,
} from "lucide-react";
import axios, { AxiosError } from "axios";
import { motion } from "motion/react";

interface Schedule {
  id: string;
  department_id: string;
  day: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

interface FormErrors {
  department_id?: string;
  start_time?: string;
  end_time?: string;
}

const SchedulesTab = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    department_id: "",
    day: "Monday",
    start_time: "09:00",
    end_time: "17:00",
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const fetchSchedules = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/company/schedules`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchedules(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }> | Error;
      if (error instanceof AxiosError && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to fetch schedules");
      }
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.department_id.trim()) {
      errors.department_id = "Department ID is required";
    }
    if (!formData.start_time) {
      errors.start_time = "Start time is required";
    }
    if (!formData.end_time) {
      errors.end_time = "End time is required";
    }
    if (formData.start_time >= formData.end_time) {
      errors.end_time = "End time must be after start time";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setError(null);
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/api/company/schedules`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({
        department_id: "",
        day: "Monday",
        start_time: "09:00",
        end_time: "17:00",
      });
      setShowForm(false);
      setSuccess("Schedule created successfully!");
      fetchSchedules();
    } catch (err) {
      const error = err as AxiosError<{ message: string }> | Error;
      if (error instanceof AxiosError && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to add schedule");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this schedule?")) {
      return;
    }
    try {
      setError(null);
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/company/schedules/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Schedule deleted successfully!");
      fetchSchedules();
    } catch (err) {
      const error = err as AxiosError<{ message: string }> | Error;
      if (error instanceof AxiosError && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to delete schedule");
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg animate-pulse" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-slate-200 p-4 animate-pulse"
            >
              <div className="h-6 bg-slate-200 rounded w-1/3 mb-2" />
              <div className="h-4 bg-slate-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3"
        >
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">Error</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3"
        >
          <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
          <p className="text-green-700 font-medium">{success}</p>
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Schedules</h2>
          <p className="text-slate-600 text-sm mt-1">
            Define operating hours for your departments
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setFormErrors({});
            if (showForm)
              setFormData({
                department_id: "",
                day: "Monday",
                start_time: "09:00",
                end_time: "17:00",
              });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
        >
          <Plus size={20} />
          {showForm ? "Cancel" : "Add Schedule"}
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAddSchedule}
          className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Department ID *
              </label>
              <input
                type="text"
                placeholder="Enter department ID"
                value={formData.department_id}
                onChange={(e) => {
                  setFormData({ ...formData, department_id: e.target.value });
                  if (formErrors.department_id)
                    setFormErrors({ ...formErrors, department_id: undefined });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  formErrors.department_id
                    ? "border-red-300 focus:ring-red-500"
                    : "border-slate-300 focus:ring-blue-500"
                }`}
              />
              {formErrors.department_id && (
                <p className="text-red-600 text-sm mt-1">
                  {formErrors.department_id}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Day of Week *
                </label>
                <select
                  value={formData.day}
                  onChange={(e) =>
                    setFormData({ ...formData, day: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  value={formData.start_time}
                  onChange={(e) => {
                    setFormData({ ...formData, start_time: e.target.value });
                    if (formErrors.start_time)
                      setFormErrors({ ...formErrors, start_time: undefined });
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    formErrors.start_time
                      ? "border-red-300 focus:ring-red-500"
                      : "border-slate-300 focus:ring-blue-500"
                  }`}
                />
                {formErrors.start_time && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors.start_time}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  End Time *
                </label>
                <input
                  type="time"
                  value={formData.end_time}
                  onChange={(e) => {
                    setFormData({ ...formData, end_time: e.target.value });
                    if (formErrors.end_time)
                      setFormErrors({ ...formErrors, end_time: undefined });
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    formErrors.end_time
                      ? "border-red-300 focus:ring-red-500"
                      : "border-slate-300 focus:ring-blue-500"
                  }`}
                />
                {formErrors.end_time && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors.end_time}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {isSubmitting ? "Creating..." : "Create Schedule"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormData({
                  department_id: "",
                  day: "Monday",
                  start_time: "09:00",
                  end_time: "17:00",
                });
                setFormErrors({});
              }}
              className="px-6 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      <div className="space-y-3">
        {schedules.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-lg border border-dashed border-slate-300"
          >
            <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600 font-medium">
              No schedules set up yet
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Click "Add Schedule" to define operating hours
            </p>
          </motion.div>
        ) : (
          schedules.map((schedule, index) => (
            <motion.div
              key={schedule.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg border border-slate-200 p-5 flex items-center justify-between hover:shadow-lg hover:border-blue-200 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Calendar className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">
                    {schedule.day}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                    <Clock size={16} />
                    <span>
                      {schedule.start_time} - {schedule.end_time}
                    </span>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded">
                      {schedule.department_id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                    schedule.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {schedule.is_active ? "✓ Active" : "Inactive"}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteSchedule(schedule.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete schedule"
                >
                  <Trash2 size={16} className="text-red-600" />
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default SchedulesTab;
