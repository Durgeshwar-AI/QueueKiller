import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, AlertCircle, Building2, CheckCircle } from "lucide-react";
import axios, { AxiosError } from "axios";
import { motion } from "motion/react";

interface Department {
  id: string;
  name: string;
  description: string;
  queue_count: number;
  active: boolean;
}

interface FormErrors {
  name?: string;
  description?: string;
}

const DepartmentsTab = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/company/departments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDepartments(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }> | Error;
      if (error instanceof AxiosError && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to fetch departments");
      }
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) {
      errors.name = "Department name is required";
    }
    if (formData.name.trim().length < 2) {
      errors.name = "Department name must be at least 2 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setError(null);
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/api/company/departments`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({ name: "", description: "" });
      setShowForm(false);
      setSuccess("Department created successfully!");
      fetchDepartments();
    } catch (err) {
      const error = err as AxiosError<{ message: string }> | Error;
      if (error instanceof AxiosError && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to add department");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDepartment = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this department? This action cannot be undone.")) {
      return;
    }
    try {
      setError(null);
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/company/departments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Department deleted successfully!");
      fetchDepartments();
    } catch (err) {
      const error = err as AxiosError<{ message: string }> | Error;
      if (error instanceof AxiosError && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to delete department");
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-slate-100 rounded w-full mb-2" />
              <div className="h-4 bg-slate-100 rounded w-2/3" />
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
          <h2 className="text-2xl font-bold text-slate-900">Departments</h2>
          <p className="text-slate-600 text-sm mt-1">Manage your company departments and their settings</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setFormErrors({});
            if (showForm) setFormData({ name: "", description: "" });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
        >
          <Plus size={20} />
          {showForm ? "Cancel" : "Add Department"}
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAddDepartment}
          className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Department Name *
              </label>
              <input
                type="text"
                placeholder="e.g., Human Resources"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  formErrors.name
                    ? "border-red-300 focus:ring-red-500"
                    : "border-slate-300 focus:ring-blue-500"
                }`}
              />
              {formErrors.name && <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe the purpose of this department..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                rows={3}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {isSubmitting ? "Creating..." : "Create Department"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormData({ name: "", description: "" });
                setFormErrors({});
              }}
              className="px-6 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-16 bg-white rounded-lg border border-dashed border-slate-300"
          >
            <Building2 size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600 font-medium">No departments yet</p>
            <p className="text-slate-500 text-sm mt-1">Click "Add Department" to create your first one</p>
          </motion.div>
        ) : (
          departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Building2 size={20} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-lg">{dept.name}</h3>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {}}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit department"
                  >
                    <Edit2 size={16} className="text-slate-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(dept.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete department"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">{dept.description || "No description provided"}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded">
                  {dept.queue_count} queue{dept.queue_count !== 1 ? "s" : ""}
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                    dept.active
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {dept.active ? "✓ Active" : "Inactive"}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default DepartmentsTab;
