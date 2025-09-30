import Schedule from "../models/schedule.model.js";
import { createScheduleId } from "../services/schedule.service.js";

export const getSchedule = async (req, res) => {
  const { date } = req.params;
  try {
    const scheduleDoc = await Schedule.findOne({ date });
    if (!scheduleDoc) {
      return res
        .status(404)
        .json({ error: "No schedules found for this date" });
    }
    res.status(200).json({ schedule: scheduleDoc.schedules });
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
};

export const createSchedule = async (req, res) => {
  const { date, start, end } = req.body;
  try {
    const existingSchedule = await Schedule.findOne({ date });
    if (!existingSchedule) {
      const id = await createScheduleId();
      const newSchedule = new Schedule({
        date,
        schedules: [{ id, start, end }],
      });
      await newSchedule.save();
      res.status(201).json({
        message: "Schedule created successfully",
      });
    } else {
      existingSchedule.schedules.push({ start, end });
      await existingSchedule.save();
      res.status(200).json({
        message: "Schedule updated successfully",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error occured", error: err.message });
  }
};

export const bookSchedule = async (req, res) => {
  const { date, id, cid } = req.body;
  try {
    const schedule = await Schedule.findOne({ date });
    const currentSchedule = schedule.schedules.find((s) => s.id === id);
    if (
      !schedule ||
      !schedule.schedules ||
      schedule.schedules.length === 0 ||
      !currentSchedule
    ) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    if (currentSchedule.booked) {
      return res.status(400).json({ message: "Already booked" });
    }
    currentSchedule.booked = true;
    currentSchedule.customerId = cid;
    await schedule.save();
    res.status(200).json({ message: "Booked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSchedule = async (req, res) => {
  const { date, id } = req.params;
  try {
    const schedule = await Schedule.findOne({ date });
    const currentSchedule = schedule.schedules.find((s) => s.id === id);
    if (
      !schedule ||
      !schedule.schedules ||
      schedule.schedules.length === 0 ||
      !currentSchedule
    ) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    if (currentSchedule.booked === true) {
      return res.status(501).json({ message: "Already booked can't delete" });
    }
    schedule.schedules = schedule.schedules.filter((s) => s.id !== id);
    await schedule.save();
    return res.status(200).json({ message: "Delete Successful" });
  } catch (err) {
    return res.status(500).json({ error: err.message || err });
  }
};
