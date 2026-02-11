import React, { useState, useEffect } from "react";
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  CheckCircle,
  Stethoscope,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/auth/authSlice";

interface Department {
  id: number;
  name: string;
  type: "General" | "Health";
  createdAt: string;
  scheduleCount: number;
}

const Departments = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({ name: "", type: "General" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockDepts: Department[] = [
        {
          id: 1,
          name: "General Services",
          type: "General",
          createdAt: "2025-01-15",
          scheduleCount: 12,
        },
        {
          id: 2,
          name: "Medical Consultation",
          type: "Health",
          createdAt: "2025-01-10",
          scheduleCount: 8,
        },
        {
          id: 3,
          name: "Support Team",
          type: "General",
          createdAt: "2025-01-05",
          scheduleCount: 6,
        },
      ];
      setDepartments(mockDepts);
    } catch (err) {
      setError("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const handleAddDepartment = async () => {
    if (!formData.name.trim()) {
      setError("Department name is required");
      return;
    }

    try {
      const newDept: Department = {
        id: departments.length + 1,
        name: formData.name,
        type: formData.type as "General" | "Health",
        createdAt: new Date().toISOString().split("T")[0],
        scheduleCount: 0,
      };

      setDepartments([...departments, newDept]);
      setSuccess("Department added successfully");
      setFormData({ name: "", type: "General" });
      setShowAddModal(false);

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to add department");
    }
  };

  const handleUpdateDepartment = async () => {
    if (!editingDept || !formData.name.trim()) {
      setError("Department name is required");
      return;
    }

    try {
      setDepartments(
        departments.map((d) =>
          d.id === editingDept.id
            ? {
                ...d,
                name: formData.name,
                type: formData.type as "General" | "Health",
              }
            : d,
        ),
      );
      setSuccess("Department updated successfully");
      setEditingDept(null);
      setFormData({ name: "", type: "General" });

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update department");
    }
  };

  const handleDeleteDepartment = async (id: number) => {
    if (confirm("Are you sure you want to delete this department?")) {
      try {
        setDepartments(departments.filter((d) => d.id !== id));
        setSuccess("Department deleted successfully");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Failed to delete department");
      }
    }
  };

  const handleEditDepartment = (dept: Department) => {
    setEditingDept(dept);
    setFormData({ name: dept.name, type: dept.type });
    setShowAddModal(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
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
                <h1 className="text-2xl font-bold text-gray-900">
                  Departments
                </h1>
                <p className="text-gray-600 text-sm">
                  Manage your service departments
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingDept(null);
                  setFormData({ name: "", type: "General" });
                  setShowAddModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Plus className="w-5 h-5" />
                Add Department
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

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Loading departments...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dept) => (
                  <div
                    key={dept.id}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            dept.type === "Health"
                              ? "bg-red-100"
                              : "bg-blue-100"
                          }`}
                        >
                          {dept.type === "Health" ? (
                            <Stethoscope
                              className={`w-6 h-6 ${
                                dept.type === "Health"
                                  ? "text-red-600"
                                  : "text-blue-600"
                              }`}
                            />
                          ) : (
                            <Building2
                              className={`w-6 h-6 ${
                                dept.type === "Health"
                                  ? "text-red-600"
                                  : "text-blue-600"
                              }`}
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {dept.name}
                          </h3>
                          <p className="text-xs text-gray-500">{dept.type}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Schedules:</span>{" "}
                        {dept.scheduleCount}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Added:</span>{" "}
                        {new Date(dept.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditDepartment(dept)}
                        className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDepartment(dept.id)}
                        className="flex-1 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingDept ? "Edit Department" : "Add New Department"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingDept(null);
                  setFormData({ name: "", type: "General" });
                  setError("");
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., General Services"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="General">General</option>
                  <option value="Health">Health</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingDept(null);
                    setFormData({ name: "", type: "General" });
                    setError("");
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={
                    editingDept ? handleUpdateDepartment : handleAddDepartment
                  }
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  {editingDept ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
