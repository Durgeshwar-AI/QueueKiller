import { useState } from "react";
import {
  Upload,
  Plus,
  X,
  AlertCircle,
  Loader,
  Eye,
  EyeOff,
} from "lucide-react";
import axios from "axios";
import { useAppSelector } from "../../hooks/reduxHooks";

interface Department {
  id: number;
  name: string;
  type: string;
}

interface FormData {
  name: string;
  password: string;
  confirmPassword: string;
  logo: File | null;
  departments: Department[];
}

interface SuccessData {
  message: string;
  companyId: string;
  key: string;
}

const URL = process.env.API_URL;

export default function AddCompany() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    password: "",
    confirmPassword: "",
    logo: null,
    departments: [],
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [newDept, setNewDept] = useState({ name: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<SuccessData | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const deptTypes = ["General", "Health"];

  const {token} = useAppSelector((s)=>s.auth);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setLogoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addDepartment = () => {
    if (!newDept.name.trim()) {
      setError("Department name is required");
      return;
    }

    setDepartments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newDept.name,
        type: newDept.type || "General",
      },
    ]);

    setNewDept({ name: "", type: "" });
    setError("");
  };

  const removeDepartment = (id: number) => {
    setDepartments((prev) => prev.filter((dept) => dept.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(null);

    // Validation
    if (!formData.name.trim()) {
      setError("Company name is required");
      return;
    }

    if (!formData.password) {
      setError("Password is required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Send JSON payload (skip multipart). Include logo as data URL if available.
      const payload = {
        name: formData.name,
        password: formData.password,
        logo: logoPreview || null,
        departments: departments.length > 0 ? departments : [],
      };

      const response = await axios.post(`${URL}/company/register`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      setSuccess({
        message: "Company registered successfully!",
        companyId: data.companyId,
        key: data.key,
      });

      // Reset form
      setFormData({
        name: "",
        password: "",
        confirmPassword: "",
        logo: null,
        departments: [],
      });
      setDepartments([]);
      setLogoPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-indigo-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Register Company
            </h1>
            <p className="text-gray-600 mt-1">
              Set up a QueueKiller account and departments
            </p>
          </div>
        </div>
      </header>

      {/* Form Container */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg border border-indigo-200 max-w-3xl"
        >
          <div className="p-8">
            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Success Alert */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-semibold text-sm mb-2">
                  {success.message}
                </p>
                <div className="space-y-1">
                  <p className="text-green-600 text-xs">
                    <span className="font-semibold">Company ID:</span>{" "}
                    {success.companyId}
                  </p>
                  <p className="text-green-600 text-xs">
                    <span className="font-semibold">API Key:</span>{" "}
                    <code className="bg-white px-2 py-1 rounded border border-green-300 font-mono">
                      {success.key}
                    </code>
                  </p>
                </div>
              </div>
            )}

            {/* Company Name */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Company Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Acme Corporation"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <p className="text-gray-500 text-xs mt-1">
                This is the company's display name
              </p>
            </div>

            {/* Logo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Company Logo
              </label>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Click to upload
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 5MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {logoPreview && (
                  <div className="shrink-0 w-20 h-20 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-xs mb-8">
              Minimum 8 characters. Use a strong password to protect the
              account.
            </p>

            {/* Departments Section */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Departments
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Add departments to organize queues. You can add more later.
              </p>

              {/* Add Department Form */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={newDept.name}
                    onChange={(e) =>
                      setNewDept((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Department name (e.g., Support, Sales)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  />
                  <select
                    value={newDept.type}
                    onChange={(e) =>
                      setNewDept((prev) => ({ ...prev, type: e.target.value }))
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  >
                    <option value="">Select type</option>
                    {deptTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addDepartment}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Departments List */}
              {departments.length > 0 && (
                <div className="space-y-2 mb-6">
                  {departments.map((dept) => (
                    <div
                      key={dept.id}
                      className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-lg p-3"
                    >
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {dept.name}
                        </p>
                        <p className="text-gray-600 text-xs">{dept.type}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDepartment(dept.id)}
                        className="p-1 hover:bg-indigo-100 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-indigo-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {departments.length === 0 && (
                <p className="text-gray-500 text-sm p-4 bg-gray-50 rounded-lg text-center">
                  No departments added yet. You can add them now or later.
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-indigo-200 px-8 py-6 bg-indigo-50 rounded-b-lg">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register Company"
              )}
            </button>
            <p className="text-gray-600 text-xs text-center mt-3">
              * Required fields
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
