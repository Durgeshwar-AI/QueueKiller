import React from "react";
import Company from "../components/Booking/Company";
import TimeSlot from "../components/Booking/TimeSlot";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Booking = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 pt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Create Your Booking
            </h1>
            <p className="text-xl text-gray-600">
              Select a company and choose your preferred time slot
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <Company id="123" />
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <TimeSlot id="123" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
