import { Trash2, Clock, RefreshCw } from "lucide-react";
import { useState } from "react";

interface Schedule {
  id: string;
  start: string;
  end: string;
  booked: boolean;
}

const dummySchedules: Schedule[] = [
  { id: "1", start: "09:00", end: "10:00", booked: false },
  { id: "2", start: "10:30", end: "11:30", booked: true },
  { id: "3", start: "12:00", end: "13:00", booked: false },
  { id: "4", start: "14:00", end: "15:00", booked: true },
  { id: "5", start: "15:30", end: "16:30", booked: false },
];

const EditSchedule = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(dummySchedules);
  const [error, setError] = useState<string | null>(null);

  const deleteSchedule = (id: string) => {
    const schedule = schedules.find((s) => s.id === id);
    if (schedule?.booked) {
      setError("Can't delete a schedule that is already booked!");
      setTimeout(() => setError(null), 3000);
      return;
    }
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  const formatTime = (time: string) => {
    try {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return time;
    }
  };

  const availableCount = schedules.filter((s) => !s.booked).length;
  const bookedCount = schedules.filter((s) => s.booked).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Today's Schedule</h3>
                  <p className="text-indigo-100 mt-1">
                    {schedules.length} time slots available
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSchedules(dummySchedules)}
                className="p-3 hover:bg-white/20 rounded-xl transition-all hover:scale-105 active:scale-95"
                title="Refresh"
              >
                <RefreshCw className="w-6 h-6" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-4xl font-bold">{availableCount}</p>
                <p className="text-sm text-indigo-100 mt-1">Available Slots</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-4xl font-bold">{bookedCount}</p>
                <p className="text-sm text-indigo-100 mt-1">Booked Slots</p>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-8 mt-6 p-4 bg-red-500 text-white rounded-2xl text-sm flex items-center justify-between shadow-lg animate-shake">
              <span className="font-medium">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-4 hover:bg-red-600 rounded-lg p-1 transition-colors"
              >
                ✕
              </button>
            </div>
          )}

          {/* Schedule List */}
          <div className="p-8">
            {schedules.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-indigo-600" />
                </div>
                <p className="text-gray-700 font-medium text-lg">No schedules for this date</p>
                <p className="text-gray-500 mt-2">
                  Create a new time slot to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className={`group relative flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      schedule.booked
                        ? "border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50"
                        : "border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                          schedule.booked
                            ? "bg-gradient-to-br from-rose-400 to-pink-500"
                            : "bg-gradient-to-br from-emerald-400 to-teal-500"
                        }`}
                      >
                        <Clock className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">
                          {formatTime(schedule.start)} - {formatTime(schedule.end)}
                        </p>
                        <span
                          className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold ${
                            schedule.booked
                              ? "bg-rose-200 text-rose-800"
                              : "bg-emerald-200 text-emerald-800"
                          }`}
                        >
                          {schedule.booked ? "● Booked" : "● Available"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteSchedule(schedule.id)}
                      disabled={schedule.booked}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        schedule.booked
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                          : "bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white hover:scale-110 hover:rotate-12 shadow-lg"
                      }`}
                      title={
                        schedule.booked
                          ? "Cannot delete booked slot"
                          : "Delete time slot"
                      }
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSchedule;