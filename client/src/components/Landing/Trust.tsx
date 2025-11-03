import React from "react";

const Trust = () => {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
      <div className="flex flex-col justify-center p-4">
        <h1 className="text-2xl font-semibold mb-6">Trusted By Thousands</h1>
        <p className="text-gray-400 text-lg mb-6">
          Join thousands of professionals who use ScheduleBook to manage their
          appointments efficiently.
        </p>
        <div className="text-lg text-gray-400">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 border border-gray-300 rounded-xl px-6 py-3 shadow-sm">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Active Users
            </li>
            <li className="flex items-center gap-3 border border-gray-300 rounded-xl px-6 py-3 shadow-sm">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Appointments Booked
            </li>
            <li className="flex items-center gap-3 border border-gray-300 rounded-xl px-6 py-3 shadow-sm">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Companies
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center p-2 md:p-8 bg-white rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Professionals collaborating"
          className="rounded-xl object-cover w-full"
        />
      </div>
    </div>
  );
};

export default Trust;
