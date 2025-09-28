import mongoose, { mongo, Schema } from "mongoose";

const singleScheduleSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  booked: {
    type: Boolean,
    required: true,
    default: false,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.ObjectId,
    default: null,
  },
});

const schedulesSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  schedules: [singleScheduleSchema],
});

const schedules = new mongoose.model("Schedule", schedulesSchema);

export default schedules;
