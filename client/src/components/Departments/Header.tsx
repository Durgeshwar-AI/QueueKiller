import { Search } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-center items-center p-4 flex-col gap-2 mt-16 mb-16">
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl font-semibold">Browse Departments</h1>
        <p className="text-gray-600">
          Select a department to view and book your schedule
        </p>
      </div>
      <div className="relative w-full max-w-[1200px] mt-8">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          size={20}
        />

        <input
          type="text"
          placeholder="Search by Company or Departments"
          className="w-full rounded-xl bg-white px-12 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </div>
  );
};

export default Header;
