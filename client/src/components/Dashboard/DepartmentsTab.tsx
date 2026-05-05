import { useEffect, useState } from "react";
import { Plus, Edit2, AlertCircle, Building2, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  fetchDepartments,
  createDepartment,
  updateDepartment,
} from "../../redux/departmentsSlice";

interface FormErrors {
  name?: string;
  type?: string;
  price?: string;
}

const DepartmentsTab = () => {
  const dispatch = useAppDispatch();
  const {
    departments,
    loading,
    error: reduxError,
  } = useAppSelector((s) => s.departments);

  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "General",
    price: 100,
  });
  const [editingDeptId, setEditingDeptId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) {
      errors.name = "Department name is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      if (editingDeptId) {
        await dispatch(
          updateDepartment({
            id: editingDeptId,
            name: formData.name,
            type: formData.type,
            price: formData.price,
          }),
        ).unwrap();
        setSuccess("Department updated successfully!");
      } else {
        await dispatch(createDepartment(formData.name)).unwrap();
        setSuccess("Department created successfully!");
      }
      setFormData({ name: "", description: "", type: "General", price: 100 });
      setEditingDeptId(null);
      setShowForm(false);
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // deletion removed from UI per request

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-slate-200 p-6 animate-pulse"
            >
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
      {reduxError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3"
        >
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">Error</h3>
            <p className="text-red-700 text-sm">{reduxError}</p>
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
          <p className="text-slate-600 text-sm mt-1">
            Manage your company departments and their settings
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setFormErrors({});
            if (showForm) {
              setFormData({
                name: "",
                description: "",
                type: "General",
                price: 100,
              });
              setEditingDeptId(null);
            }
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
          onSubmit={handleSubmitDepartment}
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
                  if (formErrors.name)
                    setFormErrors({ ...formErrors, name: undefined });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  formErrors.name
                    ? "border-red-300 focus:ring-red-500"
                    : "border-slate-300 focus:ring-blue-500"
                }`}
              />
              {formErrors.name && (
                <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>
              )}
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
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => {
                  setFormData({ ...formData, type: e.target.value });
                  if (formErrors.type)
                    setFormErrors({ ...formErrors, type: undefined });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  formErrors.type
                    ? "border-red-300 focus:ring-red-500"
                    : "border-slate-300 focus:ring-blue-500"
                }`}
              >
                <option value="General">General</option>
                <option value="Technical">Technical</option>
                <option value="Support">Support</option>
                <option value="Sales">Sales</option>
              </select>
              {formErrors.type && (
                <p className="text-red-600 text-sm mt-1">{formErrors.type}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Booking Price (₹) *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-medium">₹</span>
                <input
                  type="number"
                  min="1"
                  max="100000"
                  placeholder="e.g., 500"
                  value={formData.price}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      price: parseInt(e.target.value) || 100,
                    });
                    if (formErrors.price)
                      setFormErrors({ ...formErrors, price: undefined });
                  }}
                  className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    formErrors.price
                      ? "border-red-300 focus:ring-red-500"
                      : "border-slate-300 focus:ring-blue-500"
                  }`}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Users will pay this amount + 5% platform fee (minimum ₹100)
              </p>
              {formErrors.price && (
                <p className="text-red-600 text-sm mt-1">{formErrors.price}</p>
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {isSubmitting
                ? editingDeptId
                  ? "Saving..."
                  : "Creating..."
                : editingDeptId
                  ? "Save Changes"
                  : "Create Department"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormData({
                  name: "",
                  description: "",
                  type: "General",
                  price: 100,
                });
                setEditingDeptId(null);
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
            <p className="text-slate-500 text-sm mt-1">
              Click "Add Department" to create your first one
            </p>
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
                  <h3 className="font-semibold text-slate-900 text-lg">
                    {dept.name}
                  </h3>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingDeptId(dept.id);
                      setFormData({
                        name: dept.name,
                        description: dept.description || "",
                        type: dept.type || "General",
                        price: dept.price || 100,
                      });
                      setFormErrors({});
                      setShowForm(true);
                    }}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit department"
                  >
                    <Edit2 size={16} className="text-slate-600" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-slate-600 mb-4">
                <p className="line-clamp-2">
                  {dept.description || "No description provided"}
                </p>
                <p className="text-xs text-slate-500">Dept ID: {dept.id}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors bg-slate-100 text-slate-600`}
                  >
                    {dept.type}
                  </span>
                </div>
                <div className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  ₹{dept.price || 100}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default DepartmentsTab;
