import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = process.env.API_URL;

interface Company {
  id: number;
  name: string;
  key: string;
  logo?: string;
}

const Companies = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAllCompanies = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get<Company[]>(`${URL}/company`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBxdWV1ZWtpbGxlci5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzA5NjQ4MjYsImV4cCI6MTc3MTU2OTYyNn0.Tude2ojNEUaoB0Xx6KrWBLb3qEYl7U9E8TwlL7UG6So`,
        },
      });
      console.log(data);
      setCompanies(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      console.error("Error fetching companies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Companies</h1>

        {loading && (
          <p className="text-lg text-blue-600 animate-pulse">Loading...</p>
        )}
        {error && (
          <p className="text-lg text-red-500 bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            {error}
          </p>
        )}

        {companies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-200"
              >
                <div className="mb-4">
                  <p className="text-sm text-gray-500 font-semibold uppercase">
                    ID
                  </p>
                  <p className="text-lg text-gray-800 font-medium">
                    {company.id}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 font-semibold uppercase">
                    Name
                  </p>
                  <p className="text-2xl text-gray-900 font-bold">
                    {company.name}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 font-semibold uppercase">
                    Key
                  </p>
                  <p className="text-sm text-gray-700 font-mono bg-gray-100 p-2 rounded break-all">
                    {company.key}
                  </p>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-500 font-semibold uppercase mb-2">
                    Logo
                  </p>
                  <img
                    src={
                      company.logo || "https://via.placeholder.com/48?text=Logo"
                    }
                    alt={company.name + " logo"}
                    className="h-12 w-auto object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/48?text=Logo";
                    }}
                  />
                </div>
                <button
                  onClick={() =>
                    navigate(`/company/${company.id}`)
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  See Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-600 text-lg">
              No companies found
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Companies;
