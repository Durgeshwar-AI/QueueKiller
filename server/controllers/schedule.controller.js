import Company from "../models/company.model.js";
import Department from "../models/department.model.js";
import { v4 as uuidv4 } from "uuid";

// Get all schedules for a company
export const getSchedule = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId).populate("departments");
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const departments = await Department.find({
      departmentId: { $in: company.departments },
    });

    res.status(200).json({
      success: true,
      data: {
        company: {
          id: company._id,
          name: company.name,
          address: company.address,
          phone: company.phone,
        },
        departments: departments.map((dept) => ({
          id: dept._id,
          name: dept.name,
          departmentId: dept.departmentId,
          charges: dept.charges,
          availableSlots: dept.availableSlots,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get schedule for a specific department
export const getDepartmentSchedule = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { date } = req.query;

    const department = await Department.findOne({ departmentId });
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    let scheduleData = {
      id: department._id,
      name: department.name,
      departmentId: department.departmentId,
      charges: department.charges,
      availableSlots: department.availableSlots,
    };

    // Filter by date if provided
    if (date) {
      const targetDate = new Date(date);
      scheduleData.availableSlots = department.availableSlots.filter((slot) => {
        const slotDate = new Date(slot.date);
        return slotDate.toDateString() === targetDate.toDateString();
      });
    }

    res.status(200).json({
      success: true,
      data: scheduleData,
    });
  } catch (error) {
    console.error("Error fetching department schedule:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Create a new schedule (time slots) for a department
export const createSchedule = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { date, slots } = req.body;

    // Validate required fields
    if (!date || !slots || !Array.isArray(slots)) {
      return res.status(400).json({
        success: false,
        message: "Date and slots array are required",
      });
    }

    const department = await Department.findOne({ departmentId });
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    // Validate slot format
    const formattedSlots = slots.map((slot) => {
      if (!slot.startTime || !slot.endTime) {
        throw new Error("Each slot must have startTime and endTime");
      }
      return {
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: false,
        slotId: uuidv4(),
      };
    });

    // Check if schedule already exists for this date
    const existingSlotIndex = department.availableSlots.findIndex((slot) => {
      const slotDate = new Date(slot.date);
      const targetDate = new Date(date);
      return slotDate.toDateString() === targetDate.toDateString();
    });

    if (existingSlotIndex !== -1) {
      // Update existing date's slots
      department.availableSlots[existingSlotIndex].slots = formattedSlots;
    } else {
      // Add new date with slots
      department.availableSlots.push({
        date: new Date(date),
        slots: formattedSlots,
      });
    }

    await department.save();

    res.status(201).json({
      success: true,
      message: "Schedule created successfully",
      data: {
        departmentId: department.departmentId,
        date: date,
        slotsCreated: formattedSlots.length,
      },
    });
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update a specific time slot
export const updateTimeSlot = async (req, res) => {
  try {
    const { departmentId, slotId } = req.params;
    const { isBooked, startTime, endTime } = req.body;

    const department = await Department.findOne({ departmentId });
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    let slotFound = false;
    for (let dateSlots of department.availableSlots) {
      const slotIndex = dateSlots.slots.findIndex(
        (slot) => slot.slotId === slotId
      );
      if (slotIndex !== -1) {
        if (isBooked !== undefined) {
          dateSlots.slots[slotIndex].isBooked = isBooked;
        }
        if (startTime) {
          dateSlots.slots[slotIndex].startTime = startTime;
        }
        if (endTime) {
          dateSlots.slots[slotIndex].endTime = endTime;
        }
        slotFound = true;
        break;
      }
    }

    if (!slotFound) {
      return res.status(404).json({
        success: false,
        message: "Time slot not found",
      });
    }

    await department.save();

    res.status(200).json({
      success: true,
      message: "Time slot updated successfully",
    });
  } catch (error) {
    console.error("Error updating time slot:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a time slot
export const deleteTimeSlot = async (req, res) => {
  try {
    const { departmentId, slotId } = req.params;

    const department = await Department.findOne({ departmentId });
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    let slotFound = false;
    for (let dateSlots of department.availableSlots) {
      const slotIndex = dateSlots.slots.findIndex(
        (slot) => slot.slotId === slotId
      );
      if (slotIndex !== -1) {
        dateSlots.slots.splice(slotIndex, 1);
        slotFound = true;
        break;
      }
    }

    if (!slotFound) {
      return res.status(404).json({
        success: false,
        message: "Time slot not found",
      });
    }

    await department.save();

    res.status(200).json({
      success: true,
      message: "Time slot deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting time slot:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get available slots for booking
export const getAvailableSlots = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { date } = req.query;

    const department = await Department.findOne({ departmentId });
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    let availableSlots = [];

    if (date) {
      // Get slots for specific date
      const targetDate = new Date(date);
      const dateSlots = department.availableSlots.find((slot) => {
        const slotDate = new Date(slot.date);
        return slotDate.toDateString() === targetDate.toDateString();
      });

      if (dateSlots) {
        availableSlots = dateSlots.slots.filter((slot) => !slot.isBooked);
      }
    } else {
      // Get all available slots
      department.availableSlots.forEach((dateSlot) => {
        const availableSlotsForDate = dateSlot.slots.filter(
          (slot) => !slot.isBooked
        );
        if (availableSlotsForDate.length > 0) {
          availableSlots.push({
            date: dateSlot.date,
            slots: availableSlotsForDate,
          });
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        departmentId: department.departmentId,
        departmentName: department.name,
        charges: department.charges,
        availableSlots: availableSlots,
      },
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Book a time slot
export const bookTimeSlot = async (req, res) => {
  try {
    const { departmentId, slotId } = req.params;

    const department = await Department.findOne({ departmentId });
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    let slotFound = false;
    let bookedSlot = null;

    for (let dateSlots of department.availableSlots) {
      const slotIndex = dateSlots.slots.findIndex(
        (slot) => slot.slotId === slotId
      );
      if (slotIndex !== -1) {
        if (dateSlots.slots[slotIndex].isBooked) {
          return res.status(400).json({
            success: false,
            message: "Time slot is already booked",
          });
        }

        dateSlots.slots[slotIndex].isBooked = true;
        bookedSlot = {
          date: dateSlots.date,
          slot: dateSlots.slots[slotIndex],
        };
        slotFound = true;
        break;
      }
    }

    if (!slotFound) {
      return res.status(404).json({
        success: false,
        message: "Time slot not found",
      });
    }

    await department.save();

    res.status(200).json({
      success: true,
      message: "Time slot booked successfully",
      data: {
        departmentId: department.departmentId,
        departmentName: department.name,
        charges: department.charges,
        bookedSlot: bookedSlot,
      },
    });
  } catch (error) {
    console.error("Error booking time slot:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
