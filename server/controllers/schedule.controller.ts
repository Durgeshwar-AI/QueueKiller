import Schedule from "../models/schedule.model.js";
import { createScheduleId } from "../services/schedule.service.js";
import type { Request, Response } from "express";

interface GetScheduleRequest extends Request {
  params: {
    date: string;
  };
}

export const getSchedule = async (
  req: GetScheduleRequest,
  res: Response
): Promise<void> => {
  const { date } = req.params;
  try {
    const scheduleDoc = await Schedule.findOne({ date });
    if (!scheduleDoc) {
      res.status(404).json({ error: "No schedules found for this date" });
      return;
    }
    res.status(200).json({ schedule: scheduleDoc.schedules });
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
};

export const createSchedule = async (req: Request, res: Response): Promise<void> => {
  const { date, start, end } = req.body;
  try {
    const existingSchedule = await Schedule.findOne({ date });
    if (!existingSchedule) {
      const id = createScheduleId();
      const newSchedule = new Schedule({
        date,
        schedules: [{ id, start, end }],
      });
      await newSchedule.save();
      res.status(201).json({
        message: "Schedule created successfully",
      });
    } else {
      const id = createScheduleId();
      existingSchedule.schedules.push({ id, start, end, booked: false });
      await existingSchedule.save();
      res.status(200).json({
        message: "Schedule updated successfully",
      });
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message: "Error occured", error: errorMessage });
  }
};

export const bookSchedule = async (req: Request, res: Response): Promise<void> => {
  const { date, id, cid } = req.body;
  try {
    const schedule = await Schedule.findOne({ date });
    const currentSchedule = schedule?.schedules?.find((s) => s.id === id);
    if (
      !schedule ||
      !schedule.schedules ||
      schedule.schedules.length === 0 ||
      !currentSchedule
    ) {
      res.status(404).json({ message: "Schedule not found" });
      return;
    }
    if (currentSchedule.booked) {
      res.status(400).json({ message: "Already booked" });
      return;
    }
    currentSchedule.booked = true;
    currentSchedule.customerId = cid;
    await schedule.save();
    res.status(200).json({ message: "Booked successfully" });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message: "Error occured", error: errorMessage });
  }
};

export const deleteSchedule = async (req: Request, res: Response): Promise<void> => {
  const { date, id } = req.params;
  try {
    const schedule = await Schedule.findOne({ date });
    const currentSchedule = schedule?.schedules?.find((s) => s.id === id);
    if (
      !schedule ||
      !schedule.schedules ||
      schedule.schedules.length === 0 ||
      !currentSchedule
    ) {
      res.status(404).json({ message: "Schedule not found" });
      return;
    }

    if (currentSchedule.booked === true) {
      res.status(501).json({ message: "Already booked can't delete" });
      return;
    }
    schedule.schedules = schedule.schedules.filter((s) => s.id !== id);
    await schedule.save();
    res.status(200).json({ message: "Delete Successful" });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message: "Error occured", error: errorMessage });
  }
};
