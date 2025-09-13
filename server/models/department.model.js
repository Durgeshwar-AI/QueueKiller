import mongoose from "mongoose";

const bookingSlots = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  slots: [{
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    isBooked: {
      type: Boolean,
      default: false
    },
    slotId: {
      type: String,
      required: true,
      unique: true
    }
  }]
});

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  departmentId: {
    type: String,
    required: true,
    unique: true
  },
  charges:{
    type: Number,
    required: true
  },
  availableSlots: {
    type: [bookingSlots],
    required: true
  }
});

module.exports = mongoose.model('Department', departmentSchema);
