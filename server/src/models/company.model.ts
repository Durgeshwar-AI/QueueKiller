import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDepartment {
  _id: Types.ObjectId;
  name: string;
  type: "Business" | "Hospital";
}

export interface ICompany extends Document {
  _id: Types.ObjectId;
  name: string;
  departments: IDepartment[];
  email: string;
  password: string;
  role: string;
}

const departmentSchema = new Schema<IDepartment>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  type: { type: String, enum: ["Business", "Hospital"], required: true },
});

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },

  departments: {
    type: [departmentSchema],
    default: [],
  },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "company" },
});

export const Company = mongoose.model<ICompany>("Company", companySchema);
