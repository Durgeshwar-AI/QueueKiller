import React, { useState } from "react";

interface CompanyData {
  name?: string;
  department?: string;
  location?: string;
  contact?: string;
  amount?: number;
}

const Company: React.FC<{ id: string }> = ({ id }) => {
  const [company] = useState<CompanyData>({
    name: "Dummy Corp",
    department: "Engineering",
    location: "New York",
    contact: "123-456-7890",
    amount: 2500,
  });

  // useEffect(() => {
  //   fetch(`http://localhost:5000/company/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCompany(data);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching company data:", error);
  //     });
  // }, [id]);

  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Company Information
        </h2>
        <p className="text-gray-600">
          Get to know more about your selected company
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-blue-500 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold text-gray-700">Company:</span>
            <span className="ml-2 text-gray-800">{company.name || "-"}</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-green-500 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold text-gray-700">Department:</span>
            <span className="ml-2 text-gray-800">
              {company.department || "-"}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-purple-500 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold text-gray-700">Location:</span>
            <span className="ml-2 text-gray-800">
              {company.location || "-"}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-500">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-orange-500 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="font-semibold text-gray-700">Contact:</span>
            <span className="ml-2 text-gray-800">{company.contact || "-"}</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-green-500 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="font-semibold text-gray-700">Amount:</span>
            <span className="ml-2 text-gray-800">{company.amount || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
