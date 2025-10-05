import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface ISingleSchedule {
  id: string;
  booked: boolean;
  start: string;
  end: string;
  customerId?: Types.ObjectId | null;
}
export interface ISchedule extends Document {
  date: string;
  schedules: ISingleSchedule[];
}

const singleScheduleSchema = new Schema<ISingleSchedule>({
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
    type: Schema.Types.ObjectId,
    default: null,
  },
});

const schedulesSchema = new Schema<ISchedule>({
  date: {
    type: String,
    required: true,
  },
  schedules: [singleScheduleSchema],
});

const Schedule: Model<ISchedule> = mongoose.model<ISchedule>("Schedule", schedulesSchema);

export default Schedule;
