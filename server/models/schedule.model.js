import mongoose, { mongo, Schema } from "mongoose";

const schedulesSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    booked: {
        type: Boolean,
        required: true,
        default: false
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    customerId: {
        type: mongoose.Schema.ObjectId,
        default: null
    }
})

const schedules = new mongoose.model("Schedule",schedulesSchema)

export default schedules;