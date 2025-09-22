import Schedule from "../models/schedule.model.js";

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
    const { id, start, end } = req.body;
    try {
        const newSchedule = new Schedule({id,start,end})
        await newSchedule.save();
        res.status(201).json({message:"Schedule created successfully"})
    }catch(err){
        res.status(500).json({message: "Error occured", error: err})
    }
}