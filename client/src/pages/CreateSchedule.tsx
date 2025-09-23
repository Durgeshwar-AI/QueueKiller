import axios from "axios";
import React, { useState } from "react";

const CreateSchedule = () => {
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
   if (start > end) {
    alert("Start time must be before end time");
    return;
  }
  try {
    const res = await axios.post("http://localhost:8000/api/schedule/create", {
      start,
      end,
    });
    console.log(res.data);
    setStart("");
    setEnd("");
  } catch (err: any) {
    console.error("Error creating schedule:", err.response?.data || err.message);
  }
};


  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="flex flex-col justify-center items-center bg-gray-300 gap-7 p-6">
        <h1 className="text-5xl text-center">Create Schedule</h1>
        <form
          className="w-[500px] flex flex-col justify-center border-2 border-dashed gap-6 p-4"
          onSubmit={handleSubmit}
        >
          <span className="w-full flex gap-4 pl-16 items-center">
            <label htmlFor="start">Start</label>
            <input
              type="time"
              id="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </span>
          <span className="w-full flex gap-4 pl-16 items-center">
            <label htmlFor="end">End</label>
            <input
              type="time"
              id="end"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </span>
          <button
            type="submit"
            className="rounded-xl bg-black text-red-500 mx-16 p-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSchedule;
