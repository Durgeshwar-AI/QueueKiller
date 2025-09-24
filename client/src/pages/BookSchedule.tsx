import axios from "axios";
import React, { useEffect, useState } from "react";

interface Schedule {
  id: string;
  start: string;
  end: string;
  booked: boolean;
}

const BookSchedule = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/schedule/");
       const sorted = res.data.sort(
        (a: Schedule, b: Schedule) => a.start.localeCompare(b.start)
      );
      setSchedules(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const book = async (id: string) => {
    try {
      const res = await axios.put("http://localhost:8000/api/schedule/book", {
        id: id,
        cid: "66f4d8e9c2c7a2f8b4d3c123",
      });
      console.log(res);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="bg-primary p-4 rounded">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="flex gap-2 items-center my-2">
            <span>
              {schedule.start} - {schedule.end}
            </span>
            {schedule.booked ? (
              <button className="bg-gray-500 text-black px-3 py-1 rounded">
                Already booked
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => book(schedule.id)}
              >
                Book schedule
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSchedule;
