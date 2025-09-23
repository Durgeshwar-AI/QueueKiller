import mongoose, { mongo, Schema } from "mongoose";

const schedules = new Schema({
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

export default schedules;