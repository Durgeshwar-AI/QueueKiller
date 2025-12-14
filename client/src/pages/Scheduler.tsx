import CreateSchedule from "../components/company/CreateSchedule";
import EditSchedule from "../components/company/EditSchedule";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CalendarDays } from "lucide-react";

const Scheduler = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-[100px] pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <CalendarDays className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Schedule Manager
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Create and manage your appointment time slots. Select a date and
              add available times for your customers.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Create Schedule */}
            <div>
              <CreateSchedule
                onCreated={() => console.log("Schedule created")}
              />
            </div>

            {/* Right Column - Edit Schedule */}
            <div>
              <EditSchedule />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Scheduler;
