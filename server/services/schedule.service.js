import schedules from "../models/schedule.model.js";

export const createScheduleId = async () => {
  function padThreeDigits(number) {
    return String(number).padStart(3, "0");
  }

  const scheduleCount = await schedules.countDocuments()
  return `c-${padThreeDigits(scheduleCount + 1)}`;
};
