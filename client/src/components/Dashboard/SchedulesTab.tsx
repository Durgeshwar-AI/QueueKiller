import { useEffect, useState } from "react";
import {
  Plus,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  fetchSchedulesByDept,
  createSchedule,
  deleteSchedule,
} from "../../redux/schedulesSlice";
import { fetchDepartments } from "../../redux/departmentsSlice";
import { toast } from "react-toastify";

interface FormErrors {
  departmentId?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
}

const SchedulesTab = () => {
  const dispatch = useAppDispatch();
  const {
    schedules,
    loading: schedulesLoading,
    error: schedulesError,
  } = useAppSelector((s) => s.schedules);
  const { departments } = useAppSelector((s) => s.departments);

  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState<string>("");

  // Get local date without timezone conversion
  const getLocalDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    departmentId: "",
    date: getLocalDateString(),
    startTime: "09:00",
    endTime: "10:00",
  });

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDeptId) {
      dispatch(fetchSchedulesByDept(parseInt(selectedDeptId)));
    }
  }, [dispatch, selectedDeptId]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.departmentId) errors.departmentId = "Department is required";
    if (!formData.date) errors.date = "Date is required";
    if (formData.startTime >= formData.endTime)
      errors.end_time = "End time must be after start time";
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error(
        errors.date ||
          errors.departmentId ||
          errors.end_time ||
          "Please fix validation errors",
      );
    }
    return Object.keys(errors).length === 0;
  };

  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await dispatch(
        createSchedule({
          departmentId: parseInt(formData.departmentId),
          date: formData.date,
          startTime: new Date(
            `${formData.date}T${formData.startTime}`,
          ).toISOString(),
          endTime: new Date(
            `${formData.date}T${formData.endTime}`,
          ).toISOString(),
        }),
      ).unwrap();

      toast.success("Schedule created successfully!");
      setSuccess("Schedule created successfully!");
      setShowForm(false);
    } catch (err: unknown) {
      const errorMessage =
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : "Failed to create schedule";
      toast.error(errorMessage);
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSchedule = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this schedule?"))
      return;
    try {
      await dispatch(deleteSchedule(id)).unwrap();
      setSuccess("Schedule deleted successfully!");
    } catch (err: unknown) {
      console.log(err);
    }
  };

  if (schedulesLoading && !showForm) {
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
      {schedulesError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3"
        >
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">Error</h3>
            <p className="text-red-700 text-sm">{schedulesError}</p>
          </div>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3"
        >
          <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
          <p className="text-green-700 font-medium">{success}</p>
        </motion.div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Schedules</h2>
            <p className="text-slate-600 text-sm mt-1">
              Select a department to manage its schedules
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
          >
            <Plus size={20} />
            {showForm ? "Cancel" : "Add Schedule"}
          </button>
        </div>

        <div className="w-full max-w-xs">
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Select Department
          </label>
          <select
            value={selectedDeptId}
            onChange={(e) => setSelectedDeptId(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">-- Choose Department --</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
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
                Department *
              </label>
              <select
                value={formData.departmentId}
                onChange={(e) =>
                  setFormData({ ...formData, departmentId: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              >
                <option value="">-- Select --</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  End Time *
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-lg ${formErrors.end_time ? "border-red-500" : "border-slate-300"}`}
                />
                {formErrors.end_time && (
                  <p className="text-red-500 text-xs mt-1">
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
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Schedule"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2 bg-slate-200 text-slate-900 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      <div className="space-y-3">
        {!selectedDeptId ? (
          <div className="text-center py-16 bg-white rounded-lg border border-dashed border-slate-300">
            <p className="text-slate-600 font-medium">
              Please select a department to see schedules
            </p>
          </div>
        ) : schedules.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-lg border border-dashed border-slate-300"
          >
            <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600 font-medium">
              No schedules set up yet for this department
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
                    {new Date(schedule.date).toLocaleDateString()}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                    <Clock size={16} />
                    <span>
                      {new Date(schedule.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(schedule.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${schedule.status === "Available" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}
                >
                  {schedule.status}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteSchedule(schedule.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
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
