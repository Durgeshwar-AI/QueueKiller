import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICompany extends Document {
  _id: Types.ObjectId;
  name: string;
  departments: string[];
  email: string;
  password: string;
  role: string;
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  departments: { type: [String], default: [] },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "company" },
});

export const Company = mongoose.model<ICompany>("Company", companySchema);
