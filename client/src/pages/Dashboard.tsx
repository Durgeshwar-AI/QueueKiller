import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-green-50 to-blue-50 p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-4 text-gray-600">
          Welcome to your dashboard! Here you can manage your booking schedules.
        </p>
        <div className="mt-6 flex items-center justify-center space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Create a new booking schedule</button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
