import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";

interface Department {
  id: number;
  name: string;
  type: "Health" | "General";
}

interface Company {
  id: number;
  name: string;
  key: string;
  logo?: string;
  departments?: Department[];
}

const API = process.env.API_URL;

const Company = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddDept, setShowAddDept] = useState<boolean>(false);
  const [newDeptName, setNewDeptName] = useState<string>("");
  const [newDeptType, setNewDeptType] = useState<"Health" | "General">(
    "General",
  );

  const {token} = useAppSelector((s)=>s.auth);

  useEffect(() => {
    const getCompany = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get<Company>(`${API}/company/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompany(data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError("Something went wrong");
        }
        console.error("Error fetching company:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      getCompany();
    }
  }, [id, token]);

  const handleAddDepartment = async () => {
    if (newDeptName.trim()) {
      try {
        await axios.post(
          `${API}/department/register`,
          {
            companyId: company?.id,
            name: newDeptName,
            type: newDeptType,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log("Adding department:", newDeptName);
        setNewDeptName("");
        setShowAddDept(false);
        // Refresh company data
        window.location.reload();
      } catch (err) {
        console.error("Error adding department:", err);
        setError("Failed to add department");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4 flex items-center justify-center">
        <p className="text-2xl text-blue-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
            <p className="text-lg text-red-600 font-semibold">{error}</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-gray-600 mb-4">Company not found</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          ← Go Back
        </button>

        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {company.name}
              </h1>
              <p className="text-sm text-gray-500">Company Details</p>
            </div>
            <img
              src={company.logo || "https://via.placeholder.com/64?text=Logo"}
              alt={company.name + " logo"}
              className="h-20 w-auto object-contain rounded-lg bg-gray-50 p-2"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/64?text=Logo";
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-3">
                Company ID
              </p>
              <p className="text-3xl text-blue-900 font-bold">{company.id}</p>
            </div>
            <div className="bg-linear-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <p className="text-xs text-purple-600 font-bold uppercase tracking-wider mb-3">
                API Key
              </p>
              <p className="text-sm text-purple-900 font-mono break-all bg-white bg-opacity-50 p-3 rounded border border-purple-200">
                {company.key}
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Departments
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {company.departments?.length || 0} department
                  {company.departments?.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={() => setShowAddDept(!showAddDept)}
                className="bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>+</span> Add Department
              </button>
            </div>

            {showAddDept && (
              <div className="bg-linear-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Create New Department
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newDeptName}
                      onChange={(e) => setNewDeptName(e.target.value)}
                      placeholder="Enter department name"
                      className="flex-1 px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleAddDepartment()
                      }
                    />
                    <select
                      value={newDeptType}
                      onChange={(e) =>
                        setNewDeptType(e.target.value as "Health" | "General")
                      }
                      className="px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    >
                      <option value="General">General</option>
                      <option value="Health">Health</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddDepartment}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setShowAddDept(false);
                        setNewDeptName("");
                      }}
                      className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {company.departments && company.departments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {company.departments.map((dept) => (
                  <div
                    key={dept.id}
                    className="bg-linear-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-300 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        ID: {dept.id}
                      </div>
                    </div>
                    <p className="text-sm text-indigo-600 font-semibold uppercase tracking-wide mb-2">
                      Department
                    </p>
                    <p className="text-xl font-bold text-gray-900 wrap-break-word">
                      {dept.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              !showAddDept && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-gray-600 mb-4">No departments yet</p>
                  <button
                    onClick={() => setShowAddDept(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Create First Department
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
