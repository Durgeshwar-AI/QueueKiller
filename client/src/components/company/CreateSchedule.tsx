import { useState } from "react";
import { Clock, Plus, Check, Sparkles } from "lucide-react";
import Calendar from "../Calender"; // adjust path if needed

interface CreateScheduleProps {
  onCreated: () => void;
}

const CreateSchedule = ({ onCreated }: CreateScheduleProps) => {
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = () => {
    setError(null);
    setSuccess(false);

    if (!start || !end) return;

    if (start >= end) {
      setError("Start time must be before end time");
      return;
    }

    setIsLoading(true);

    // Simulated API call
    setTimeout(() => {
      console.log("Schedule created:", {
        date: selectedDate.toISOString().split("T")[0],
        start,
        end,
      });

      setStart("");
      setEnd("");
      setSuccess(true);
      onCreated();
      setIsLoading(false);

      setTimeout(() => setSuccess(false), 3000);
    }, 500);
  };

  const formatSelectedDate = () =>
    selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create Schedule
            </h1>
            <p className="text-gray-600 mt-1">
              Set up your availability for appointments
            </p>
          </div>
        </div>

        {/* Calendar */}
        <Calendar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          minDate={new Date()}
        />

        {/* Time Slot Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Add Time Slot</h3>
                <p className="text-indigo-100 mt-1">
                  {formatSelectedDate()}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {success && (
              <div className="mb-6 p-4 bg-emerald-500 text-white rounded-2xl flex items-center gap-3">
                <Check className="w-5 h-5" />
                <span className="font-semibold">
                  Schedule created successfully!
                </span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500 text-white rounded-2xl">
                <span className="font-semibold">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !start || !end}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Creating...</span>
              ) : (
                <>
                  <Plus className="w-6 h-6" />
                  Add Time Slot
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSchedule;
