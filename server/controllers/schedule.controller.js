import Schedule from "../models/schedule.model.js";
import { createScheduleId } from "../services/schedule.service.js";

export const getSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
};

export const createSchedule = async (req, res) => {
  const { start, end } = req.body;
  try {
    const id = await createScheduleId();
    const newSchedule = new Schedule({ id, start, end });
    await newSchedule.save();
    res.status(201).json({ message: "Schedule created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error occured", error: err.message });
  }
};

export const bookSchedule = async (req, res) => {
  const { id, cid } = req.body;
  console.log(id);
  try {
    const schedule = await Schedule.findOne({ id });
    console.log("booking");
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    if (schedule.booked) {
      return res.status(400).json({ message: "Already booked" });
    }
    schedule.booked = true;
    schedule.customerId = cid;
    await schedule.save();
    res.status(200).json({ message: "Booked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await Schedule.findOne({ id });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    if (schedule.booked === true) {
      return res.status(501).json({ message: "Already booked can't delete" });
    }

    await schedule.deleteOne();
    return res.status(200).json({ message: "Delete Successful" });
  } catch (err) {
    return res.status(500).json({ error: err.message || err });
  }
};
