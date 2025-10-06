import Schedule from "../models/schedule.model.js";
import { createScheduleId } from "../services/schedule.service.js";
import type { Request, Response } from "express";

interface GetScheduleRequest extends Request {
  query: {
    date: string;
  };
}

export const getSchedule = async (
  req: GetScheduleRequest,
  res: Response
): Promise<void> => {
  const { date } = req.query;
  try {
    const scheduleDoc = await Schedule.findOne({ date });
    if (!scheduleDoc) {
      res.status(204).json({ error: "No schedules found for this date" });
      return;
    }
    res.status(200).json({ schedule: scheduleDoc.schedules });
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
};

export const createSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { date, start, end } = req.body;
  try {
    const existingSchedule = await Schedule.findOne({ date });
    if (!existingSchedule) {
      const id = createScheduleId();
      console.log(id);
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
    console.log(errorMessage);
    res.status(500).json({ message: "Error occured", error: errorMessage });
  }
};

export const bookSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
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
      res.status(204).json({ message: "Schedule not found" });
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

export const deleteSchedule = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    // find the document that contains the schedule with this id
    const scheduleDoc = await Schedule.findOne({ "schedules.id": id });
    if (!scheduleDoc) {
      res.status(204).json({ message: "Schedule not found" });
      return;
    }

    const currentSchedule = scheduleDoc.schedules.find((s) => s.id === id);
    if (!currentSchedule) {
      res.status(204).json({ message: "Schedule not found" });
      return;
    }

    if (currentSchedule.booked) {
      res
        .status(400)
        .json({ message: "Schedule is already booked and cannot be deleted" });
      return;
    }

    scheduleDoc.schedules = scheduleDoc.schedules.filter((s) => s.id !== id);

    // if no schedules remain for that date, remove the parent document
    if (scheduleDoc.schedules.length === 0) {
      await Schedule.deleteOne({ _id: scheduleDoc._id });
    } else {
      await scheduleDoc.save();
    }

    res.status(200).json({ message: "Delete successful" });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message: "Error occurred", error: errorMessage });
  }
};
